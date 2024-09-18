import { Router } from "express";

import { makeControllersFactory } from "./main";
import { authorizationMidleware } from "./midlewares/authorization-midleware";

export const router = Router();

const { blingController, pipeDriveController, productController } =
  makeControllersFactory();

router.get(
  "/bling/request-authorization-code",
  blingController.requestAuthorizationCode.bind(blingController)
);

router.get(
  "/webhook/bling/authorization-code/callback",
  blingController.authorizationCodeCallBack.bind(blingController)
);

router.post(
  "/webhook/pipe-drive/webhook-deal-update",
  authorizationMidleware,
  pipeDriveController.webookDealUpdate.bind(pipeDriveController)
);

router.post(
  "/products/retry-creation",
  productController.retryProductCreation.bind(productController)
);

router.get(
  "/products/agregation",
  productController.getManyProductAgregation.bind(productController)
);
