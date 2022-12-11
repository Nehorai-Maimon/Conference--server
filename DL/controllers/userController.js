// require('../db').connect()
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
async function read(filter, proj) {
  return await userModel.find(filter, proj);
}

async function readOne(filter, proj) {
  return await userModel.findOne(filter, proj);
}

async function readOneAndPopulate(filter, proj, populate) {
  return await userModel.findOne(filter, proj).populate(populate);
}

async function create(newUser) {
  return await userModel.create(newUser);
}

async function update(id, updatedUser) {
  return await userModel.findByIdAndUpdate(id, updatedUser, { new: true });
}

async function del(id) {
  return await userModel.findByIdAndUpdate(
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

const logTheLastMonthCredits = (usersData) => {
  //
};

function updetingCraditsEvreyMonth(creditsData) {
  creditsData.currentMonthBalance = creditsData.nextMonthBalance;
  creditsData.nextMonthBalance = creditsData.monthlyCredits;
  return creditsData;
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const startUpdateCredit = async () => {
  await require("../db").connect();
  let users = await read();
  logTheLastMonthCredits({ ...users });
  let change = await users
    .filter((user) => user.isSubscribed)
    .map((user) => {
      update(
        { _id: user._id },
        { creditsData: updetingCraditsEvreyMonth(user.creditsData) }
      );
    });
  console.log(change);
};

var CronJob = require("cron").CronJob;
var job = new CronJob(
  "00 00 01 * *",
  function () {
    startUpdateCredit();
    console.log("You will see this message every time its run");
  },
  null,
  true
);
job.start();


let user = {
  firstName: "yosi",
  lastName: "shar",
  password: "123456",
  email: "yosistar1@gmail.com",
  phone: "0546145522"
}
async function doIt(body) {
  let hash = await bcrypt.hash(body.password, 10)
  let newOne = await create({ ...body, password: hash })
  console.log(newOne)
}

// doIt(user)
const delit = async (id) => {
  const del = await userModel.findByIdAndDelete(
    { _id: id },

  )
  console.log("🚀 ~ file: userController.js ~ line 101 ~ delit ~ del", del)
}

// delit("62c17096f96df1ddebd483f4") 