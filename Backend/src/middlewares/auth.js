import jwt from "jsonwebtoken"
// Auth middleware
export const isAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  // console.log("token", token);

  if (!token) {
    return res.status(401).json({ message: "Please login to account" });
  }
  try {
    const decoded = jwt.verify(token, 'secret');
    // console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
