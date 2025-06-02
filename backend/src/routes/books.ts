// backend/src/routes/books.ts
import express from "express";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { authenticate } from "../middleware/auth";
import { searchGoogleBooks } from "../services/googleBooks";
import { searchOpenLibrary } from "../services/openLibrary";
import { mergeResults } from "../utils/mergeResults";

const router = express.Router();
const prisma = new PrismaClient();

// 🔐 GET user's saved books from DB
router.get("/", authenticate, async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const userId = req.user.uid;
  const user = await prisma.user.findUnique({ where: { firebaseId: userId } });
  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  const userBooks = await prisma.userBook.findMany({
    where: { userId: user.id },
    include: { book: true },
  });
  // const books = userBooks.map((ub) => ub.book);
  res.json(userBooks);
});

// 🌐 GET search results from Open Library + Google Books
router.get("/search", async (req, res): Promise<any> => {
  const query = req.query.q as string;
  if (!query) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    // 🌍 Open Library
    const openLibraryResults = await searchOpenLibrary(query, 25);

    // 📚 Google Books
    const googleBooksResults = await searchGoogleBooks(query, 25);

    const results = mergeResults(openLibraryResults, googleBooksResults);

    res.json({
      data: results,
    });
  } catch (error) {
    console.error("Search failed:", error);
    res.status(500).json({ error: "Failed to fetch external book data" });
  }
});

export default router;
