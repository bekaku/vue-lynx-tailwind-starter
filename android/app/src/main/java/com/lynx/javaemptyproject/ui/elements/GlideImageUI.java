package com.lynx.javaemptyproject.ui.elements;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.widget.ImageView;

import androidx.annotation.Nullable;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.DataSource;
import com.bumptech.glide.load.engine.GlideException;
import com.bumptech.glide.request.RequestListener;
import com.bumptech.glide.request.target.Target;
import com.lynx.tasm.behavior.LynxContext;
import com.lynx.tasm.behavior.LynxProp;
import com.lynx.tasm.behavior.ui.LynxUI;
import com.lynx.tasm.event.LynxCustomEvent;

import java.util.HashMap;
import java.util.Map;

public class GlideImageUI extends LynxUI<ImageView> {
    public GlideImageUI(LynxContext context) {
        super(context);
    }

    @Override
    protected ImageView createView(Context context) {
        ImageView imageView = new ImageView(context);
        imageView.setScaleType(ImageView.ScaleType.CENTER_CROP);
        return imageView;
    }

    @LynxProp(name = "src")
    public void setSrc(String src) {
        if (src != null && !src.isEmpty()) {
            String loadUrl = src;
            if (src.startsWith("/")) {
                loadUrl = "file:///android_asset" + src;
            }
            Glide.with(mContext)
                    .load(loadUrl)
                    .listener(new RequestListener<Drawable>() {
                        @Override
                        public boolean onLoadFailed(@Nullable GlideException e, Object model, Target<Drawable> target, boolean isFirstResource) {
                            emitEvent("error", new HashMap<String, Object>() {
                                {
                                    put("value", e != null ? e.getMessage() : "Image load failed");
                                }
                            });
                            return false;
                        }

                        @Override
                        public boolean onResourceReady(Drawable resource, Object model, Target<Drawable> target, DataSource dataSource, boolean isFirstResource) {
                            emitEvent("load", new HashMap<String, Object>() {
                                {
                                    put("value", "success");
                                }
                            });
                            return false;
                        }
                    })
                    .into(mView);
        } else {
            Glide.with(mContext).clear(mView);
        }
    }
    @LynxProp(name = "fit")
    public void setFit(String fit) {
        if (fit == null) return;

        switch (fit) {
            case "aspectFill":
                mView.setScaleType(ImageView.ScaleType.CENTER_CROP);
                break;
            case "aspectFit":
                mView.setScaleType(ImageView.ScaleType.FIT_CENTER);
                break;
            case "scaleToFill":
            default:
                mView.setScaleType(ImageView.ScaleType.FIT_XY);
                break;
        }
    }
    @LynxProp(name = "placeholder")
    public void setPlaceholder(String placeholder) {
        if (placeholder == null) return;
        Glide.with(mView.getContext())
                .load(placeholder)
                .into(mView);
    }

    private void emitEvent(String name, Map<String, Object> value) {
        LynxCustomEvent detail = new LynxCustomEvent(getSign(), name);
        if (value != null) {
            for (Map.Entry<String, Object> entry : value.entrySet()) {
                detail.addDetail(entry.getKey(), entry.getValue());
            }
        }

        getLynxContext().getEventEmitter().sendCustomEvent(detail);
    }
}
