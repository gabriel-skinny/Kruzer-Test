import { endOfDay, startOfDay } from "date-fns";
import { IProductModel } from "../database/entities/product-entity";
import { IProductAgregationRepository } from "../database/repositories/productAgregationRepository";
import { IProductRepository } from "../database/repositories/productRepository";
import {
  IInsertProductData,
  IInsertProductFormatoEnum,
  IInsertProductTipoEnum,
} from "../integration/interface";
import { IProductAgregationModel } from "../database/entities/product-agregation";

export interface IInsertProductParams {
  id: string;
  totalPrice: number;
  itemPrice: number;
  name: string;
  quantity: number;
}

interface IBlingHttp {
  requestInsertProduct(data: IInsertProductData): Promise<{ id: string }>;
}

export class ProductService {
  constructor(
    private BlingHttp: IBlingHttp,
    private productRepository: IProductRepository,
    private productAgregationRepository: IProductAgregationRepository
  ) {}

  async insertProduct({
    id,
    name,
    totalPrice,
    itemPrice,
    quantity,
  }: IInsertProductParams) {
    let blingExternalId: string | undefined;
    let errorOnCreation: boolean = false;
    let errorCreationMessage: string | undefined;

    if (await this.productRepository.existsByPipeDriveExternalId(id)) {
      console.log("Product already created for that id");

      return;
    }

    try {
      const { id } = await this.BlingHttp.requestInsertProduct({
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

    const productAgregation = await this.agregateProduct({
      price: totalPrice,
      quantity,
    });

    await this.productRepository.save({
      name,
      price: itemPrice,
      quantity,
      blingExternalId,
      pipeDriveExternalId: id,
      productAgregationId: productAgregation._id,
      errorOnCreation,
      errorCreationMessage,
    });
  }

  private async agregateProduct({
    price,
    quantity,
  }: {
    price: number;
    quantity: number;
  }) {
    let productAgregation: IProductAgregationModel | null;

    const starDateOfToday = startOfDay(Date.now());
    productAgregation = await this.productAgregationRepository.findByGroupDate(
      starDateOfToday
    );
    if (productAgregation) {
      const newSumValue = productAgregation.sumValue + price * quantity;

      await this.productAgregationRepository.updateById({
        id: productAgregation._id,
        updateData: {
          sumValue: newSumValue,
          quantity: productAgregation.quantity + quantity,
        },
      });
    } else {
      const sumValue = price * quantity;
      productAgregation = await this.productAgregationRepository.save({
        quantity: quantity,
        sumValue: sumValue,
        groupDate: startOfDay(Date.now()),
      });
    }

    return productAgregation;
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
    const productToRetry =
      await this.productRepository.findManyWithErrorOnCreation();

    let sucessCount = 0;
    for (const product of productToRetry) {
      try {
        const { id } = await this.BlingHttp.requestInsertProduct({
          nome: product.name,
          preco: product.price,
          formato: IInsertProductFormatoEnum.SIMPLES,
          tipo: IInsertProductTipoEnum.PRODUTO,
        });

        await this.productRepository.updateById({
          id: product._id,
          updateData: {
            errorOnCreation: false,
            errorCreationMessage: undefined,
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
      totalProductToRetry: productToRetry.length,
    };
  }
}
