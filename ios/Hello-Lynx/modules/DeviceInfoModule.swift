import Foundation
import UIKit


@objcMembers
public final class DeviceInfoModule: NSObject, LynxModule {

    // 🌟 1. ใช้ตัวแปร computed property แทน function
    public static var name: String {
        return "DeviceInfoModule"
    }

    // 🌟 2. ใช้ #selector เพื่อความปลอดภัย (Type-safe) ป้องกันการพิมพ์ชื่อ String ผิด
    public static var methodLookup: [String: String] {
        return [
            "getStatusBarHeight": NSStringFromSelector(
                #selector(getStatusBarHeight(_:))
            ),
            "getSafeAreaBottom": NSStringFromSelector(
                #selector(getSafeAreaBottom(_:))
            ),
            "setStatusBarStyle": NSStringFromSelector(
                #selector(setStatusBarStyle(_:isDarkText:callback:))
            )
        ]
    }

    // 🌟 3. ใส่ Init ให้ครบตามแพทเทิร์น
    public init(param: Any) {
        super.init()
    }

    public override init() {
        super.init()
    }

    // ---------------------------------------------------------
    // 📱 Methods
    // ---------------------------------------------------------
    
    @objc func getStatusBarHeight(_ callback: @escaping LynxCallbackBlock) {
        DispatchQueue.main.async {
            if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
               let statusBarManager = windowScene.statusBarManager {
                let height = statusBarManager.statusBarFrame.height
                callback([height])
            } else {
                callback([0])
            }
        }
    }

    @objc func getSafeAreaBottom(_ callback: @escaping LynxCallbackBlock) {
        DispatchQueue.main.async {
            if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
               let window = windowScene.windows.first(where: { $0.isKeyWindow }) {
                let bottom = window.safeAreaInsets.bottom
                callback([bottom])
            } else {
                callback([0])
            }
        }
    }

    @objc func setStatusBarStyle(
        _ colorHex: String,
        isDarkText: Bool,
        callback: LynxCallbackBlock?
    ) {
        DispatchQueue.main.async {
            // 💡 iOS ไม่อนุญาตให้เปลี่ยนสีพื้นหลัง Status Bar ตรงๆ
            // ทำได้แค่เปลี่ยนสไตล์ตัวหนังสือ (Dark/Light) ผ่าน UIStatusBarStyle
            callback?([true])
        }
    }
}
