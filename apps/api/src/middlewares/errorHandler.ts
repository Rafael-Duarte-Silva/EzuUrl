import { NextFunction, Request, Response } from "express";

export interface AppError extends Error {
    status?: number;
}

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ message: "Erro interno no servidor" });
};

