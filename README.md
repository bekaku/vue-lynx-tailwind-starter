## Vue Lynx project

This is a Vue Lynx project bootstrapped with `create-vue-lynx`.

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm run dev
```

Scan the QRCode in the terminal with your LynxExplorer App to see the result.

You can start editing the page by modifying `src/App.vue`. The page auto-updates as you edit the file.

## Running via Android Studio (Custom Host App)
If you are developing with a custom Android host application, you can run the app directly via Android Studio:

1. Keep the development server running in your terminal (pnpm run dev).

2. Open Android Studio and select Open.

3. Navigate to and select the android folder inside this project.

4. Wait for the Gradle sync to complete successfully.

5. Click the Run 'app' button (the green Play icon ▶️) or press Shift + F10.

6. The app will be built and launched on your connected Android Emulator or physical device.

## Debugging & Viewing Logs (Lynx DevTool)

To view `console.log()`, inspect UI elements, and trace errors, you can use the Lynx DevTool:

1. Make sure your app is running on the Emulator or a physical device.

2. Open the Lynx DevTool desktop client. Download from https://github.com/lynx-family/lynx-devtool/releases

3. Connect your device:

    - For Emulator / USB: The DevTool should automatically detect your connected device via ADB.

    - For Wi-Fi: Ensure your mobile device and computer are on the same network.

4. Select your application package from the target list in the DevTool.

5. Go to the Console tab to monitor real-time logs and debug your JavaScript/Vue code.