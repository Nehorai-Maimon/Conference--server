function isUrlValid(url) {
  const regExp = new RegExp(
    `((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)`
  );
  return regExp.test(url);
}

module.exports = isUrlValid;
