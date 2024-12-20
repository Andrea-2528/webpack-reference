# **Webpack quick practice:**
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
        use: ["style-loader", "css-loader"], //Ordeer is important
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





