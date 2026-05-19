import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        let lynxView = LynxView { builder in

            let config = LynxConfig(provider: DemoLynxProvider())
            //            builder.config = LynxConfig(provider: DemoLynxProvider())
            //            builder.screenSize = self.view.frame.size
            //            builder.fontScale = 1.0

            config.register(NativeLocalStorageModule.self)
            config.register(DeviceInfoModule.self)

            // 🌟 3. ยัด config กลับเข้าไปให้ builder
            builder.config = config

            builder.screenSize = self.view.frame.size
            builder.fontScale = 1.0

        }

        lynxView.preferredLayoutWidth = self.view.frame.size.width
        lynxView.preferredLayoutHeight = self.view.frame.size.height
        lynxView.layoutWidthMode = .exact
        lynxView.layoutHeightMode = .exact
        self.view.addSubview(lynxView)

        //     lynxView.loadTemplate(fromURL: "main.lynx", initData: nil)

        //      if let fileUrl = Bundle.main.url(forResource: "main", withExtension: "main.lynx", subdirectory: "assets") {
        //      if let fileUrl = Bundle.main.url(forResource: "main.lynx.bundle", withExtension: nil, subdirectory: "assets") {
        //          lynxView.loadTemplate(fromURL: fileUrl.absoluteString, initData: nil)
        //          print("✅ โหลดไฟล์จาก: \(fileUrl.absoluteString)")
        //
        //      } else {
        //          print("❌ หาไฟล์ไม่เจอ! อย่าลืมลากโฟลเดอร์ assets เข้ามาเป็น Folder Reference (สีฟ้า) ใน Xcode นะ")
        //      }

        print("-----Start DEBUG------")
        print(Bundle.main.resourcePath!)
        print("-----End resourcePath------")

        do {
            let files = try FileManager.default.subpathsOfDirectory(
                atPath: Bundle.main.resourcePath!
            )

            for file in files {
                print(file)
            }
        } catch {
            print(error)
        }
        print("-----End DEBUG------")

        //production run
//        lynxView.loadTemplate(fromURL: "main.lynx", initData: nil)

        
        // Run via Dev server
        let devServerURL = "http://127.0.0.1:3000/main.lynx.bundle"
        if let url = devServerURL.addingPercentEncoding(
            withAllowedCharacters: .urlQueryAllowed
        ) {
            lynxView.loadTemplate(fromURL: url, initData: nil)
            print("🚀 Download Dev files via Dev server from: \(url)")
        } else {
            print("❌ Wrong URL format")
        }
    }
}
