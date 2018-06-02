# Toastify Ledger

Add a RegularKey to a mnemonic XRP wallet (eg. Ledger Nano) to use the account with a Family Seed (secret) in all available XRP wallets / tools / decentralized exchanges.

# Download & use

You can [download the most recent build from Github](https://github.com/WietseWind/toastify-ledger/releases). 
Extract the ZIP, and run `index.html` offline on your local computer.

If you want to build from source, checkout (or [download](https://github.com/WietseWind/toastify-ledger/archive/development.zip)) this repository and run `npm install` to install dependencies. Then run `npm run build` to generate the output in the `/dist/` folder.

A short demo video is available at: https://youtu.be/RhZMKvz3sbU

### Tested

I tested the software on:

 - Windows 10 + IE11
 - Windows 8.1 + Edge
 - OSX 10.13.4 + Google Chrome
 
# Source

The most important source (and all the instructions) are in one file (for now, will split it into components when I reuse the code for the next tool): https://github.com/WietseWind/toastify-ledger/blob/development/src/components/Application.vue

# Development

This project is coded in Vue-Webpack.

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
