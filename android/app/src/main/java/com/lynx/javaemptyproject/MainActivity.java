package com.lynx.javaemptyproject;

import androidx.activity.OnBackPressedCallback;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;

import com.lynx.javaemptyproject.elements.GlideImageUI;
import com.lynx.javaemptyproject.modules.AppModule;
import com.lynx.javaemptyproject.modules.NativeLocalStorageModule;
import com.lynx.react.bridge.JavaOnlyArray;
import com.lynx.tasm.LynxEnv;
import com.lynx.tasm.LynxError;
import com.lynx.tasm.LynxView;
import com.lynx.tasm.LynxViewBuilder;
import com.lynx.tasm.LynxViewClient;
import com.lynx.tasm.TemplateData;
import com.lynx.tasm.behavior.Behavior;
import com.lynx.tasm.behavior.LynxContext;
import com.lynx.xelement.XElementBehaviors;

public class MainActivity extends AppCompatActivity {

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

        String url = "main.lynx.bundle";
//        String url = "http://10.0.2.2:3000/main.lynx.bundle";
        System.out.println("MainActivity > onCreate " + url);
        lynxView.renderTemplateUrl(url, TemplateData.empty());

        // open switch page
        // startActivity(new Intent(this, SwitchActivity.class));
    }

    private LynxView buildLynxView() {
//        LynxEnv.inst().addBehavior(new Behavior("glide-image") {
//            @Override
//            public GlideImageUI createUI(LynxContext context) {
//                return new GlideImageUI(context);
//            }
//        });

        LynxViewBuilder viewBuilder = new LynxViewBuilder();
        viewBuilder.addBehaviors(new XElementBehaviors().create());
        viewBuilder.setTemplateProvider(new DemoTemplateProvider(this));
//        return viewBuilder.build(this);
        viewBuilder.registerModule("AppModule", AppModule.class);
        viewBuilder.registerModule("NativeLocalStorageModule", NativeLocalStorageModule.class);


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
}