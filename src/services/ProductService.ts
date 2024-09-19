import { startOfDay } from "date-fns";

import { IProductAgregationModel } from "../database/entities/product-agregation";

import {
  IBlingIntegration,
  IInsertProductFormatoEnum,
  IInsertProductTipoEnum,
} from "./protocols/integrations/blingIntegration";
import {
  IInsertProductParams,
  IProductService,
} from "./protocols/services/productService";
import { IProductRepository } from "./protocols/repositories/productRepository";
import { IProductAgregationRepository } from "./protocols/repositories/productAgregationRepository";

export class ProductService implements IProductService {
  constructor(
    private blingIntegration: IBlingIntegration,
    private productRepository: IProductRepository,
    private productAgregationRepository: IProductAgregationRepository
  ) {}

  async insertProduct({
    id,
    name,
    totalPrice,
    itemPrice,
    quantity,
  }: IInsertProductParams): Promise<{ productId: string } | undefined> {
    let blingExternalId: string | undefined;
    let errorOnCreation: boolean = false;
    let errorCreationMessage: string | undefined;

    if (await this.productRepository.existsByPipeDriveExternalId(id)) {
      console.log("Product already created for that id");

      return;
    }

    try {
      const { id } = await this.blingIntegration.requestInsertProduct({
        nome: name,
        preco: itemPrice,
        formato: IInsertProductFormatoEnum.SIMPLES,
        tipo: IInsertProductTipoEnum.PRODUTO,
      });

      blingExternalId = id;
    } catch (error: any) {
      console.log(error);
      errorOnCreation = true;
      errorCreationMessage = error.message;
    }

    const { productAgregationId } = await this.agregateProduct({
      sumPrice: totalPrice,
      quantity,
    });

    const product = await this.productRepository.save({
      name,
      price: itemPrice,
      quantity,
      blingExternalId,
      pipeDriveExternalId: id,
      productAgregationId,
      errorOnCreation,
      errorCreationMessage,
    });

    return { productId: product._id };
  }

  private async agregateProduct({
    sumPrice,
    quantity,
  }: {
    sumPrice: number;
    quantity: number;
  }): Promise<{ productAgregationId: string }> {
    let productAgregation: IProductAgregationModel | null;

    const starDateOfToday = startOfDay(Date.now());
    productAgregation = await this.productAgregationRepository.findByGroupDate(
      starDateOfToday
    );
    if (productAgregation) {
      const newSumValue = productAgregation.sumValue + sumPrice;

      await this.productAgregationRepository.updateById({
        id: productAgregation._id,
        updateData: {
          sumValue: newSumValue,
          quantity: productAgregation.quantity + quantity,
        },
      });
    } else {
      const sumValue = sumPrice;
      productAgregation = await this.productAgregationRepository.save({
        quantity: quantity,
        sumValue: sumValue,
        groupDate: startOfDay(Date.now()),
      });
    }

    return { productAgregationId: productAgregation._id };
  }

  async getProductAgregations(filter?: {
    startDate: Date;
    endDate: Date;
  }): Promise<IProductAgregationModel[]> {
    const products =
      await this.productAgregationRepository.findManyOnGroupDateRange(filter);

    return products;
  }

  async retryProductCreation(): Promise<{
    totalProductToRetry: number;
    sucessCount: number;
  }> {
    const productsToRetry =
      await this.productRepository.findManyWithErrorOnCreation();

    let sucessCount = 0;
    for (const product of productsToRetry) {
      try {
        const { id } = await this.blingIntegration.requestInsertProduct({
          nome: product.name,
          preco: product.price,
          formato: IInsertProductFormatoEnum.SIMPLES,
          tipo: IInsertProductTipoEnum.PRODUTO,
        });

        await this.productRepository.updateById({
          id: product._id,
          updateData: {
            errorOnCreation: false,
            errorCreationMessage: null,
            blingExternalId: id,
          },
        });

        sucessCount++;
      } catch (error) {
        console.log(error);
      }
    }

    return {
      sucessCount,
      totalProductToRetry: productsToRetry.length,
    };
  }
}
