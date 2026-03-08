import { NextFunction, Request, Response } from "express";

export const clientErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (req.xhr) {
        res.status(500).send({ message: "Something failed!" });
    } else {
        next(err);
    }
};

