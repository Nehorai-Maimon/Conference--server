const isDateValid = require("../../Utils/isDateValid");
const isImageUrlValid = require("../../Utils/isImageUrlValid");
const isUrlValid = require("../../Utils/IsUrlValid");

function validateNewAdvertisement(data) {
  const { name, startDate, endDate, endHour, imageUrl, link } = data;
  const validImageFormats = ["png", "jpg", "jpeg", "gif"];

  const errors = [];

  if (!name) {
    errors.push("Name must not be empty");
  }
  if (!isDateValid(startDate)) {
    errors.push("startDate must be valid");
  }
  if (!isDateValid(endDate)) {
    errors.push("endDate must be valid");
  }
  if (new Date(startDate) > new Date(endDate)) {
    errors.push("endDate must be greater than startDate");
  }
  if (!endHour) {
    errors.push("endHour must not be empty");
  }
  if (endHour < 1 || endHour > 24) {
    errors.push("endHour must be between 1 and 24");
  }
  if (!isImageUrlValid(imageUrl, validImageFormats)) {
    errors.push("imageUrl must be valid");
  }
  if (!isUrlValid(link)) {
    errors.push("link must be valid");
  }
  return errors;
}
module.exports = { validateNewAdvertisement };
