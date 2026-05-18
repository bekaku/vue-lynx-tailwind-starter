package com.lynx.javaemptyproject;

import androidx.activity.OnBackPressedCallback;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.lynx.javaemptyproject.modules.ImagePickerModule;
import com.lynx.react.bridge.JavaOnlyArray;
import com.lynx.tasm.LynxError;
import com.lynx.tasm.LynxView;
import com.lynx.tasm.LynxViewBuilder;
import com.lynx.tasm.LynxViewClient;
import com.lynx.tasm.TemplateData;
import com.lynx.xelement.XElementBehaviors;

public class MainActivity extends AppCompatActivity {
    private ImagePickerModule activeImagePickerModule;

    public void setActiveImagePickerModule(ImagePickerModule module) {
        this.activeImagePickerModule = module;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        LynxView lynxView = buildLynxView();
        setContentView(lynxView);
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {

                System.out.println("lynx > handleOnBackPressed");

                if (lynxView != null) {
                    lynxView.sendGlobalEvent("onHardwareBackPress", JavaOnlyArray.of());
                } else {
                    setEnabled(false);
                    getOnBackPressedDispatcher().onBackPressed();
                }
            }
        });

//        String url = "main.lynx.bundle";
        String url = "http://192.168.7.117:3000/main.lynx.bundle";
//        String url = "http://10.0.2.2:3000/main.lynx.bundle";
//        String url = "http://192.168.1.106:3000/main.lynx.bundle";
        lynxView.renderTemplateUrl(url, TemplateData.empty());

        // open switch page
        // startActivity(new Intent(this, SwitchActivity.class));
    }

    private LynxView buildLynxView() {
        LynxViewBuilder viewBuilder = new LynxViewBuilder();
        viewBuilder.addBehaviors(new XElementBehaviors().create());
        viewBuilder.setTemplateProvider(new DemoTemplateProvider(this));
//        viewBuilder.registerModule("AppModule", AppModule.class);
//        viewBuilder.registerModule("NativeLocalStorageModule", NativeLocalStorageModule.class);
//        viewBuilder.registerModule("DeviceInfoModule", DeviceInfoModule.class);
//        viewBuilder.registerModule("ImagePickerModule", ImagePickerModule.class);

//        viewBuilder.addBehavior(new Behavior("glide-image", false) {
//            @Override
//            public GlideImageUI createUI(LynxContext context) {
//                return new GlideImageUI(context);
//            }
//        });
        LynxView lynxView = viewBuilder.build(this);
        lynxView.addLynxViewClient(new LynxViewClient() {
            @Override
            public void onReceivedError(LynxError error) {
                super.onReceivedError(error);
                Log.e("LynxError", "Error: " + error.getSummaryMessage());
            }
        });
        return lynxView;
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
//        ImagePickerModule.handleActivityResult(requestCode, resultCode, data);
        if (activeImagePickerModule != null) {
            activeImagePickerModule.handleActivityResult(this, requestCode, resultCode, data);
        }
    }
}