import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
import {connectDB} from "./config/db.js"
import appRoute from "./routes/app.route.js"
import path from "path";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json());

app.use("/api", appRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
}

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    connectDB();
});