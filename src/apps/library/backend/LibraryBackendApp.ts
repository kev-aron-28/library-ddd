import { Server } from "./server";

export class LibraryBackendApp {
  server?: Server

  async start() {
    const port = '3001';
    this.server = new Server(port);

    return this.server.listen()
  }

  async stop() {
    return this.server?.stop()
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }
}
