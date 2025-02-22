import dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "./src/routes/api.js";
import mongoose from "mongoose";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const server = createServer(app);
const originOption =
  process.env.NODE_ENV === "production"
    ? ["https://todos56.netlify.app", "http://localhost:5173"]
    : "http://localhost:5173";
const io = new Server(server, {
  cors: {
    origin: originOption, // Adjust frontend URL if needed
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(express.json());
app.use(cors());

// Routes
app.get("/", (_req, res) => {
  res.send("Welcome to Task Manager App");
});
app.get("/health", (_req, res) => {
  res.send("Success");
});

// MongoDB Connection and Server
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ltyf59a.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
mongoose
  .connect(URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.use("/api/v1", router);

// Real-time updates with Change Streams
const db = mongoose.connection;
db.once("open", () => {
  console.log("Listening for changes...");

  const taskChangeStream = db.collection("tasks").watch();
  taskChangeStream.on("change", (change) => {
    // console.log("Change detected:", change);

    if (change.operationType === "insert") {
      io.emit("taskAdded", change.fullDocument);
    }
    if (change.operationType === "update") {
      io.emit("taskUpdated", {
        _id: change.documentKey._id,
        ...change.updateDescription.updatedFields,
      });
    }
    if (change.operationType === "delete") {
      io.emit("taskDeleted", change.documentKey._id);
    }
  });
});

// WebSocket Connection
io.on("connection", (socket) => {
  // console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    // console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
