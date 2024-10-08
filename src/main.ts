import { BlingController } from "./controllers/BlingController";
import { PipeDriveController } from "./controllers/PipeDriveController";
import { ProductController } from "./controllers/ProductController";
import { ProductAgregationModel } from "./database/entities/product-agregation";
import { ProductModel } from "./database/entities/product-entity";

import { ProductAgregationRepository } from "./database/repositories/productAgregationRepository";
import { ProductRepository } from "./database/repositories/productRepository";
import { WebhookRepository } from "./database/repositories/pipeDriveWebhookRepository";
import { BlingIntegration } from "./integration/blingIntegration";
import { PipeDriveService } from "./services/PipeDriveService";
import { ProductService } from "./services/ProductService";
import { PipeDriveWebhookModel } from "./database/entities/pipedrive-webhook-entity";
import { PipeDriveIntegration } from "./integration/pipeDriveIntegration";
import { AxiosAdapter } from "./adapters/axiosAdapter";

export const makeControllersFactory = () => {
  const axiosAdapter = new AxiosAdapter();
  const blingIntegration = new BlingIntegration(axiosAdapter);

  const productRepository = new ProductRepository(ProductModel);
  const productAgregationRepository = new ProductAgregationRepository(
    ProductAgregationModel
  );
  const productService = new ProductService(
    blingIntegration,
    productRepository,
    productAgregationRepository
  );

  const webhookRepository = new WebhookRepository(PipeDriveWebhookModel);
  const pipeDriveIntegration = new PipeDriveIntegration(axiosAdapter);
  const pipeDriveService = new PipeDriveService(
    webhookRepository,
    productService,
    pipeDriveIntegration
  );

  const pipeDriveController = new PipeDriveController(pipeDriveService);
  const blingController = new BlingController(blingIntegration);
  const productController = new ProductController(productService);

  return { pipeDriveController, blingController, productController };
};
