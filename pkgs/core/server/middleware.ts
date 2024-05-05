import { apiMiddleware } from "./middleware/api";
import { webMiddleware } from "./middleware/web";

export const middlewares = [apiMiddleware, webMiddleware];
