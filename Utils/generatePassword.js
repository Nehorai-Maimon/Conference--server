const PASSWORD_LENGTH = 12;

function generatePassword() {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let password = "";

  for (let i = 0; i <= PASSWORD_LENGTH; i++) {
    let randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  return password;
}

module.exports = generatePassword;
