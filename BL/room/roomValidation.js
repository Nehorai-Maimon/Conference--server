function validateAddNewRoom(data) {
  const { name, minOfPeople, maxOfPeople, hourlyMoneyCost, hourlyCreditCost } =
    data;

  const errors = [];

  if (!name) {
    errors.push("Name must not be empty");
  }
  if (!minOfPeople) {
    errors.push("minOfPeople must not be empty");
  }
  if (minOfPeople > maxOfPeople) {
    errors.push("minOfPeople can't be greater than maxOfPeople");
  }
  if (!maxOfPeople) {
    errors.push("maxOfPeople must not be empty");
  }
  if (!hourlyMoneyCost) {
    errors.push("hourlyMoneyCost must not be empty");
  }
  if (hourlyMoneyCost < 1 || hourlyMoneyCost > 10000) {
    errors.push("hourlyMoneyCost must  be between 0 and 10000");
  }
  if (!hourlyCreditCost) {
    errors.push("hourlyCreditCost must not be empty");
  }
  if (hourlyCreditCost < 1 || hourlyCreditCost > 10000) {
    errors.push("hourlyCreditCost must  be between 0 and 10000");
  }
  return errors;
}

module.exports = { validateAddNewRoom };
