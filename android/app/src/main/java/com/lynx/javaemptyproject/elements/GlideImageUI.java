package com.lynx.javaemptyproject.elements;

import android.content.Context;
import android.util.Log;
import android.widget.ImageView;

import com.bumptech.glide.Glide;
import com.lynx.tasm.behavior.LynxContext;
import com.lynx.tasm.behavior.LynxProp;
import com.lynx.tasm.behavior.StylesDiffMap;
import com.lynx.tasm.behavior.ui.LynxUI;

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

//    @Override
//    public void updatePropertiesInterval(StylesDiffMap props) {
//        Log.w("lynx", "glideimageUI.java > updatePropertiesInterval ");
//        super.updatePropertiesInterval(props);
//        if (props.hasKey("src")) {
//            String src = props.getString("src");
//            setSrc(src);
//        }
//        if (props.hasKey("placeholder")) {
//            String placeholder = props.getString("placeholder");
//            setPlaceholder(placeholder);
//        }
//    }

    @LynxProp(name = "src")
    public void setSrc(String src) {
        Log.w("lynx", "glideimageUI.java > setSrc :"+src);
        if (src != null && !src.isEmpty()) {
            Glide.with(mContext)
                    .load(src)
                    .into(mView);
        } else {
            Glide.with(mContext).clear(mView);
        }
    }

    @LynxProp(name = "placeholder")
    public void setPlaceholder(String placeholder) {
        if (placeholder == null) return;
        Glide.with(mView.getContext())
                .load(placeholder)
                .into(mView);
    }
}
