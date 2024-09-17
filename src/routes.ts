import { Router } from "express";

import { makeControllersFactory } from "./main";
import { authorizationMidleware } from "./midlewares/authorization-midleware";

export const router = Router();

const { blingController, pipeDriveController, productController } =
  makeControllersFactory();

router.get("/bling/authorize", blingController.authorize.bind(blingController));

router.post(
  "/webhook/pipe-drive/webhook-deal-update",
  authorizationMidleware,
  pipeDriveController.webookDealUpdate.bind(pipeDriveController)
);

router.post(
  "/webhook/bling/authorization-code",
  authorizationMidleware,
  blingController.getAuthorizationCode.bind(blingController)
);

router.get(
  "/products/agregation",
  productController.getManyProductAgregation.bind(productController)
);
