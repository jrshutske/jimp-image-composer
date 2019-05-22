var Jimp = require('jimp');
 
Jimp.read('character.png').then(image1 => {
  Jimp.read('leafre.jpg').then(image2 => {
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
