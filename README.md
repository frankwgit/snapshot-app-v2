#  PostCard
<h3>Mobile app -- send real postcards to real mailboxes from your phone</h3>

## :arrow_up: How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install node_modules by `npm install`

**Step 4:** Install Pod dependencies by: `cd ios` && `pod install`

**Step 5:** Config env
The `.env` file is ignored by git to keep secret, You need to make `.env` file from `.env.example`. Steps:

0. open terminal in root project
1. `cp .env.example .env`
2. Add your config variables to `.env`
3. Done!

## :arrow_forward: How to Run App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * Open `PostCard/ios/PostCard.xcworkspace` by Xcode
    * Set simulator or real device
    * Press `Cmd + r` to run project
  * for Android
    * Run Genymotion or Android emulator or connect real device
    * run `react-native run-android`

## :arrow_forward: How to Build App for production

  * for iOS
    * Open `PostCard/ios/PostCard.xcworkspace` by Xcode
    * Set bundle id, app version, build version
    * Select team (you must login Xcode with Apple development account)
    * Set `Generic iOS Device` near the `scheme`
    * Run build by `Cmd + b` and wait for success
    * Open menu `Product` then select `Archive` and wait for success
    * Select `Upload to App Store` on Oganizer screen or export `ipa` file by select export

  * for Android
    * Create keystore file by:<br />
    `keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000`
    * Place the `my-release-key.keystore` file under the `PostCard/android/app` directory
    * Edit the file `~/.gradle/gradle.properties` <br />
    (replace ***** with the correct keystore password, alias and key password)
    ```
    MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
    MYAPP_RELEASE_KEY_ALIAS=my-key-alias
    MYAPP_RELEASE_STORE_PASSWORD=*****
    MYAPP_RELEASE_KEY_PASSWORD=*****
    ```
    * Run `./build-release.sh` then wait for build success
    * Get `apk` file in `PostCard/android/app/build/outputs/apk/release/app-release.apk`
