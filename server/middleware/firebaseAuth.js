// middleware/verifyFirebaseUser.js
import admin from "../utils/firebaseAmdin.js";

export const verifyFirebaseUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const idToken = authHeader.split(" ")[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.firebaseUser = decodedToken; // Contains uid, email, etc.
    next();
  } catch (err) {
    console.error("Firebase token error:", err.message);
    return res.status(403).json({ message: "Invalid Firebase token" });
  }
};
