package com.lynx.javaemptyproject.modules;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.provider.MediaStore;
import android.util.Log;

import com.lynx.javaemptyproject.MainActivity;
import com.lynx.jsbridge.LynxMethod;
import com.lynx.jsbridge.LynxModule;
import com.lynx.jsbridge.Promise;
import com.lynx.react.bridge.JavaOnlyArray;
import com.lynx.tasm.behavior.LynxContext;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;

public class ImagePickerModule extends LynxModule {
    public static final String NAME = "ImagePickerModule";
    public static final int IMAGE_PICKER_REQUEST_CODE = 10001;
    public static final int MULTIPLE_IMAGE_PICKER_REQUEST_CODE = 10002;

    private Promise currentPromise;
    private final LynxContext lynxContext;

    public ImagePickerModule(Context context) {
        super(context);
        this.lynxContext = (LynxContext) context;
    }

    @LynxMethod
    public void pickImage(Promise promise) {
        Log.i("ImagePickerModule", "ImagePickerModule > pickImage()");
        Activity activity = (Activity) lynxContext.getContext();

        if (!(activity instanceof MainActivity)) {
            promise.reject("ACTIVITY_ERROR", "Activity is not MainActivity");
            return;
        }

        MainActivity mainActivity = (MainActivity) activity;
        mainActivity.setActiveImagePickerModule(this);

        this.currentPromise = promise;

        try {
            Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
            intent.setType("image/*");
            activity.startActivityForResult(intent, IMAGE_PICKER_REQUEST_CODE);
        } catch (Exception e) {
            if (this.currentPromise != null) {
                this.currentPromise.reject("PICKER_ERROR", e.getMessage() != null ? e.getMessage() : "Error");
                this.currentPromise = null;
            }
        }
    }

    @LynxMethod
    public void pickMultipleImages(Promise promise) {
        Activity activity = (Activity) lynxContext.getContext();
        if (!(activity instanceof MainActivity)) {
            promise.reject("ACTIVITY_ERROR", "Activity is not MainActivity");
            return;
        }

        MainActivity mainActivity = (MainActivity) activity;
        mainActivity.setActiveImagePickerModule(this);
        this.currentPromise = promise;

        try {
            Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
            intent.setType("image/*");
            intent.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true); // 🌟 พระเอกของเรา สั่งให้เลือกได้หลายรูป!
            activity.startActivityForResult(Intent.createChooser(intent, "Select Pictures"), MULTIPLE_IMAGE_PICKER_REQUEST_CODE);
        } catch (Exception e) {
            if (this.currentPromise != null) {
                this.currentPromise.reject("PICKER_ERROR", e.getMessage());
                this.currentPromise = null;
            }
        }
    }

    private String copyUriToCache(Context context, Uri uri) {
        try {
            File tempFile = new File(context.getCacheDir(), "picked_image_" + System.currentTimeMillis() + ".jpg");
            InputStream inputStream = context.getContentResolver().openInputStream(uri);
            if (inputStream == null) return null;

            FileOutputStream outputStream = new FileOutputStream(tempFile);
            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
            outputStream.flush();
            outputStream.close();
            inputStream.close();

            return "file://" + tempFile.getAbsolutePath();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public void handleActivityResult(Context context, int requestCode, int resultCode, Intent data) {
        if (requestCode == IMAGE_PICKER_REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK && data != null) {
                Uri uri = data.getData();
                if (uri != null && currentPromise != null) {
                    String actualFilePath = copyUriToCache(context, uri);
//                    currentPromise.resolve(uri.toString());
                    if (actualFilePath != null) {
                        currentPromise.resolve(actualFilePath); // จะได้ file:///data/user/0/...
                    } else {
                        currentPromise.reject("COPY_ERROR", "Failed to process image");
                    }
                } else if (currentPromise != null) {
                    currentPromise.reject("NO_IMAGE_DATA", "No image selected");
                }
            } else {
                if (currentPromise != null) {
                    currentPromise.reject("USER_CANCELLED", "User cancelled image picker");
                }
            }
            this.currentPromise = null;
        } else if (requestCode == MULTIPLE_IMAGE_PICKER_REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK && data != null) {
                JavaOnlyArray results = new JavaOnlyArray();

                if (data.getClipData() != null) {
                    int count = data.getClipData().getItemCount();
                    for (int i = 0; i < count; i++) {
                        Uri uri = data.getClipData().getItemAt(i).getUri();
                        String actualFilePath = copyUriToCache(context, uri);
                        if (actualFilePath != null) {
                            results.pushString(actualFilePath);
                        }
                    }
                } else if (data.getData() != null) {
                    Uri uri = data.getData();
                    String actualFilePath = copyUriToCache(context, uri);
                    if (actualFilePath != null) {
                        results.pushString(actualFilePath);
                    }
                }
                if (currentPromise != null) {
                    currentPromise.resolve(results);
                }
            } else {
                if (currentPromise != null)
                    currentPromise.reject("USER_CANCELLED", "User cancelled");
            }
            currentPromise = null;
        }
    }
}
