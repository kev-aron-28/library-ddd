import { Server } from "./server";

export class BackofficeBackendApp {
  server?: Server

  async start() {
    const port = '3000';
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
