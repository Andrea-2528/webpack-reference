# Table of Contents:

- [Webpack quick practice](#webpack-quick-practice)
- [npm scripts](#npm-scripts)

# Quick setup reference using this repo as template

`npm install --save-dev webpack webpack-cli html-webpack-plugin style-loader css-loader html-loader webpack-dev-server webpack-merge`

`npm run dev`

# Webpack quick practice:
>This is an example of usign Webpack and progressivly including files and options.
>Therefore this is not a step by step guide due to repetition.
>`dist` folder is automatically created when running `npx webpack`, therefore not included.
>`node-modules` is not included for the same reason.


## Setup

### Inside project directory:
`npm init -y`

### Install webpack and webpack-cli, also record both as development dependencies:
`npm install --save-dev webpack webpack-cli`

### Create a webpack.config.js file containig the following:
```javascript
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",  //relative path to entry file
  output: {
    filename: "main.js",    //name of output file
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
```

### Run webpack:
`npx webpack`


## Adding HTML

### Install HtmlWebpackPlugin as a dev dependency to handle HTML:
`npm install --save-dev html-webpack-plugin`

### Create an template.html file and update webpack.config.js:
```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");   //Include this

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [                                        //
    new HtmlWebpackPlugin({                         //Add this
      template: "./src/template.html",              //
    }),
  ],
};
```

### Run webpack again:
`npx webpack`


## Adding CSS

### Install StyleLoader and CSSLoader as dev dependencies:
`npm install --save-dev style-loader css-loader`

### Update webpack.config.js:
```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], //Order is important
      },
    ],
  },
};
```

### Add CSS import in module.exports.entry (index.js):
```javascript
import "./styles.css";
```

### Run webpack again to bundle everything:
`npx webpack`


## Adding images from HTML or CSS:

### Images linked in CSS inside `url()` are already handled by `css-loader`

### Images inside HTML can be handled by `html-loader`:
`npm install --save-dev html-loader`

### `webpack.config.js` needs an object in modules.rules to handle images from HTML:
```javascript
{
  test: /\.html$/i,
  loader: "html-loader",
}
```

### Run webpack again to bundle everything:
`npx webpack`


## Adding images from JavaScript:

### `webpack.config.js` needs an object in modules.rules to handle images from a .js file
```javascript
{
  test: /\.(png|svg|jpg|jpeg|gif)$/i,
  type: "asset/resource",
}
```

### In the JavaScript module that uses the image, default import it:
```javascript
import odinImage from "./odin.png";
   
const image = document.createElement("img");
image.src = odinImage;
   
document.body.appendChild(image);
```

### Run webpack again to bundle everything:
`npx webpack`

## Webpack dev server

### Install webpack-dev-server as a dev dependency:
`npm install --save-dev webpack-dev-server`

### Update webpack.config.js:
```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "eval-source-map",               //  (makes it easier to debug by adding correct line numbers)
  devServer: {                              // Add
    watchFiles: ["./src/template.html"],    // This
  },                                        //
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
```

### Run `npx webpack serve` to start the dev server, located at `http://localhost:8080`, kill it with `CTRL + C`. Changes need restart.

# npm scripts

### Inside the package.json, scripts can be added and run with `npm run <script name>`, for example `npm run build`.
```json
  // ... other package.json stuff
  "scripts": {
    "build": "webpack",
    "dev": "webpack serve",
    "deploy": "git subtree push --prefix dist origin gh-pages"
  },
  // ... other package.json stuff
```
### Development and production modes (specified in the `webpack.config.js`) can be set in two different configs (`webpack.dev.js` and `webpack.prod.js`) and run by different npm  commands after changing the `package.json`:
```json
  // ... other package.json stuff
  "scripts": {
    "build": "webpack --config webpack.prod.js",
    "dev": "webpack serve --config webpack.dev.js",
    "deploy": "git subtree push --prefix dist origin gh-pages"
  },
  // ... other package.json stuff
```

### Note: this needs the creation of a third file, `webpack.common.js`, which contains the common config for both, as explained here:

# Webpack-merge

### Install webpack-merge as a dev dependency:
`npm install --save-dev webpack-merge`

### Change `webpack.config.js` to `webpack.common.js` and update it with the following:
```javascript
  entry: {
    app: "./src/index.js",
  },
```
### and
```javascript
filename: "main.bundle.js",
```

### Update webpack.dev.js:
```javascript
 const { merge } = require('webpack-merge');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
    mode: 'development',
    devtool: "eval-source-map",
    devServer: {
      watchFiles: ["./src/template.html"],
    },
 });
 ```

### Update webpack.prod.js:
```javascript
 const { merge } = require('webpack-merge');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
   mode: 'production',
 });
 ```
