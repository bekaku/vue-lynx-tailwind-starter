package com.lynx.javaemptyproject.modules;

import android.app.Activity;
import android.content.Context;
import android.content.ContextWrapper;
import android.content.Intent;
import android.net.Uri;

import com.lynx.jsbridge.LynxMethod;
import com.lynx.jsbridge.LynxModule;

public class AppModule extends LynxModule {

    public AppModule(Context context) {
        super(context);
    }

    public AppModule(Context context, Object param) {
        super(context, param);
    }

    // Expose this method to JavaScript
    @LynxMethod
    public void exitApp() {
        System.out.println("AppModule > exitApp() triggered");
        // 1. Unwrap the context. Lynx usually wraps the Activity inside a ContextWrapper.
        Context currentContext = mContext;
        while (currentContext instanceof ContextWrapper && !(currentContext instanceof Activity)) {
            currentContext = ((ContextWrapper) currentContext).getBaseContext();
        }

        // 2. Check if we finally got the Activity
        if (currentContext instanceof Activity) {
            final Activity activity = (Activity) currentContext;

            // 3. Must run UI operations (like closing an app) on the Main UI Thread
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    System.out.println("AppModule > Closing Activity now!");
                    activity.finish();
                }
            });
        } else {
            System.out.println("AppModule > Error: Cannot find Activity context to finish.");
        }
    }

    @LynxMethod
    public void openUrl(String url) {
        try {
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            Context currentContext = mContext;
            currentContext.startActivity(intent);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
