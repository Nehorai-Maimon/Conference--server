const room = {
  name: "Micky-castle",
  maxOfPepole: 4,
  hourlyCreditCost: 120,
  hourlyMoneyCost: 80,
};

const user = {
  firstName: "donald",
  lastName: "duck",
  password: "Daisy",
  email: "DonaldRule123@getMaxListeners.com",
  phone: 0505 - 5555555,
  isAdmin: false,
  isSubscribed: true,
  discountPercentage: 0,
  creditsData: {
    monthlyCredits: 400,
    currentMonthBalance: 120,
    nextMonthBalance: 300,
    purchasedCreditBalance: 1000,
  },
};

const book = {
  meetingDate: "26/04/2022",
  startHour: new Date(2022, 04, 23, 10, 15),
  endHour: new Date(2022, 04, 23, 12, 15),
  maxOfPeople: 4,
};

function CalculateCost(roomSchema, userSchema, bookSchema) {
  let bookingPrice = null;
  const timeOfMeeting = book.endHour.getHours() - book.startHour.getHours();
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

CalculateCost(room, user, book);
