export type Context = { status?: number; prasi: any };

export type Middleware = (arg: {
  req: Request;
  url: URL;
  ctx: Context;
}) => Promise<Response | void>;
