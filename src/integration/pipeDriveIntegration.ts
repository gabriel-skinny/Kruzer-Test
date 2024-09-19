import axios from "axios";
import {
  IGetProductsFromDealData,
  IGetProductsFromDealResponse,
} from "../services/protocols/integrations/pipeDriveIntegration";
import { IHttpAdapter } from "../services/protocols/adapters/httpAdapter";

export class PipeDriveIntegration {
  constructor(private httpAdapter: IHttpAdapter) {}

  async getProductsFromDeal(
    dealId: string
  ): Promise<IGetProductsFromDealData[]> {
    let hasNext = true;
    const limit = 50;
    let cursor: number = 0;
    const allProducts: IGetProductsFromDealData[] = [];

    while (hasNext) {
      const data = await this.httpAdapter.get<IGetProductsFromDealResponse>({
        url: `${process.env.PIPEDRIVE_PROD_URL}/deals/${dealId}/products`,
        options: {
          params: {
            api_token: process.env.PIPEDRIVE_API_TOKEN,
            start: cursor,
            limit: limit,
          },
        },
      });

      allProducts.push(...data.data);
      hasNext = data.additional_data.pagination.more_items_in_collection;
      cursor = data.additional_data.pagination.next_start as number;
    }

    return allProducts;
  }
}
