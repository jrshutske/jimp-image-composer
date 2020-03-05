const Jimp = require('jimp');
const fetch = require('node-fetch');
const download = require('image-downloader')

const getInfo = async (characterName) => {
  try {
    let response = await fetch(`https://maplelegends.com/api/character?name=${characterName}`)
    let charaterData = await response.json()
    let characterDest = await downloadImage(`https://maplelegends.com/api/getavatar?name=${characterName}`)
    createImage(characterDest, charaterData)
  } catch(e) {
    console.error(e)
  }
}

async function downloadImage(url) {
  let dest = './tmp/characterImage.png';
  try {
    await download.image({url, dest})
    return dest;
  } catch (e) {
    console.error(e)
  }
}

async function createImage(characterDest, charaterData) {
  try {
    let characterImage = await Jimp.read(characterDest);
    let backgroundImage = await Jimp.read('./tmp/leafre.jpg');
    let greyRect = await Jimp.read('./tmp/greyRect.png');
    let font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE)
    characterImage.resize(200, 200)
    backgroundImage.crop(0, 200, 600, 400)
    greyRect.resize(290, 380)
    greyRect.brightness(-.8)
    greyRect.opacity(.8)
    greyRect.print(font, 20, 30, charaterData.name)
    greyRect.print(font, 20, 70, `Level: ${charaterData.level}`)
    greyRect.print(font, 20, 110, `Exp: ${charaterData.level === 200 ? "N/A" : charaterData.exp}`)
    greyRect.print(font, 20, 150, `Fame: ${charaterData.fame}`)
    greyRect.print(font, 20, 190, `Cards: ${charaterData.cards}`)
    greyRect.print(font, 20, 230, `Quests: ${charaterData.quests}`)
    greyRect.print(font, 20, 270, `Job: ${charaterData.job}`)
    greyRect.print(font, 20, 310, `Guild: ${charaterData.guild}`)
    backgroundImage.composite(greyRect, 10, 10)
    backgroundImage.composite(characterImage, 350, 160)
    backgroundImage.write('./tmp/newCharacter.png')
  } catch(e){
    console.log(e)
  }
}

const myArgs = process.argv.slice(2);

!myArgs[0] 
  ? console.info("\x1b[35m", "Please provide a character name.", '\x1b[0m') 
  : getInfo(myArgs[0]);
