import { PipeDriveIntegration } from "../../integration/pipeDriveIntegration";
import { HttpAdapterStub } from "../mocks/adapters/httpAdapterStub";

describe("PipeDriveIntegration", () => {
  it("Should get data and make request with the rigth parameters", async () => {
    const httpAdapter = new HttpAdapterStub();
    const pipeDriveIntegration = new PipeDriveIntegration(httpAdapter);

    const dealId = "dealId123";
    const products = await pipeDriveIntegration.getProductsFromDeal(dealId);

    expect(products).toBeTruthy();
  });
});
