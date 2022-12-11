const isUrlValid = require("./IsUrlValid");

function isImageUrlValid(imageUrl, validFormats) {
  const regExp = new RegExp(`\.(${validFormats.join("|")})$`);
  return isUrlValid(imageUrl) && regExp.test(imageUrl);
}

module.exports = isImageUrlValid;
