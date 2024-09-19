import {
  IBlingIntegration,
  IInsertProductData,
} from "../../../services/protocols/integrations/blingIntegration";

export class BlingIntegrationStub implements IBlingIntegration {
  requestInsertProduct(data: IInsertProductData): Promise<{ id: string }> {
    throw new Error("Method not implemented.");
  }
  makeAuthorizationCodeUrl(): { authorizationCodeUrl: string } {
    throw new Error("Method not implemented.");
  }
  authorizationCallBack(data: { state: string; code: string }): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
