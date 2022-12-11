const bookingModel = require('../models/booking')


async function read(filter, proj, populate) {
    console.log("🚀 ~ file: bookingController.js ~ line 4 ~ read ~ filter", filter)
    return await bookingModel.find(filter, proj).populate(populate)
}

async function readOne(filter, proj) {
    return await bookingModel.findOne(filter, proj)
}

async function readOneAndPopulate(filter, proj, populate) {
    return await bookingModel.findOne(filter, proj).populate(populate)
}

async function create(newBooking) {
    return await bookingModel.create(newBooking)
}

async function update(id, updatedBooking) {
    return await bookingModel.findByIdAndUpdate(id, updatedBooking, { new: true })
}

async function del(filter) {
    return await bookingModel.findOneAndDelete(filter)
}

module.exports = { read, readOne, readOneAndPopulate, create, update, delete: del }