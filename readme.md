# gemcart
A tiny bundler for TypeScript with built-in tsConfig.paths transform.

## Installation

#### NPM

```sh
npm i --global gemcart
```

#### Yarn

```sh
yarn add --global gemcart
```

## Usage

### Build

```
Usage: gemcart build [options]

build a package

Options:
  -i, --input <input>    input file (default: "src/index.ts")
  -o, --output <input>   output file (default: "build/index.js")
  -b, --banner [banner]  add banner to the beginning of the file (default: "#!/usr/bin/env node")
  -d, --withDeps         include dependencies
  -m, --minify           minify output
  -h, --help             output usage information
```

## License
MIT
