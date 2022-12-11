const advertisementModel = require("../models/advertisement");

async function read(filter, proj) {
  return await advertisementModel.find(filter, proj);
}

async function readOne(filter, proj) {
  return await advertisementModel.findOne(filter, proj);
}

async function readOneAndPopulate(filter, proj, populate) {
  return await advertisementModel.findOne(filter, proj).populate(populate);
}

async function create(newAdvertisement) {
  return await advertisementModel.create(newAdvertisement);
}

async function update(id, updatedAdvertisement) {
  return await advertisementModel.findByIdAndUpdate(id, updatedAdvertisement, {
    new: true,
  });
}

async function del(id) {
  return await advertisementModel.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
}

module.exports = {
  read,
  readOne,
  readOneAndPopulate,
  create,
  update,
  delete: del,
};
