@echo off
cd runtime-java
./gradlew build
cd ../flowx-electron
npm install
npm run build
cd ..