import express from "express";
import "dotenv/config";
import router from "./routes/Routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
const PORT = 5000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
    credentials: true,
  })
);

app.use(cookieParser());

// app.use(bodyParser());

app.use(express.json());

app.use("/api", router);

const server = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

server.on("error", (err) => {
  console.error(`Error starting server: ${err.message}`);
  process.exit(1);
});
