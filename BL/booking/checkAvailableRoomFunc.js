const rooms = require("../../DL/controllers/roomController");

async function bookRequestFunc(req) {
  // let finalRooms = [];

  let bookRequest = {
    startHour: req.startHour,
    endHour: req.endHour,
    numOfPeople: req.people,
    room: req.room,
  };
  return bookRequest;
}

async function checkAvailableRoom(req) {
  let result = [];

  const bookRequest = bookRequestFunc(req);

  // get RelevantsRooms by filter :
  let relevantRooms;
  if (bookRequest.room === "AnyRoom") {
    relevantRooms = await rooms.read({
      minOfPeople: { $lte: bookRequest.numOfPeople },
    });
  } else {
    relevantRooms = await rooms.read({
      roomId: bookRequest.room,
      minOfPeople: { $lte: bookRequest.numOfPeople },
      maxOfPeople: { $gte: bookRequest.numOfPeople },
    });
  }
  if (relevantRooms.length === 0) {
    throw new Error("אין חדרים מתאימים לקריטריונים שבחרת");
  }
  // get all booking by filter : date + hours
  let filter = {
    startHour: {
      $lt: bookRequest.endHour,
    },
    endHour: {
      $gt: bookRequest.startHour,
    },
  };

  const allBooking = await booking.read(filter, "roomId -_id");
  console.log({ allBooking });

  for (r of relevantRooms) {
    if (!allBooking.find((b) => b.roomId == r._id)) {
      // Todo: change to object for client (room, date,time,people)
      result.push(r);
    }
  }

  // return result[0];
  return result.slice(0, 3);
}

// const res = getAvailableRoom(req);
// //TODO function caculateCost of res[0]
// if (res) return res[0];

// // ----- PART 2 ------
// const options =  generateOptions(bookRequest);

// for (o of options) {
//   const r = await getAvailableRoom(o);
//   if (r) finalRooms.push(r);
//   if (finalRooms.length >= 3) return finalRooms;
// }
// module.exports = { checkAvailableRoom };
