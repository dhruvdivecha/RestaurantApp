import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

declare global {
  namespace Express {
    interface Request {
      authId: string;
      userId: string;
    }
  }
}

const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0Id = decoded?.sub;

    if (!auth0Id) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    const user = await User.findOne({ auth0Id });

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    req.authId = auth0Id;
    req.userId = user._id.toString();
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default { jwtCheck, jwtParse };
