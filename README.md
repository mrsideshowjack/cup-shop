[![Build Status](https://travis-ci.com/mrsideshowjack/cup-shop.svg?branch=master)](https://travis-ci.com/mrsideshowjack/cup-shop)

# Cup Shop

![](/public/img/icons/cup-shop-logo-192x192.png)

See live demo here [cup-shop.herokuapp.com](https://cup-shop.herokuapp.com/#/) or [cupshop.consentua.com](http://cupshop.consentua.com)

This ecommerce site is a demonstration test bed for the consent API [Consentua](https://consnetua.com). Please do not fill in an order form and actually expect any paper cups to be sent to you.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
This will compile a static build into `dist/`

```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## To Deploy (Heroku)
Every push to master will deploy a new version of this app. Deploys happen automatically
note: `server.js` is only used to serve the static site on heroku, if already have a server, just serve the `dist/` directory after building.

### VM
Just clone this repo and run the start bash script to install the dependencies, and build the `dist/`
```
$ sh start.sh
```
