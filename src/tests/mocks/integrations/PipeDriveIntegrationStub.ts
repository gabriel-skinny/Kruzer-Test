import {
  IGetProductsFromDealData,
  IPipeDriveIntegration,
} from "../../../services/protocols/integrations/pipeDriveIntegration";

export class PipeDriveIntegrationStub implements IPipeDriveIntegration {
  getProductsFromDeal(dealId: string): Promise<IGetProductsFromDealData[]> {
    throw new Error("Method not implemented.");
  }
}
