const { MailtrapClient } = require("mailtrap");
require("dotenv").config();

const mailTrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

const sender = {
  email: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};

module.exports = {
  mailTrapClient,
  sender,
};
