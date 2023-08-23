npx react-native build-android --mode=release
cd android
./gradlew bundleRelease
cd ..
npm run android -- --mode="release"
