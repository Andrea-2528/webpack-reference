# Quick Start

## Getting Started

### 1. Clone the repository:
`git clone <repository-url>`

`cd <repository-folder>`

### 2. Install dependencies:

`npm install`

### 3. Start the development server:

`npm run dev`

### 4. Build for production:

`npm run build`

### 5. Deploy to GitHub Pages:

(only first time)
`git branch gh-pages`

`git checkout gh-pages && git merge main --no-edit`

`npm run build`


`git add dist -f && git commit -m "Deployment commit"`

`git subtree push --prefix dist origin gh-pages`

`git checkout main`

## Installed Packages

- webpack

- webpack-cli

- webpack-dev-server

- webpack-merge

- html-webpack-plugin

- css-loader

- style-loader

- html-loader

- prettier

- eslint

- @eslint/js

- date-fns

