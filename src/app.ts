import express from "express";
import "dotenv/config";
import router from "./routes/Routes.js";

const PORT = 5000;

const app = express();

app.use(express.json());

app.use("/api", router);



const server = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

server.on("error", (err) => {
  console.error(`Error starting server: ${err.message}`);
  process.exit(1);
});
