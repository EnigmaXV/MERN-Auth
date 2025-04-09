const { MailtrapClient } = require("mailtrap");
require("dotenv").config();

const mailTrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

const sender = {
  email: "hello@omarawad.me",
  name: "Omar Awad",
};

module.exports = {
  mailTrapClient,
  sender,
};
