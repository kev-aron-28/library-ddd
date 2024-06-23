import express, { Express, Router } from "express"
import bodyParser from "body-parser";
import { registerRoutes } from "./routes";
import * as http from 'http';
import path from "path";

export class Server {
  private express: Express;
  private port: string;
  private httpServer?: http.Server;
  constructor(port: string) {
    this.port = port;
    this.express = express();
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    const router = Router();
    this.express.use(router);
    registerRoutes(router);

    this.express.use(express.static(path.join(__dirname, '../frontend/public')));
    this.express.set('view engine', 'ejs');
    this.express.set('views', path.join(__dirname, '../frontend/views'));
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(`Backoffice backend running at http://localhost:${this.port}`);
        console.log('  Press CTRL-C to stop\n');
        resolve();
      })
    })
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }
} 
