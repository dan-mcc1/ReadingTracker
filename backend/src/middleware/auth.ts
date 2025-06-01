import admin from "firebase-admin";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: admin.auth.DecodedIdToken;
    }
  }
}

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    res.status(401).json({ message: "No token" });
    return; // Return after sending response, don't return the response itself
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next(); // call next middleware
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return; // Same here: return after sending response, don't return response
  }
};
