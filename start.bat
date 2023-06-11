@echo off
cd runtime-java
./gradlew build
cd ../flowx-electorn
npm install
npm run start