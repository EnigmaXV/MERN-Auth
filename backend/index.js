const express = require("express");
const app = express();
const connectDB = require("./config/db");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
//--------------------------------------------------------
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ credentials: true }));
app.use(cookieParser());

//--------------------------------------------------------
app.use("/api/v1/auth", authRouter);
//---------------------------------------------------------
const startServer = async () => {
  const chalk = (await import("chalk")).default;
  try {
    const port = process.env.PORT || 3000;
    const url = process.env.MONGO_URI.replace(
      "<db_password>",
      process.env.MONGO_PASSWORD
    );

    await connectDB(url);

    app.listen(port, () => {
      console.log(chalk.blue("Database connected successfully..."));
    });
  } catch (error) {
    console.log("🚨 " + chalk.red(error));
  }
};

startServer();
