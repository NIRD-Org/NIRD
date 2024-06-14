// Auth middleware
export const isAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("token",token);

  if (!token) {
    return res.status(401).json({message:"Please login to account"});
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new ErrorHandler("Please login first", 401));
  }
};
