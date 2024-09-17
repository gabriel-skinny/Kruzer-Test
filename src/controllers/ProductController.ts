import { Response } from "express";
import { IWebhookDealUpdateData } from "../interfaces/webhookDealUpdate";
import { RequestMidleware } from "../midlewares/authorization-midleware";
import { IProductAgregationModel } from "../database/entities/product-agregation";
import { isValid } from "date-fns";

interface IProductService {
  getProductAgregations(filter?: {
    startDate: Date;
    endDate: Date;
  }): Promise<IProductAgregationModel[]>;
}

export class ProductController {
  constructor(private productService: IProductService) {}

  async getManyProductAgregation(req: RequestMidleware, res: Response) {
    const { enddate, startdate } = req.query;

    let filter: { startDate: Date; endDate: Date } | undefined;
    if (enddate && startdate) {
      const startDate = new Date(startdate as string);
      const endDate = new Date(enddate as string);

      if (!isValid(startDate) || !isValid(endDate))
        return res
          .status(400)
          .json({ message: "Invalid dates passed on query" });

      filter = {
        endDate,
        startDate,
      };
    }
    try {
      const products = await this.productService.getProductAgregations(filter);

      if (products.length == 0)
        return res.status(404).json({ message: "Products not found" });

      const productsViewModel = products.map((product) => ({
        sumValue: product.sumValue,
        quantity: product.quantity,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      }));

      return res
        .status(200)
        .json({ message: "Product agregation", data: productsViewModel });
    } catch (err) {
      console.log(err);

      return res.json({ message: "Internal server error" }).status(500);
    }
  }
}
