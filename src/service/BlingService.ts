import { IInsertProductData } from "../integration/interface";

interface IBlingHttp {
  requestInsertProduct(data: IInsertProductData): Promise<void>;
}

interface IInsertProductParams {
  value: number;
  name: string;
}

interface IProductRepository {
  save(any: any): Promise<void>;
}

interface IDefaultProductInfoRepository {
  findLast(): Promise<any>;
}

export class BlingService {
  constructor(
    private BlingHttp: IBlingHttp,
    private productRepository: IProductRepository,
    private defaultProductInfoRepository: IDefaultProductInfoRepository
  ) {}

  async insertProduct(data: IInsertProductParams) {
    const lastDefaultProductInfo =
      await this.defaultProductInfoRepository.findLast();

    const requestData = Object.assign({}, data, lastDefaultProductInfo);

    await this.BlingHttp.requestInsertProduct(requestData);

    await this.productRepository.save(requestData);
  }
}
