import { Response } from "express";

export const handleError = (
  res: Response,
  errorMessage: string,
  statusErrorCode: number = 500
): void => {
  res.status(statusErrorCode).json({
    success: false,
    message: errorMessage,
  });
};