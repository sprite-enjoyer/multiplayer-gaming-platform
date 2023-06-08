import dotenv from "dotenv";
import express from "express";
const app = express();
dotenv.config();

const PORT = 3000;

app.listen(PORT, () => {
  console.log("express server started at port: " + PORT + "!");
});

