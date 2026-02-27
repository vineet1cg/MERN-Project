const ImageKit = require('@imagekit/nodejs');

const imageKit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC,
  privateKey: process.env.IMAGE_KIT_PRIVATE,
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT
});

async function uploadFile(buffer) {
  const result = await imageKit.files.upload({
    file: buffer.toString("base64"),
    fileName: "image.jpg"
  })
  return result;
};

module.exports = uploadFile;