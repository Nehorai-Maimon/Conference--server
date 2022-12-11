const axios = require("axios");

async function sendMail(senderInfo, receiverInfo, template) {
  const apiKey = process.env.SIB_EMAIL_API_KEY;
  const emailApiUrl = process.env.SIB_EMAIL_API_URL;

  const data = {
    sender: {
      name: senderInfo.name,
      email: senderInfo.email,
    },
    to: [
      {
        email: receiverInfo.email,
        name: receiverInfo.name,
      },
    ],
    subject: template.subject,
    htmlContent: template.htmlContent,
  };

  const headers = {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
  };

  const res = await axios.post(emailApiUrl, data, headers);
  return res;
}

module.exports = sendMail;
