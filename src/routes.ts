import { Router } from "express";
import { PipeDriveController } from "./controllers/PipeDriveController";
import { BlingController } from "./controllers/BlingController";
import { BlingIntegration } from "./integration/blingIntegration";
import { PipeDriveService } from "./service/PipeDriveService";
import { WebhookRepository } from "./database/repositories/webhookRepository";

import { BlingService } from "./service/BlingService";
import { ProductRepository } from "./database/repositories/productRepository";
import { ProductModel } from "./database/entities/product-entity";
import { WebhookModel } from "./database/entities/webhook-entity";
import { authorizationMidleware } from "./midlewares/authorization-midleware";

export const router = Router();

const blingIntegration = new BlingIntegration();

const productRepository = new ProductRepository(ProductModel);
const blingService = new BlingService(blingIntegration, productRepository);

const webhookRepository = new WebhookRepository(WebhookModel);
const pipeDriveService = new PipeDriveService(webhookRepository, blingService);

const pipeDriveController = new PipeDriveController(pipeDriveService);
const blingController = new BlingController(blingIntegration);

router.get("/authorize", blingController.authorize);

router.get(
  "/webhook",
  authorizationMidleware,
  pipeDriveController.webookDealUpdate
);

router.post(
  "/webhook/bling/authorization-code",
  authorizationMidleware,
  blingController.getAuthorizationCode
);
