import { Router } from "express";

import { makeControllersFactory } from "./main";
import { authorizationMidleware } from "./midlewares/authorization-midleware";
import { internalAccountValidationMiddleware } from "./midlewares/internal-account-validation-middleware";
import { pipeDriveAccountValidationMiddleware } from "./midlewares/pipedrive-account-validation-middlware";
import { blingCallbackQueryParamsValidatorMidleware } from "./midlewares/bling-callback-queryparams-validator";

export const router = Router();

const { blingController, pipeDriveController, productController } =
  makeControllersFactory();

router.get(
  "/bling/authorization-code-url",
  authorizationMidleware,
  internalAccountValidationMiddleware,
  blingController.getAuthorizationCodeUrl.bind(blingController)
);

router.get(
  "/webhook/bling/authorization-code/callback",
  blingCallbackQueryParamsValidatorMidleware,
  blingController.authorizationCodeCallBack.bind(blingController)
);

router.post(
  "/webhook/pipe-drive/webhook-deal-update",
  authorizationMidleware,
  pipeDriveAccountValidationMiddleware,
  pipeDriveController.webookDealUpdate.bind(pipeDriveController)
);

router.post(
  "/products/retry-creation",
  authorizationMidleware,
  internalAccountValidationMiddleware,
  productController.retryProductCreation.bind(productController)
);

router.get(
  "/products/agregation",
  authorizationMidleware,
  internalAccountValidationMiddleware,
  productController.getManyProductAgregation.bind(productController)
);
