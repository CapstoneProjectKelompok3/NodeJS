import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({
      status_code: 401,
      result: "Unauthorized",
      message: "Unauthorized: You must log in first.",
    });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
};

export const verifyTokenSuperAdmin = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({
      status_code: 401,
      result: "Unauthorized",
      message: "Unauthorized: You must log in first.",
    });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    if (decoded.level !== "superadmin") {
      return res.status(401).json({
        status_code: 401,
        result: "Unauthorized",
        message: "Access restricted to super admin only.",
      });
    }
    req.user = decoded;
    next();
  });
};

export const verifyTokenAdmin = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({
      status_code: 401,
      result: "Unauthorized",
      message: "Unauthorized: You must log in first.",
    });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    if (decoded.level === "admin" || decoded.level === "superadmin") {
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({
        status_code: 401,
        result: "Unauthorized",
        message: "Access restricted to super admin or admin only.",
      });
    }
  });
};
