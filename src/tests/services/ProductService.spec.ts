import { ProductService } from "../../services/ProductService";
import { insertProductData } from "../mocks/data/insertProductData";
import { makeProductModel } from "../mocks/factories/makeProductModel";
import { BlingIntegrationStub } from "../mocks/integrations/BlingIntegrationStub";
import { InMemoryProductAgregationRepository } from "../mocks/repositories/inMemoryProductAgregationRepository";
import { InMemoryProductRepository } from "../mocks/repositories/inMemoryProductRepository";

const makeSut = () => {
  const blingIntegration = new BlingIntegrationStub();
  const productRepository = new InMemoryProductRepository();
  const productAgregationRepository = new InMemoryProductAgregationRepository();

  const productService = new ProductService(
    blingIntegration,
    productRepository,
    productAgregationRepository
  );

  return {
    productService,
    blingIntegration,
    productRepository,
    productAgregationRepository,
  };
};

describe("ProductService", () => {
  describe("InsertProduct method", () => {
    it("Should create a product and sent to integration", async () => {
      const {
        productService,
        productRepository,
        blingIntegration,
        productAgregationRepository,
      } = makeSut();

      const blingExternalId = "blingId123";
      blingIntegration.requestInsertProduct = jest
        .fn()
        .mockReturnValueOnce({ id: blingExternalId });

      const response = await productService.insertProduct(insertProductData);

      expect(productRepository.database).toHaveLength(1);
      expect(productAgregationRepository.database).toHaveLength(1);
      expect(productRepository.database[0]).toMatchObject({
        name: insertProductData.name,
        price: insertProductData.itemPrice,
        quantity: insertProductData.quantity,
        blingExternalId,
        pipeDriveExternalId: insertProductData.id,
        productAgregationId: productAgregationRepository.database[0]._id,
        errorOnCreation: false,
        errorCreationMessage: undefined,
      });
      expect(blingIntegration.requestInsertProduct).toHaveBeenCalledTimes(1);
      expect(response).toStrictEqual({
        productId: productRepository.database[0]._id,
      });
    });

    it("Should not create a product with it is already created", async () => {
      const { productService, productRepository, blingIntegration } = makeSut();

      const pipeDriveId = "pipeDrive123";
      const product = makeProductModel({ pipeDriveExternalId: pipeDriveId });
      await productRepository.save(product);

      productRepository.save = jest.fn();
      blingIntegration.requestInsertProduct = jest.fn();

      const data = { ...insertProductData, id: pipeDriveId };

      const response = await productService.insertProduct(data);

      expect(productRepository.save).not.toHaveBeenCalled();
      expect(blingIntegration.requestInsertProduct).not.toHaveBeenCalled();
      expect(response).toBeFalsy();
    });

    it("Should create a product with error with integration fails to insert product", async () => {
      const {
        productService,
        productRepository,
        blingIntegration,
        productAgregationRepository,
      } = makeSut();

      const errorMessage = "Error on integration";
      blingIntegration.requestInsertProduct = jest
        .fn()
        .mockImplementationOnce(() => {
          throw new Error(errorMessage);
        });

      await productService.insertProduct(insertProductData);

      expect(productRepository.database).toHaveLength(1);
      expect(productAgregationRepository.database).toHaveLength(1);
      expect(productRepository.database[0]).toMatchObject({
        name: insertProductData.name,
        price: insertProductData.itemPrice,
        quantity: insertProductData.quantity,
        blingExternalId: undefined,
        pipeDriveExternalId: insertProductData.id,
        productAgregationId: productAgregationRepository.database[0]._id,
        errorOnCreation: true,
        errorCreationMessage: errorMessage,
      });
    });
  });
  describe("RetryProductCreation methdod", () => {
    it.only("Should retry all products with errorOnCreation and update error to false", async () => {
      const {
        productService,
        productRepository,
        blingIntegration,
        productAgregationRepository,
      } = makeSut();

      const productData = {
        errorOnCreation: true,
        errorCreationMessage: "error",
      };
      const productsWithError = [
        makeProductModel(productData),
        makeProductModel(productData),
        makeProductModel(productData),
      ];
      for (const product of productsWithError)
        await productRepository.save(product);

      const blingExternalId = "blingId";
      blingIntegration.requestInsertProduct = jest
        .fn()
        .mockReturnValue({ id: blingExternalId });

      const response = await productService.retryProductCreation();

      expect(response).toStrictEqual({
        sucessCount: productsWithError.length,
        totalProductToRetry: productsWithError.length,
      });

      for (const index in productsWithError) {
        expect(productRepository.database[index]).toMatchObject({
          errorOnCreation: false,
          errorCreationMessage: null,
          blingExternalId,
        });
      }
    });
  });
});
