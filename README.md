# Toastify Ledger

Add a RegularKey to a mnemonic XRP wallet (eg. Ledger Nano) to use the account with a Family Seed (secret) in all available XRP wallets / tools / decentralized exchanges.

# Why Toastify your Ledger

If you have a wallet with a mnemonic passphrase (normally 24 words) you'll probably use the Ledger application to send your XRP. The Ledger application doesn't allow you to send any other kinds of transactions. This means you can't set a Trust Line (to claim tokens, like [ALV](https://allvor.org/)) or use your wallet in another XRP app (like [ToastWallet](https://toastwallet.com/)).

With this tool you can assign a Regular Key to your existing wallet. This means a regular secret key (family seed, `sXXXXXXX...XXXXXXX`) will be generated and **added** to your existing account (wallet). After this, you can use both the Ledger software and any other XRP tool. By adding your Ledger wallet to [ToastWallet](https://toastwallet.com/) or using [The World Exchange](https://www.theworldexchange.net/)  using the Regular Key this tool generated for you, you can set Trust Lines, claim tokens, etc.

# You will still be able to use your Ledger

Using this tool will NOT disable your existing key, so your existing mnemonic wallet and the Ledger client WILL STILL WORK, the tool will just ADD A SECOND key that can sign transactions for your account. This second key is a family seed (secret), with the sXXXXXX... formatting that can be used in Toast Wallet and other XRPL tools.

# Download & use

You can [download the most recent build from Github](https://github.com/WietseWind/toastify-ledger/releases). 
Extract the ZIP, and run `index.html` offline on your local computer.

If you want to build from source, checkout (or [download](https://github.com/WietseWind/toastify-ledger/archive/development.zip)) this repository and run `npm install` to install dependencies. Then run `npm run build` to generate the output in the `/dist/` folder.

A short demo video is available at: https://youtu.be/RhZMKvz3sbU

### **Note:** the demo shows the tool running at Windows, however: it will work at Linux and Mac OSX as well 🎉 

**Please run this tool on your own local computer and offline.**

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
