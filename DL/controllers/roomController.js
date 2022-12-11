// require('../db').connect()
const roomModel = require("../models/room");

async function read(filter, proj) {
  return await roomModel.find(filter, proj);
}

async function readOne(filter, proj) {
  const res = await roomModel.findOne(filter, proj);
  return res;
}

async function readOneAndPopulate(filter, proj, populate) {
  return await roomModel.findOne(filter, proj).populate(populate);
}

async function create(newRoom) {
  return await roomModel.create(newRoom);
}

async function update(id, updatedRoom) {
  return await roomModel.findByIdAndUpdate(id, updatedRoom, { new: true });
}

async function del(filter) {
  return await roomModel.findOneAndDelete(filter);
}

module.exports = {
  read,
  readOne,
  readOneAndPopulate,
  create,
  update,
  del,
};

// rooms = [{
//     name: "שופר",
//     maxOfPeople: 2,
//     hourlyCost: 20
// },
// {
//     name: "מחול",
//     maxOfPeople: 2,
//     hourlyCost: 30
// },
// {
//     name: "חליל",
//     maxOfPeople: 3,
//     hourlyCost: 40
// },
// {
//     name: "נבל",
//     maxOfPeople: 4,
//     hourlyCost: 50
// },
// {
//     name: "כינור",
//     maxOfPeople: 4,
//     hourlyCost: 70
// },
// {
//     name: "עוגב",
//     maxOfPeople: 6,
//     hourlyCost: 100
// }
// ]

// rooms.forEach(async (r) => {
//     console.log(await create(r));
// });
