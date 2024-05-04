export type Context = { status?: number };

export type Middleware = (arg: {
  req: Request;
  url: URL;
  ctx: Context;
}) => Promise<Response | void>;
