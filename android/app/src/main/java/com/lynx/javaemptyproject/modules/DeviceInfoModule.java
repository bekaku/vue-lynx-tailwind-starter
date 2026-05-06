package com.lynx.javaemptyproject.modules;

import android.app.Activity;
import android.content.Context;
import android.graphics.Color;
import android.os.Build;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import com.lynx.jsbridge.LynxMethod;
import com.lynx.jsbridge.LynxModule;
import com.lynx.react.bridge.Callback;
import com.lynx.tasm.behavior.LynxContext;

public class DeviceInfoModule extends LynxModule {
    public DeviceInfoModule(Context context, Object param) {
        super(context, param);
    }
    Context getContext() {
        LynxContext lynxContext = (LynxContext) mContext;
        return lynxContext.getContext();
    }
    @LynxMethod
    public void getStatusBarHeight(Callback callback) {
        int result = 0;
        try {
            int resourceId = getContext().getResources().getIdentifier("status_bar_height", "dimen", "android");
            if (resourceId > 0) {
                int heightPx = getContext().getResources().getDimensionPixelSize(resourceId);
                float density = getContext().getResources().getDisplayMetrics().density;
                result = Math.round(heightPx / density);
            }
        } catch (Exception e) {
            result = 40; // ค่า Default กันเหนียว
        }
        Log.i("lynx", " DeviceInfoModule> getStatusBarHeight : "+result);
        callback.invoke(result);
    }
    @LynxMethod
    public void getSafeAreaBottom(Callback callback) {
        int result = 0;
        try {
            // ค้นหาความสูงของ Navigation Bar แทน Status Bar
            int resourceId = getContext().getResources().getIdentifier("navigation_bar_height", "dimen", "android");
            if (resourceId > 0) {
                int heightPx = getContext().getResources().getDimensionPixelSize(resourceId);
                float density = getContext().getResources().getDisplayMetrics().density;
                result = Math.round(heightPx / density);
            }
        } catch (Exception e) {
            result = 24; // ค่า Default สำหรับขอบล่าง
        }

        callback.invoke(result);
    }

    @LynxMethod
    public void setStatusBarStyle(String colorHex, boolean isDarkText, Callback callback) {

        Log.i("lynx", " DeviceInfoModule> setStatusBarStyle colorHex: "+colorHex+", isDarkText:"+isDarkText);
        // ดึง Activity ปัจจุบันออกมา
        if (getContext() instanceof Activity) {
            Log.i("setStatusBarStyle", "Step1");
            Activity activity = (Activity) getContext();

            // ⚠️ สำคัญมาก: ต้องสั่งงาน UI บน Main Thread เท่านั้น
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    try {
                        Window window = activity.getWindow();

                        // 1. เปลี่ยนสีพื้นหลัง Status Bar
                        if (colorHex != null && !colorHex.isEmpty()) {
                            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
                            // รองรับสีโปร่งใส เช่น "transparent" หรือโค้ดสี HEX เช่น "#FFFFFF"
                            int parsedColor = colorHex.equalsIgnoreCase("transparent")
                                    ? Color.TRANSPARENT
                                    : Color.parseColor(colorHex);
                            window.setStatusBarColor(parsedColor);
                        }

                        // 2. เปลี่ยนสีตัวอักษร/ไอคอน (ดำ หรือ ขาว)
                        // ฟีเจอร์นี้ Android รองรับตั้งแต่ Android 6.0 (API 23) ขึ้นไป
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                            View decorView = window.getDecorView();
                            int flags = decorView.getSystemUiVisibility();

                            if (isDarkText) {
                                // พื้นหลังสว่าง -> บังคับตัวอักษรสีดำ
                                flags |= View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
                            } else {
                                // พื้นหลังมืด -> บังคับตัวอักษรสีขาว
                                flags &= ~View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
                            }
                            decorView.setSystemUiVisibility(flags);
                        }

                        if (callback != null) callback.invoke(true); // ส่งผลลัพธ์กลับว่าสำเร็จ

                    } catch (Exception e) {
                        Log.e("lynx", e.getMessage());
                        Log.i("setStatusBarStyle", "Step2");
                        if (callback != null) callback.invoke(false); // ส่งผลลัพธ์ว่าล้มเหลว
                    }
                }
            });
        } else {
            Log.i("setStatusBarStyle", "Step3");
            if (callback != null) callback.invoke(false);
        }
    }
}
