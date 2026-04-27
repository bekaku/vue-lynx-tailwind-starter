package com.lynx.javaemptyproject.modules;

import android.content.Context;
import android.content.SharedPreferences;

import com.lynx.jsbridge.LynxMethod;
import com.lynx.jsbridge.LynxModule;
import com.lynx.react.bridge.Callback;
import com.lynx.tasm.behavior.LynxContext;

public class NativeLocalStorageModule extends LynxModule {

    private static final String PREF_NAME = "MyLocalStorage";

    public NativeLocalStorageModule(Context context) {
        super(context);
    }

    Context getContext() {
        LynxContext lynxContext = (LynxContext) mContext;
        return lynxContext.getContext();
    }
    @LynxMethod
    public void setStorageItem(String key, String value) {
        SharedPreferences sharedPreferences = getContext().getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(key, value);
        editor.apply();
    }

    @LynxMethod
    public void getStorageItem(String key, Callback callback) {
        SharedPreferences sharedPreferences = getContext().getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        String value = sharedPreferences.getString(key, null);
        callback.invoke(value);
    }

    @LynxMethod
    public void removeStorageItem(String key, Callback callback) {
        SharedPreferences sharedPreferences = getContext().getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        // Remove the specific key
        editor.remove(key);
        // Use commit() instead of apply() to wait for the disk write to finish
        // It returns true if successful, false otherwise
        boolean isSuccess = editor.commit();
        // Send the result back to JavaScript
        if (callback != null) {
            callback.invoke(isSuccess);
        }
    }

    @LynxMethod
    public void clearStorage() {
        SharedPreferences sharedPreferences = getContext().getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.clear();
        editor.apply();
    }
}
