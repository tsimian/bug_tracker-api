import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const SECRET_KEY: Secret = process.env.JWT_SECRET as string;

const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: any = req.header("Authorization");

    if (!token) {
      res.status(403).send("Access Denied");
      return;
    }

    if (token.startsWith("Bearer")) {
      // Get token from header
      token = token.split(" ")[1];
    }

    const verified: string | jwt.JwtPayload = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export { auth };
