import express, { Express, Router } from "express";
import "dotenv/config";
import { router } from "./routes";
import { makeMongoConnection } from "./database/connection";

class Server {
  app: Express;
  constructor() {
    this.app = express();
  }

  async start() {
    await this.makeDatabaseConnection();
    this.listen();
    this.addRoutes();
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App running on Port: ${process.env.PORT}`);
    });
  }

  addRoutes() {
    this.app.use(router);
  }

  async makeDatabaseConnection() {
    await makeMongoConnection();
  }
}

new Server().start();
