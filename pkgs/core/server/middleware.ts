import { api } from "./middleware/api";
import { web } from "./middleware/web";

export const middlewares = [api, web];
