const advertisements = require("../../DL/controllers/advertisementController");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { validateNewAdvertisement } = require("./advertisementValidation");

const getAllAdvertisements = async () => {
  const allAdvertisements = await advertisements.read({}, null);
  console.log("allAdvertisements", allAdvertisements);
  return allAdvertisements;
};

const findUniqueAdvertisement = async (name) => {
  const advertisement = await advertisements.readOne({ name: name });
  if (advertisement) {
    return advertisement;
  } else {
    return false;
  }
};

const createAdvertisement = async (data, token) => {
  const { name, startDate, endDate, endHour, imageUrl, link } = data;

  //   //TODO: check if the request have an authorization to create member and admin (check the token)
  //   if (!isTokenAdmin && userType !== "user") {
  //     throw new Error("Unauthorized");
  //   }
  //   if (!isTokenAdmin && !password) {
  //     throw new Error("must have a password");
  //   }

  const validationErrors = validateNewAdvertisement(data);
  if (validationErrors.length) {
    throw new Error(validationErrors.join(";"));
  }

  const advertisement = await findUniqueAdvertisement(name);

  if (!advertisement) {
    const newAdvertisement = {
      name,
      startDate,
      endDate,
      endHour,
      imageUrl,
      link,
    };
    const createAdvertisement = await advertisements.create(newAdvertisement);
    console.log("\n\nADVERTISEMENT CREATED\n\n" + createAdvertisement);
    return createAdvertisement;
  } else {
    throw new Error("the advertisement already exists");
  }
};

module.exports = {
  findUniqueAdvertisement,
  createAdvertisement,
  getAllAdvertisements,
};
