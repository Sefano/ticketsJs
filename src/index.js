import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import ticketApi from "./api/ticketApi.js";

const app = express();

const PORT = 6543;

//mw
app.use(express.json());

//api
ticketApi(app);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Сервер успешно запрущен на порту ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
