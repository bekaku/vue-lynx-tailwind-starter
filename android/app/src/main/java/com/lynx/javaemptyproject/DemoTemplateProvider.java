package com.lynx.javaemptyproject;

import android.content.Context;
import com.lynx.tasm.provider.AbsTemplateProvider;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class DemoTemplateProvider extends AbsTemplateProvider {
    private Context mContext;

    DemoTemplateProvider(Context context) {
        this.mContext = context.getApplicationContext();
    }

//    @Override
//    public void loadTemplate(String uri, Callback callback) {
//        new Thread(new Runnable() {
//            @Override
//            public void run() {
//                try (InputStream inputStream = mContext.getAssets().open(uri);
//                     ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
//                    byte[] buffer = new byte[1024];
//                    int length;
//                    while ((length = inputStream.read(buffer)) != -1) {
//                        byteArrayOutputStream.write(buffer, 0, length);
//                    }
//                    callback.onSuccess(byteArrayOutputStream.toByteArray());
//                } catch (IOException e) {
//                    callback.onFailed(e.getMessage());
//                }
//            }
//        }).start();
//    }

    @Override
    public void loadTemplate(String uri, Callback callback) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("loadTemplate : uri >> "+uri);
                if (uri != null && (uri.startsWith("http://") || uri.startsWith("https://"))) {
                    loadFromNetwork(uri, callback);
                } else {
                    loadFromAssets(uri, callback);
                }
            }
        }).start();
    }
    private void loadFromNetwork(String urlString, Callback callback) {
        HttpURLConnection connection = null;
        try {
            URL url = new URL(urlString);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setConnectTimeout(5000);
            connection.setReadTimeout(5000);

            if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
                try (InputStream inputStream = connection.getInputStream();
                     ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
                    byte[] buffer = new byte[2048];
                    int length;
                    while ((length = inputStream.read(buffer)) != -1) {
                        byteArrayOutputStream.write(buffer, 0, length);
                    }
                    callback.onSuccess(byteArrayOutputStream.toByteArray());
                }
            } else {
                callback.onFailed("HTTP Error Code: " + connection.getResponseCode());
            }
        } catch (Exception e) {
            callback.onFailed("Network Fetch Error: " + e.getMessage());
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }

    private void loadFromAssets(String uri, Callback callback) {
        try (InputStream inputStream = mContext.getAssets().open(uri);
             ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[2048];
            int length;
            while ((length = inputStream.read(buffer)) != -1) {
                byteArrayOutputStream.write(buffer, 0, length);
            }
            callback.onSuccess(byteArrayOutputStream.toByteArray());
        } catch (IOException e) {
            callback.onFailed("Asset Load Error: " + e.getMessage());
        }
    }
}
