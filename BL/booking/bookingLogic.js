// require('../DL/db').connect()
const booking = require("../../DL/controllers/bookingController");
const checkAvailableRoom = require("./checkAvailableRoomFunc");

const rooms = require("../../DL/controllers/roomController");
const { all } = require("../../Routes/bookingRouter");

//
async function createBooking(req) {
  await booking.create({
    startMeeting: req.startMeeting,
    endMeeting: req.endMeeting,
    roomId: req.roomId,
    userId: req.userId,
    bookingCostData: {
      monthlyCredits: req.bookingCostData.monthlyCredits,
      purchasedCredits: req.bookingCostData.purchasedCredits,
      paidByMoney: req.bookingCostData.paidByMoney,
    },
  });
  return await booking.read({});
}
//
const getAllBookings = async () => {
  try {
    const allBookings = await booking.read({}, null, [
      { path: "roomId", select: ["name", "picture"] },
      { path: "userId", select: ["firstName", "lastName"] },
    ]);
    return allBookings;
  } catch (error) {
    return error;
  }
};

const deleteBookings = async (id) => {
  try {
    const deleteBooking = await booking.delete(id);

    if (deleteBooking) {
      return `הפגישה ${deleteBooking.name} נמחקה בהצלחה`;
    } else {
      throw new Error("מחיקת הפגישה לא הצליחה");
    }
  } catch {}
};
const getAllBookingsByUser = async (id) => {
  try {
    const allBookings = await booking.read({ userId: id });
    return allBookings;
  } catch (error) {
    return error;
  }
};
//
async function getAvailableRoom(req) {
  res = await checkAvailableRoom(req);
  return res;
}

async function CalculateCost(bookRequest) {
  let bookingPrice = null;
  const timeOfMeeting =
    bookRequest.endHour.getHours() - bookRequest.startHour.getHours();
  const hourlyCreditCost = room.hourlyCreditCost;
  const hourlyMoneyCost = room.hourlyMoneyCost;
  const currentMonthBalance = user.creditsData.currentMonthBalance;
  const discountPercentage = user.discountPercentage / 100;
  //user discount function
  const checkDiscount = (bookingPrice) => {
    discountPercentage > 0
      ? (bookingPrice = bookingPrice - bookingPrice * discountPercentage)
      : bookingPrice;
    return bookingPrice;
  };
  //booking only by credits
  if (
    currentMonthBalance >= (bookingPrice = hourlyCreditCost * timeOfMeeting)
  ) {
    console.log(`להזמין לך את החדר ב${bookingPrice} קרדיטים?`);
    //booking by credits and money
  } else if (currentMonthBalance > 0) {
    const balanceToPay = () => {
      const creditBalanceToPay =
        timeOfMeeting * hourlyCreditCost - currentMonthBalance;
      const balanceOfTime = creditBalanceToPay / hourlyCreditCost;
      const moneyToPay = balanceOfTime * hourlyMoneyCost;
      return Math.round(checkDiscount(moneyToPay));
    };
    console.log(`ברשותך רק${currentMonthBalance} קרדיטים
    להזמין לך את החדר ב${currentMonthBalance} קרדיטים
    ו${balanceToPay()} שקלים?`);
    ////booking only with money
  } else {
    console.log(`אין לך מספיק קרדיטים`);
    bookingPrice = hourlyMoneyCost * timeOfMeeting;
    bookingPrice = Math.round(checkDiscount(bookingPrice));
    console.log(`תרצה להזמין את החדר ב${bookingPrice} ?שקלים`);
  }
}

function getBook(meetingDate, maxOfPeople, startHour, endHour) {
  return {
    meetingDate,
    startHour,
    endHour,
    maxOfPeople,
  };
}
// OR
function Book(d, mop, st, et) {
  this.meetingDate = d;
  this.startHour = st;
  this.endHour = et;
  this.maxOfPeople = mop;
}

async function generateOptions(bookRequest) {
  let options = [];

  // אותו חדר - חצי שעה קדימה
  options.push(
    new Book(bookRequest.date, filter.bookRequest, filter.bookRequest + 2)
  );

  // אותו חדר - חצי שעה אחורה
  options.push(new Book(filter.date, filter.maxOfPeople, filter.startHour + 2));

  // חדר גדול ב-1 - אותן שעות
  options.push(new Book(filter.date, filter.maxOfPeople, filter.startHour + 2));

  // אותו חדר - שעה קדימה
  options.push(new Book(filter.date, filter.maxOfPeople, filter.startHour + 2));

  // אותו חדר - שעה אחורה

  // חדר גדול ב- 2 - אותן שעות

  // חדר גדול ב-1 - חצי שעה קדימה
  // חדר גדול ב-1 - חצי שעה אחורה

  // חדר גדול ב-2 - שעה קדימה
  // חדר גדול ב-2 - שעה אחורה

  return options;
}

// let r = {
//   date: new Date("2022-02-23"),
//   startHour: new Date("2022-02-23T10:00:00Z"),
//   endHour: new Date("2022-02-23T15:00:00Z"),
//   people: 2,
// };

module.exports = {
  createBooking,
  getAvailableRoom,
  CalculateCost,
  getBook,
  generateOptions,
  getAllBookings,
  deleteBookings,
  getAllBookingsByUser,
};
