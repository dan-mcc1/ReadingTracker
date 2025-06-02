import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import booksRouter from "./routes/books"; // ✅ import your books router

// Initialize env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Mount the router properly
app.use("/api/books", booksRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
