<p align="center">
 <img src="https://github.com/Adoobdoob71/EcoCycle/blob/master/EcoCycle%20App%20Icon.png" height="250" width="250"/>
 <p align="center">
  <img src="https://img.shields.io/github/issues/Adoobdoob71/EcoCycle" />
  <img src="https://img.shields.io/github/forks/Adoobdoob71/EcoCycle" />
  <img src="https://img.shields.io/github/stars/Adoobdoob71/EcoCycle" />
  <img src="https://img.shields.io/github/license/Adoobdoob71/EcoCycle" />
 </p>
</p>

# EcoCycle

Waste has always been a problem, but now it's bigger than ever. Humans generate a lot of waste, 2 billion tonnes annually. That's at least five elephants, which is a lot. On a more serious note, oceans are overflowing with trash, and that annual number is only going to get bigger exponentially with time. So what do we do, you ask? We think about ways of countering the growth of waste in the world. "Recycling," I thought to myself. But not a lot of people recycle. Then I thought, "What if we increase the motivation to recycle?" and this is what started everything.

So to motivate people we need to think about things that people are interested in. Well, there is a thing that people are very much interested in, and that thing is money. Wow-what a coincidence, recycling bottles gets you money! But wait, I don't want to drive to a remote place that might be somewhere five kilometers from here only to receive fifty cents. It's too much of a hassle. But what if we had recycling containers in neighborhoods that could give you the money digitally instead? It makes sense; more and more services allow you to pay and receive money digitally like in PayPal and Apple Pay, so why not use that as leverage? Alright, so now we have a problem and a solution. The only thing left to do is to start working.

What you do with EcoCycle is go to recycling containers that have NFC sensors. The job of the sensors is to give the person that's recycling bottles refund money. The refund money comes from the recycled bottles. That's how the user gets money fast, and also becomes more motivated to recycle more.

The truth is I cannot cooperate with other organizations to make this thing happen because I don't have the resources. Therefore the money aspect of EcoCycle is unimplemented for now. To make up for that, EcoCycle also has a "social aspect"; EcoCycle can track your progress by scanning barcodes found in receipts after shopping at supermarkets (again, only if I'll be able to cooperate with such organizations) and automatically transfer relevant data to the app. You can also compare yourself against your friends, which adds a little competition and motivation.

To sum things up, EcoCycle motivates people to recycle by making recycling more accessible and enjoyable. Who DOESN'T like getting money fast and help the environment along the way?


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

To scan NFC, you can simply hold the device against a random NFC tag, it won't actually read anything, it just listens for any signal nearby and generates demo data by itself.  [SEE FUNCTION HERE](https://github.com/Adoobdoob71/EcoCycle/blob/c8d676f0c301563762afbffe182472567e1d06d1/src/fragments/NFCScanner.tsx#L23)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
