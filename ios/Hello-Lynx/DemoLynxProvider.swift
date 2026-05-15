import Foundation

class DemoLynxProvider: NSObject, LynxTemplateProvider {
    
    func loadTemplate(withUrl url: String!, onComplete callback: LynxTemplateLoadBlock!) {
        
        guard let urlString = url else {
            let error = NSError(domain: "com.lynx", code: 400, userInfo: [NSLocalizedDescriptionKey: "URL is null"])
            callback(nil, error)
            return
        }

        // 🌐 1. case URL from Dev Server (Hot Reload)
        if urlString.hasPrefix("http://") || urlString.hasPrefix("https://") {
            guard let networkUrl = URL(string: urlString) else {
                let error = NSError(domain: "com.lynx", code: 400, userInfo: [NSLocalizedDescriptionKey: "Invalid Network URL."])
                callback(nil, error)
                return
            }
            
            // ใช้ URLSession ในการดึงไฟล์จากอินเทอร์เน็ต/Localhost
            let task = URLSession.shared.dataTask(with: networkUrl) { data, response, error in
                // สั่งให้กลับมาทำงานบน Main Thread เสมอเพื่ออัปเดต UI
                DispatchQueue.main.async {
                    if let error = error {
                        print("❌ Download fail: \(error.localizedDescription)")
                        callback(nil, error)
                        return
                    }
                    callback(data, nil)
                }
            }
            task.resume()
        }
        // 📂 2. กรณีเป็นไฟล์ Offline แบบ Full Path (ที่ได้จาก Bundle.main.url)
        else if urlString.hasPrefix("file://") {
            do {
                guard let fileUrl = URL(string: urlString) else { return }
                let data = try Data(contentsOf: fileUrl)
                callback(data, nil)
            } catch {
                print("❌ Read Offline fail: \(error.localizedDescription)")
                callback(nil, error)
            }
        }
        // 📂 3. กรณีส่งมาแค่ชื่อไฟล์เพียวๆ (โค้ดดั้งเดิมของ Demo)
        else if let filePath = Bundle.main.path(forResource: urlString, ofType: "bundle") {
            do {
                let data = try Data(contentsOf: URL(fileURLWithPath: filePath))
                callback(data, nil)
            } catch {
                print("❌ Read fail: \(error.localizedDescription)")
                callback(nil, error)
            }
        }
        // 🚨 4. Error
        else {
            let urlError = NSError(domain: "com.lynx", code: 400, userInfo: [NSLocalizedDescriptionKey: "Invalid URL."])
            callback(nil, urlError)
        }
      }
    
    //work
//  func loadTemplate(withUrl url: String!, onComplete callback: LynxTemplateLoadBlock!) {
//    if let filePath = Bundle.main.path(forResource: url, ofType: "bundle") {
//      do {
//        let data = try Data(contentsOf: URL(fileURLWithPath: filePath))
//        callback(data, nil)
//      } catch {
//        print("Error reading file: \(error.localizedDescription)")
//        callback(nil, error)
//      }
//    } else {
//      let urlError = NSError(domain: "com.lynx", code: 400, userInfo: [NSLocalizedDescriptionKey: "Invalid URL."])
//      callback(nil, urlError)
//    }
//  }
}
