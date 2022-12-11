// require('../db').connect()
const generalModel = require("../models/general");

async function read(filter, proj) {
  return await generalModel.find(filter, proj);
}

async function readOne(filter, proj) {
  return await generalModel.findOne(filter, proj);
}

async function readOneAndPopulate(filter, proj, populate) {
  return await generalModel.findOne(filter, proj).populate(populate);
}

async function create(newRoom) {
  return await generalModel.create(newRoom);
}

async function update(id, updatedRoom) {
  return await generalModel.findByIdAndUpdate(id, updatedRoom, { new: true });
}

async function del(id) {
  return await generalModel.findByIdAndUpdate(
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
