package com.postcard;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.bugsnag.BugsnagReactNative;
import com.merryjs.PhotoViewer.MerryPhotoViewPackage;
import com.brentvatne.react.ReactVideoPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.jadsonlourenco.RNShakeEvent.RNShakeEventPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            BugsnagReactNative.getPackage(),
            new MerryPhotoViewPackage(),
            new ReactVideoPackage(),
            new ImageResizerPackage(),
            new RNViewShotPackage(),
            new VectorIconsPackage(),
            new RNShakeEventPackage(),
            new RNFetchBlobPackage(),
            new ReactNativeContacts(),
            new ReactNativeConfigPackage(),
            new PickerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    // BugsnagReactNative.start(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
