const ImageKit = require('@imagekit/nodejs');

const imageKit = new ImageKit({
  privateKey: process.env.IMAGE_KIT_PRIVATE
});

async function uploadFile(buffer){
    const result = await imageKit.files.upload({
        file: buffer.toString("base64"),
        fileName : "image.jpg"
    })
    return result;
};

module.exports = uploadFile;