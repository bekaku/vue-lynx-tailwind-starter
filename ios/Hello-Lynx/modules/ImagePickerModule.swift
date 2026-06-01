//
//  ImagePickerModule.swift
//  Hello-Lynx
//
//  Created by Chanavee on 1/6/2569 BE.
//

import Foundation
import PhotosUI
import UIKit

@objcMembers
public final class ImagePickerModule: NSObject, LynxModule {

    // 🌟 1. กำหนดชื่อโมดูลให้ตรงกับฝั่ง JS / Android
    public static var name: String {
        return "ImagePickerModule"
    }

    // 🌟 2. ทำ Method Lookup ด้วย #selector แบบสองพารามิเตอร์ (Resolve, Reject) เพื่อเลียนแบบ Promise
    public static var methodLookup: [String: String] {
        return [
            "pickImage": NSStringFromSelector(
                #selector(pickImage(_:reject:))
            ),
            "pickMultipleImages": NSStringFromSelector(
                #selector(pickMultipleImages(_:reject:))
            ),
            "takePhoto": NSStringFromSelector(
                #selector(takePhoto(_:reject:))
            ),
        ]
    }

    // 🌟 3. ปฏิบัติตาม Pattern ตัวคอนสตรัคเตอร์ของโปรเจกต์คุณ
    public init(param: Any) {
        super.init()
    }

    public override init() {
        super.init()
    }

    // ---------------------------------------------------------
    // 💾 Properties
    // ---------------------------------------------------------
    private var currentResolve: LynxPromiseResolveBlock?
    private var currentReject: LynxPromiseRejectBlock?
    private var isMultipleMode = false

    // ---------------------------------------------------------
    // 📱 Methods
    // ---------------------------------------------------------

    @objc func pickImage(
        _ resolve: @escaping LynxPromiseResolveBlock,
        reject: @escaping LynxPromiseRejectBlock
    ) {
        self.currentResolve = resolve
        self.currentReject = reject
        self.isMultipleMode = false

        DispatchQueue.main.async {
            var config = PHPickerConfiguration()
            config.selectionLimit = 1
            config.filter = .images

            let picker = PHPickerViewController(configuration: config)
            picker.delegate = self

            self.getTopViewController()?.present(
                picker,
                animated: true,
                completion: nil
            )
        }
    }

    @objc func pickMultipleImages(
        _ resolve: @escaping LynxPromiseResolveBlock,
        reject: @escaping LynxPromiseRejectBlock
    ) {
        self.currentResolve = resolve
        self.currentReject = reject
        self.isMultipleMode = true

        DispatchQueue.main.async {
            var config = PHPickerConfiguration()
            config.selectionLimit = 0  // 0 หมายถึงเลือกได้ไม่จำกัดจำนวน
            config.filter = .images

            let picker = PHPickerViewController(configuration: config)
            picker.delegate = self

            self.getTopViewController()?.present(
                picker,
                animated: true,
                completion: nil
            )
        }
    }

    @objc func takePhoto(
        _ resolve: @escaping LynxPromiseResolveBlock,
        reject: @escaping LynxPromiseRejectBlock
    ) {
        self.currentResolve = resolve
        self.currentReject = reject

        DispatchQueue.main.async {
            guard UIImagePickerController.isSourceTypeAvailable(.camera) else {
                reject(
                    "CAMERA_ERROR",
                    "Camera not available on this device"
                )
                self.clearPromises()
                return
            }

            let picker = UIImagePickerController()
            picker.sourceType = .camera
            picker.delegate = self

            self.getTopViewController()?.present(
                picker,
                animated: true,
                completion: nil
            )
        }
    }

    // ---------------------------------------------------------
    // 🛠 Helpers
    // ---------------------------------------------------------

    private func saveImageToCache(_ image: UIImage) -> String? {
        let timestamp = Int64(Date().timeIntervalSince1970 * 1000)
        let fileName = "picked_image_\(timestamp).jpg"
        let cacheDirectory = FileManager.default.temporaryDirectory
        let fileURL = cacheDirectory.appendingPathComponent(fileName)

        // บีบอัดรูปภาพลงเป็น JPEG (Quality 0.8) เพื่อลด Overhead การส่งข้อมูล
        if let data = image.jpegData(compressionQuality: 0.8) {
            do {
                try data.write(to: fileURL)
                return "file://\(fileURL.path)"
            } catch {
                print("Error saving image: \(error)")
                return nil
            }
        }
        return nil
    }

    private func getTopViewController() -> UIViewController? {
        var topVC = UIApplication.shared.connectedScenes
            .filter { $0.activationState == .foregroundActive }
            .compactMap { $0 as? UIWindowScene }
            .first?.windows
            .first { $0.isKeyWindow }?.rootViewController

        while let presentedVC = topVC?.presentedViewController {
            topVC = presentedVC
        }
        return topVC
    }

    private func clearPromises() {
        self.currentResolve = nil
        self.currentReject = nil
    }
}

// ---------------------------------------------------------
// 📸 Extensions for Delegates
// ---------------------------------------------------------

extension ImagePickerModule: PHPickerViewControllerDelegate {
    public func picker(
        _ picker: PHPickerViewController,
        didFinishPicking results: [PHPickerResult]
    ) {
        DispatchQueue.main.async {
            picker.dismiss(animated: true, completion: nil)
        }

        guard !results.isEmpty else {
            currentReject?("USER_CANCELLED", "User cancelled image picker")
            clearPromises()
            return
        }

        if !isMultipleMode {
            // กรณีเลือกภาพเดียว (pickImage)
            if let result = results.first {
                processSingleResult(result)
            }
        } else {
            // กรณีเลือกหลายภาพ (pickMultipleImages)
            processMultipleResults(results)
        }
    }

    private func processSingleResult(_ result: PHPickerResult) {
        if result.itemProvider.canLoadObject(ofClass: UIImage.self) {
            result.itemProvider.loadObject(ofClass: UIImage.self) {
                [weak self] (object, error) in
                guard let self = self else { return }
                if let error = error {
                    self.currentReject?(
                        "PICKER_ERROR",
                        error.localizedDescription
                    
                    )
                    self.clearPromises()
                    return
                }

                if let image = object as? UIImage {
                    if let filePath = self.saveImageToCache(image) {
                        self.currentResolve?(filePath)
                    } else {
                        self.currentReject?(
                            "COPY_ERROR",
                            "Failed to process image"
                     
                        )
                    }
                }
                self.clearPromises()
            }
        } else {
            currentReject?("PICKER_ERROR", "Cannot load image object")
            clearPromises()
        }
    }

    private func processMultipleResults(_ results: [PHPickerResult]) {
        let dispatchGroup = DispatchGroup()
        var filePaths = [String]()
        let queue = DispatchQueue(label: "com.lynx.imagepicker.queue")

        for result in results {
            if result.itemProvider.canLoadObject(ofClass: UIImage.self) {
                dispatchGroup.enter()
                result.itemProvider.loadObject(ofClass: UIImage.self) {
                    [weak self] (object, error) in
                    if let image = object as? UIImage,
                        let filePath = self?.saveImageToCache(image)
                    {
                        queue.async {
                            filePaths.append(filePath)
                            dispatchGroup.leave()
                        }
                    } else {
                        dispatchGroup.leave()
                    }
                }
            }
        }

        dispatchGroup.notify(queue: .main) { [weak self] in
            self?.currentResolve?(filePaths)
            self?.clearPromises()
        }
    }
}

extension ImagePickerModule: UIImagePickerControllerDelegate,
    UINavigationControllerDelegate
{
    public func imagePickerController(
        _ picker: UIImagePickerController,
        didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey:
            Any]
    ) {
        DispatchQueue.main.async {
            picker.dismiss(animated: true, completion: nil)
        }

        if let image = info[.originalImage] as? UIImage {
            if let filePath = saveImageToCache(image) {
                currentResolve?(filePath)
            } else {
                currentReject?("FILE_ERROR", "Failed to save photo path")
            }
        } else {
            currentReject?("CAMERA_ERROR", "Failed to capture image data")
        }
        clearPromises()
    }

    public func imagePickerControllerDidCancel(
        _ picker: UIImagePickerController
    ) {
        DispatchQueue.main.async {
            picker.dismiss(animated: true, completion: nil)
        }
        currentReject?("USER_CANCELLED", "User cancelled camera")
        clearPromises()
    }
}
