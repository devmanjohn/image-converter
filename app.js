const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));

const inputDirectory = './input';
const outputDirectory = './output';

let width = argv.width || 800;
let height = argv.height || 600;

fs.promises
  .mkdir(outputDirectory, { recursive: true })
  .then(() => {
    console.log(`Output folder ${outputDirectory} created.`);
    readDir(inputDirectory, inputDirectory);
  })
  .catch(console.error);

function readDir(dir, baseDir) {
  fs.readdir(dir, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const filePath = `${dir}/${file}`;
      const relativePath = path.relative(baseDir, filePath);
      const outputPath = `${outputDirectory}/${relativePath.replace(
        /\.[^/.]+$/,
        '.webp'
      )}`;

      fs.stat(filePath, (err, stat) => {
        if (err) throw err;

        if (stat.isDirectory()) {
          // create the output folder if it doesn't exist
          fs.promises
            .mkdir(outputPath, { recursive: true })
            .then(() => {
              console.log(`Output folder ${outputPath} created.`);
              // recursively read subdirectories
              readDir(filePath, baseDir);
            })
            .catch((err) => console.log(err));
        } else if (stat.isFile()) {
          // Compress and convert image to webp
          sharp(filePath)
            .resize(width, height)
            .toFormat('webp')
            .toBuffer()
            .then((data) => {
              const compressedSize = data.length / 1024;
              console.log(`Compressed ${filePath} to ${compressedSize}KB`);
              fs.promises
                .writeFile(outputPath, data)
                .then(() =>
                  console.log(`Converted ${filePath} to ${outputPath}`)
                )
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        }
      });
    });
  });
}
