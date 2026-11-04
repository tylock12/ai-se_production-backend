import morgan from 'morgan';
import { Request } from "express";


const isProduction = process.env.NODE_ENV === "production";

morgan.token('user-id', (req) => (req as Request) .user?.userId ?? "anonymous");
const devFormat = ':method :url :status :response-time ms [user-id: :user-id]';
const logFormat = isProduction ? 'combined' : devFormat;

export const requestLogger = morgan(logFormat);