import { PipeDriveService } from "../../services/PipeDriveService";
import { ProductService } from "../../services/ProductService";
import { mockProductData } from "../mocks/data/productsData";
import { mockWebhookDealUpdateData } from "../mocks/data/webhookDealUpdateData";
import { makePipedriveWebhookModel } from "../mocks/factories/makePipedriveWebhookModel";
import { PipeDriveIntegrationStub } from "../mocks/integrations/PipeDriveIntegrationStub";
import { InMemoryPipeDriveWebhookRepository } from "../mocks/repositories/inMemoryPipeDriveWebhookRepository";
import { ProductServiceStub } from "../mocks/services/productServiceStub";

const makeSut = () => {
  const pipedriveWebhookRepository = new InMemoryPipeDriveWebhookRepository();
  const productService = new ProductServiceStub();
  const pipedriveIntegration = new PipeDriveIntegrationStub();

  const pipeDriveService = new PipeDriveService(
    pipedriveWebhookRepository,
    productService,
    pipedriveIntegration
  );

  return {
    pipeDriveService,
    pipedriveWebhookRepository,
    productService,
    pipedriveIntegration,
  };
};

describe("PipeDriveService", () => {
  it("Should create a webhook and request to insert products", async () => {
    const {
      pipeDriveService,
      pipedriveIntegration,
      productService,
      pipedriveWebhookRepository,
    } = makeSut();

    const productsOnDeal = [mockProductData, mockProductData, mockProductData];
    pipedriveIntegration.getProductsFromDeal = jest
      .fn()
      .mockReturnValueOnce(productsOnDeal);
    productService.insertProduct = jest.fn();

    const webhookData = { ...mockWebhookDealUpdateData };
    webhookData.meta.action = "change";
    webhookData.data.status = "won";
    webhookData.previous.status = "open";

    await pipeDriveService.handleUpdateDealEvent(webhookData);

    expect(pipedriveWebhookRepository.database).toHaveLength(1);
    expect(pipedriveWebhookRepository.database[0]).toMatchObject({
      dealData: webhookData.data,
      webhook_external_id: webhookData.meta.id,
      type: "changeDeal",
    });
    expect(productService.insertProduct).toHaveBeenCalledTimes(
      productsOnDeal.length
    );
    expect(productService.insertProduct).toHaveBeenCalledWith({
      id: String(mockProductData.id),
      name: mockProductData.name,
      quantity: mockProductData.quantity,
      itemPrice: mockProductData.item_price,
      totalPrice: mockProductData.sum,
    });
  });

  it("Should throw an error if webhook action is not 'change'", async () => {
    const { pipeDriveService } = makeSut();

    const webhookData = { ...mockWebhookDealUpdateData };
    webhookData.meta.action = "add";
    const handleUpdatePromise =
      pipeDriveService.handleUpdateDealEvent(webhookData);

    expect(handleUpdatePromise).rejects.toStrictEqual(
      new Error("Not suported action")
    );
  });

  it("Should throw an error if webhook is duplicated", async () => {
    const { pipeDriveService, pipedriveWebhookRepository } = makeSut();

    const pipedriveWebhook = makePipedriveWebhookModel();
    await pipedriveWebhookRepository.save(pipedriveWebhook);

    const webhookData = { ...mockWebhookDealUpdateData };
    webhookData.meta.action = "change";
    webhookData.meta.id = pipedriveWebhook.webhook_external_id;

    const handleUpdatePromise =
      pipeDriveService.handleUpdateDealEvent(webhookData);

    expect(handleUpdatePromise).rejects.toStrictEqual(
      new Error("Duplicated webhook")
    );
  });

  it("Should only save webhook and not insert product if webhook.data.status is not 'won'", async () => {
    const {
      pipeDriveService,
      pipedriveIntegration,
      pipedriveWebhookRepository,
    } = makeSut();

    pipedriveIntegration.getProductsFromDeal = jest.fn();

    const webhookData = { ...mockWebhookDealUpdateData };
    webhookData.meta.action = "change";
    webhookData.data.status = "open";

    await pipeDriveService.handleUpdateDealEvent(webhookData);

    expect(pipedriveIntegration.getProductsFromDeal).not.toHaveBeenCalled();
    expect(pipedriveWebhookRepository.database).toHaveLength(1);
  });

  it("Should only save webhook and not insert product if webhook.data.status is 'won' but previus status is not 'open'", async () => {
    const {
      pipeDriveService,
      pipedriveIntegration,
      pipedriveWebhookRepository,
    } = makeSut();

    pipedriveIntegration.getProductsFromDeal = jest.fn();

    const webhookData = { ...mockWebhookDealUpdateData };
    webhookData.meta.action = "change";
    webhookData.data.status = "won";
    webhookData.previous.status = "won";

    await pipeDriveService.handleUpdateDealEvent(webhookData);

    expect(pipedriveIntegration.getProductsFromDeal).not.toHaveBeenCalled();
    expect(pipedriveWebhookRepository.database).toHaveLength(1);
  });

  it("Should save webhook if getProductsFromDeal throws an error", async () => {
    const {
      pipeDriveService,
      pipedriveIntegration,
      pipedriveWebhookRepository,
      productService,
    } = makeSut();

    pipedriveIntegration.getProductsFromDeal = jest
      .fn()
      .mockImplementationOnce(() => {
        throw new Error("Error on Get Products");
      });
    productService.insertProduct = jest.fn();

    const webhookData = { ...mockWebhookDealUpdateData };
    webhookData.meta.action = "change";
    webhookData.data.status = "won";
    webhookData.previous.status = "open";

    await pipeDriveService.handleUpdateDealEvent(webhookData);

    expect(productService.insertProduct).not.toHaveBeenCalled();
    expect(pipedriveWebhookRepository.database).toHaveLength(1);
  });

  it("Should save webhook if insertProduct throws an error", async () => {
    const {
      pipeDriveService,
      pipedriveIntegration,
      pipedriveWebhookRepository,
      productService,
    } = makeSut();

    pipedriveIntegration.getProductsFromDeal = jest
      .fn()
      .mockReturnValueOnce([mockProductData]);
    productService.insertProduct = jest.fn().mockImplementationOnce(() => {
      throw new Error("Error on InsertProduct");
    });

    const webhookData = { ...mockWebhookDealUpdateData };
    webhookData.meta.action = "change";
    webhookData.data.status = "won";
    webhookData.previous.status = "open";

    await pipeDriveService.handleUpdateDealEvent(webhookData);

    expect(pipedriveWebhookRepository.database).toHaveLength(1);
  });
});
