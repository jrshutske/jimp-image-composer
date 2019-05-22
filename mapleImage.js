const Jimp = require('jimp');
const fetch = require('node-fetch');
const download = require('image-downloader')

const getInfo = () => {
  fetch(`https://maplelegends.com/api/getavatar?name=lean`).then(function(results) {
  return results;
}).then(function(results) {
  downloadIMG(results.url)
}).catch(function(err) {
  console.log("There was an error finding that." + err);
});
}

async function downloadIMG(url) {
  try {
    const { filename, image } = await download.image({
      url: url,
      dest: './tmp/thing.png'                  
    })
    console.log(url) // => /path/to/dest/image.jpg 
  } catch (e) {
    console.error(e)
  }
}
 
Jimp.read('./tmp/character.png').then(image1 => {
  Jimp.read('./tmp/leafre.jpg').then(image2 => {
    image1 
    .resize(200, 314)  
    image2
      .composite( image1, 500, 240),
    Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(font => {
      image2.print(font, 10, 10, 'Hello world!')
        .write('new-character.png')
    });
  }).catch(err => console.error(err));
}).catch(err => console.error(err));

getInfo();