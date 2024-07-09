import { NextFunction, Request, Response } from "express";

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
    const currentDateTime = new Date().toISOString();
    console.log(`[${currentDateTime}] Estas ejecutando un método ${req.method} en la ruta ${req.url}`,);
    next();
}