import express, { Express, Router } from "express";
import "dotenv/config";
import { router } from "./routes";
import { makeMongoConnection } from "./database/connection";
import bodyParser from "body-parser";

class Server {
  app: Express;
  constructor() {
    this.app = express();
  }

  async start() {
    await this.makeDatabaseConnection();
    this.config();
    this.addRoutes();
    this.listen();
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App running on Port: ${process.env.PORT}`);
    });
  }

  config() {
    this.app.use(bodyParser.json());
  }

  addRoutes() {
    this.app.use(router);
  }

  async makeDatabaseConnection() {
    await makeMongoConnection();
  }
}

new Server().start();
