<p align="center">
 <img src="https://github.com/Adoobdoob71/EcoCycle/blob/master/EcoCycle%20App%20Icon.png" height="250" width="250"/>
 <p align="center">
  <img src="https://img.shields.io/github/issues/Adoobdoob71/EcoCycle" />
  <img src="https://img.shields.io/github/forks/Adoobdoob71/EcoCycle" />
  <img src="https://img.shields.io/github/stars/Adoobdoob71/EcoCycle" />
  <img src="https://img.shields.io/github/license/Adoobdoob71/EcoCycle" />
 </p>
</p> 

## Youtube video

[![EcoCycle Presenting Video](https://img.youtube.com/vi/WJHm1bNtcq8/0.jpg)](https://www.youtube.com/watch?v=WJHm1bNtcq8)

## Installation

Make sure you have yarn and npx installed!

After downloading the project (in project path):

```bash
yarn
```
then:

```bash
npx react-native run-android
```

the app works only on android for now, if you want to contribute to iOS configuration, feel free to do so!

## Demo Data

Here's a demo barcode to scan in the app:

<img src="https://github.com/Adoobdoob71/EcoCycle/blob/master/DEMOBARCODE.PNG" />

To scan NFC, you can simply hold the device against a random NFC tag, it won't actually read anything, it just listens for a signal nearby and generates demo data by itself.  [SEE FUNCTION HERE](https://github.com/Adoobdoob71/EcoCycle/blob/c8d676f0c301563762afbffe182472567e1d06d1/src/fragments/NFCScanner.tsx#L23)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
