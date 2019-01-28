# Cup Shop

[![Build Status](https://travis-ci.com/mrsideshowjack/cup-shop.svg?branch=master)](https://travis-ci.com/mrsideshowjack/cup-shop)
![logo](/public/img/icons/cup-shop-logo-192x192.png)

See live demo here [cup-shop.herokuapp.com (heroku backup)](https://cup-shop.herokuapp.com/#/) or [cupshop.consentua.com](http://cupshop.consentua.com)

This ecommerce site is a demonstration test bed for the consent API [Consentua](https://consnetua.com). Please do not fill in an order form and actually expect any paper cups to be sent to you.

## Project setup

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

This will compile a static build into `dist/`

```bash
npm run build
```

### Lints and fixes files

```bash
npm run lint
```

### ENVs

Current environment variables, stored in `.env.local`

```env
VUE_APP_GMAP_API_KEY=XXXXX
```

## To Deploy (Heroku)

Every push to master will deploy a new version of this app. Deploys happen automatically
note: `server.js` is only used to serve the static site on heroku, if already have a server, just serve the `dist/` directory after building.

### VM

Just clone this repo and run the start bash script to install the dependencies, and build the `dist/`

```bash
sh start.sh
```
