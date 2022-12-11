function isDateValid(date) {
  return !!new Date(date).valueOf();
}

module.exports = isDateValid;
