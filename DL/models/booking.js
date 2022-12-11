const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    startMeeting: {
        type: Date,
        required: true
    },
    endMeeting: {
        type: Date,
        required: true
    },
    roomId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'room'
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    bookingCostData: {
        monthlyCredits: { type: Number, default: 0 },
        purchasedCredits: { type: Number, default: 0 },
        paidByMoney: { type: Number, default: 0 }
    },
})

const bookingModel = mongoose.model('booking', bookingSchema)
module.exports = bookingModel

// require('../db').connect()

// let b = {
//     meetingDate: new Date('2022-02-23'),
//     startHour: new Date('2022-02-23T09:00:00Z'),
//     endHour: new Date('2022-02-23T11:00:00Z'),
//     roomId: "6214dbcf98fcaf50b360b371",
//     bookCost: 300,
// }


// async function create(obj) {
//     return await m.create(b)
// }

// create(b)