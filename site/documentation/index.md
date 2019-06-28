# Documentation

## Installation

#### Local

`npm install @matthewwolfe/simplemark`

#### Global

`npm install -g @matthewwolfe/simplemark`

## Options

`-v` `--version` - Currently installed version

`-s` `--source` - Source directory, default is `./src`

`-c` `--css` - Path to global CSS file

`-w` `--watch` - Watch source directory and global CSS file for changes

## Getting Started

Once you have downloaded the package, the following steps will get you started quickly:

- Create a source directory. The default directory is `src`
- Create a global CSS file
- Create the `docs` directory (Optional). This is the output directory. If it doesn't exist, simplemark will create it

#### Example Structure
```
|- src
  |- index.md
  |- example-directory
    |- index.md
    |- another-file.md
|- css
  |- global.css
|- package.json
|- package.lock
```

Then you can get started with:

```
simplemark -c ./css/global.css -w
```

With the `-w` option, simplemark will automatically monitor your files for changes, and transform all your
files automatically.
