import { apiMiddleware } from "./api";
import { webMiddleware } from "./web";

export const middlewares = [apiMiddleware, webMiddleware];
