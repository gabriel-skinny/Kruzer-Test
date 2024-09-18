import { endOfDay, startOfDay } from "date-fns";
import { IProductModel } from "../database/entities/product-entity";
import { IProductAgregationRepository } from "../database/repositories/productAgregationRepository";
import { IProductRepository } from "../database/repositories/productRepository";
import { IInsertProductData } from "../integration/interface";
import { IProductAgregationModel } from "../database/entities/product-agregation";

export interface IInsertProductParams {
  price: number;
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

  async insertProduct({ name, price, quantity }: IInsertProductParams) {
    const { id } = await this.BlingHttp.requestInsertProduct({
      nome: name,
      preco: price,
      formato: "S",
      tipo: "P",
    });

    const productAgregation = await this.agregateProduct({ price, quantity });

    await this.productRepository.save({
      name,
      price,
      quantity,
      externalId: id,
      productAgregationId: productAgregation._id,
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
}
