import { BlingController } from "./controllers/BlingController";
import { PipeDriveController } from "./controllers/PipeDriveController";
import { ProductController } from "./controllers/ProductController";
import { ProductAgregationModel } from "./database/entities/product-agregation";
import { ProductModel } from "./database/entities/product-entity";
import { WebhookModel } from "./database/entities/pipedrive-webhook-entity";
import { ProductAgregationRepository } from "./database/repositories/productAgregationRepository";
import { ProductRepository } from "./database/repositories/productRepository";
import { WebhookRepository } from "./database/repositories/pipeDriveWebhookRepository";
import { BlingIntegration } from "./integration/blingIntegration";
import { PipeDriveService } from "./service/PipeDriveService";
import { ProductService } from "./service/ProductService";

export const makeControllersFactory = () => {
  const blingIntegration = new BlingIntegration();

  const productRepository = new ProductRepository(ProductModel);
  const productAgregationRepository = new ProductAgregationRepository(
    ProductAgregationModel
  );
  const productService = new ProductService(
    blingIntegration,
    productRepository,
    productAgregationRepository
  );

  const webhookRepository = new WebhookRepository(WebhookModel);
  const pipeDriveService = new PipeDriveService(
    webhookRepository,
    productService
  );

  const pipeDriveController = new PipeDriveController(pipeDriveService);
  const blingController = new BlingController(blingIntegration);
  const productController = new ProductController(productService);

  return { pipeDriveController, blingController, productController };
};
