import { IProductModel } from "../database/entities/product-entity";
import { IProductRepository } from "../database/repositories/productRepository";
import { IInsertProductData } from "../integration/interface";

interface IInsertProductParams {
  price: number;
  name: string;
  quantity: number;
}

interface IBlingHttp {
  requestInsertProduct(data: IInsertProductData): Promise<{ id: string }>;
}

export interface IBillingService {
  insertProduct(data: IInsertProductParams): Promise<void>;
}

export class BlingService implements IBillingService {
  constructor(
    private BlingHttp: IBlingHttp,
    private productRepository: IProductRepository
  ) {}

  async insertProduct({ name, price, quantity }: IInsertProductParams) {
    const { id } = await this.BlingHttp.requestInsertProduct({
      nome: name,
      preco: price,
    });

    await this.productRepository.save({
      name,
      price,
      quantity,
      externalId: id,
    });
  }
}
