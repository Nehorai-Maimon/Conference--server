const rooms = require("../../DL/controllers/roomController");
const { validateAddNewRoom } = require("./roomValidation");

const allRooms = async () => {
  try {
    const allRooms = await rooms.read({});
    return allRooms;
  } catch (error) {
    return error;
  }
};

const addNewRoom = async (body) => {
  try {
    const {
      name,
      minOfPeople,
      maxOfPeople,
      hourlyMoneyCost,
      hourlyCreditCost,
    } = body;

    const room = await findUniqueRoom(name);
    if (room) throw new Error("שם החדר כבר קיים");

    //validate the body
    const validationErrors = validateAddNewRoom(body);
    if (validationErrors.length) {
      throw new Error(validationErrors.join(";"));
    }

    const newRoom = {
      name,
      minOfPeople,
      maxOfPeople,
      hourlyMoneyCost,
      hourlyCreditCost,
    };
    const createRoom = await rooms.create(newRoom);
    return createRoom;
  } catch (err) {
    console.log("🚀 ~ file: roomLogic.js ~ line 42 ~ addNewRoom ~ err", err);
    throw err;
  }
};

const updateRoom = async (body) => {
  const room = await findUniqueRoom(body.name);
  if (room) {
    const editRoom = body;
    const newRoom = await rooms.update(room._id, editRoom);
    if (newRoom._id) {
      return newRoom + " החדר התעדכן בהצלחה ";
    } else {
      throw { message: "החדר לא נשמר - בעייה בהגשת הנתונים", status: 500 };
    }
  } else {
    throw { message: "החדר לא קיים", status: 404 };
  }
};

const deleteRoom = async (name) => {
  try {
    // const room = await findUniqueRoom(name);
    // console.log("room" + room);
    // if (room) {
    console.log("room delete");
    const roomDelete = await rooms.del({ name: name });
    if (roomDelete) {
      return `חדר ${roomDelete.name} נמחק בהצלחה`;
    } else {
      throw new Error("מחיקת הרשומה לא הצליחה");
    }
  } catch (error) {
    throw error;
  }
};

const findUniqueRoom = async (name) => {
  const room = await rooms.readOne({ name: name });
  if (room) {
    return room;
  } else {
    return false;
  }
};

module.exports = {
  allRooms,
  findUniqueRoom,
  addNewRoom,
  updateRoom,
  deleteRoom,
};
