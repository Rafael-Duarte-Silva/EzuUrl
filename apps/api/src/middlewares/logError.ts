import { NextFunction, Request, Response } from "express";

export interface AppError extends Error {
    status?: number;
}

export const logErrors = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.error(err.stack);
    next(err);
};

