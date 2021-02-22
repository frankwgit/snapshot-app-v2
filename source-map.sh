#!/bin/sh
# require `npm install -g bugsnag-sourcemaps``

react-native bundle \
    --platform android \
    --dev false \
    --entry-file index.js \
    --bundle-output android-release.bundle \
    --sourcemap-output android-release.bundle.map

react-native bundle \
    --platform ios \
    --dev false \
    --entry-file index.js \
    --bundle-output ios-release.bundle \
    --sourcemap-output ios-release.bundle.map

bugsnag-sourcemaps upload \
    --api-key 6a2e9563757c523854e6a28cb4c2a8b2 \
    --app-version 1.0.0 \
    --minified-file android-release.bundle \
    --source-map android-release.bundle.map \
    --minified-url index.android.bundle \
    --upload-sources

bugsnag-sourcemaps upload \
    --api-key 6a2e9563757c523854e6a28cb4c2a8b2 \
    --app-version 1.0.0 \
    --minified-file ios-release.bundle \
    --source-map ios-release.bundle.map \
    --minified-url index.ios.bundle \
    --upload-sources

rm -rf *.bundle
rm -rf *.bundle.*
