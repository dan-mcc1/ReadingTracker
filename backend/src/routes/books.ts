// backend/src/routes/books.ts
import express from "express";
import { PrismaClient } from "@prisma/client";
import { authenticate } from "../middleware/auth";

const router = express.Router();
const prisma = new PrismaClient();

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

  const books = await prisma.book.findMany({ where: { userId: user.id } });
  res.json(books);
});

export default router;
