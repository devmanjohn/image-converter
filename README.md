# WEBP Convertor

This script is used to convert all the images in a folder and its subfolders to the webp format and resize them.

## Installation

1. Clone the repository or download the script
2. Install the dependencies by running `npm install`

## Usage

The script takes two optional parameters, `width` and `height`, which are used to resize the images. If no parameters are provided, the default width and height are 800 and 600 respectively.

```javascript
node app.js --width=1920 --height=1080
```

The script will create an `output` folder in the same directory as the script and will output all the images in the `images` folder and its subfolders in the same folder structure in the `output` folder.

## Note

This script assumes that the input directory and the output directory are in the same level. If the input directory is deeper in the hierarchy you will need to adjust the `relativePath`.

## Dependencies

- [sharp](https://github.com/lovell/sharp)
- [minimist](https://github.com/substack/minimist)
- [fs](https://nodejs.org/api/fs.html)
- [path](https://nodejs.org/api/path.html)
  Please make sure you have node.
