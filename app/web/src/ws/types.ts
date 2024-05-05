export type WSEvent = (ws: WebSocket, content: any) => Promise<void>;
