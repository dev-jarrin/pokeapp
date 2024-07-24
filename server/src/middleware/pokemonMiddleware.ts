import { Request, Response, NextFunction } from "express";

const PokeApiMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validate query parameters
  if (!req.query.id && !(req.query.limit && req.query.offset)) {
    return res.status(400).json({
      error: true,
      message: "Please provide either an ID or limit and offset",
      data: null,
    });
  }
  next();
};

export default PokeApiMiddleware;
