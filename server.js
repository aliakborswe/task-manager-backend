require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./src/routes/api");
const mongoose = require("mongoose");
const cors = require("cors");

// Middleware
app.use(express.json());
const originOption =
  process.env.NODE_ENV === "production"
    ? ["https://campcarepluse.netlify.app", "http://localhost:5173"]
    : "http://localhost:5173";
app.use(
  cors({
    origin: originOption,
    credentials: true,
  })
);

// Routes
app.get("/", (_req, res) => {
  res.send("Welcome to Task Manager App");
});

app.get("/health", (_req, res) => {
  res.send("Success");
});

app.use("/api/v1", router);

// MongoDB Connection and Server
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ltyf59a.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(URI).then(() => {
  console.log("MongoDB Connected");
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});
