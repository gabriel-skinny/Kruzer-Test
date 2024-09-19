import { Request, Response } from "express";
import { RequestMidleware } from "../midlewares/authorization-midleware";
import { IProductAgregationModel } from "../database/entities/product-agregation";
import { isValid } from "date-fns";
import { makeProductAgregationViewModel } from "./viewModels/productAgregationViewModel";

interface IProductService {
  getProductAgregations(filter?: {
    startDate: Date;
    endDate: Date;
  }): Promise<IProductAgregationModel[]>;
  retryProductCreation(): Promise<{
    sucessCount: number;
    totalProductToRetry: number;
  }>;
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
        return res
          .status(404)
          .json({ message: "Product agregation not found" });

      return res.status(200).json({
        message: "Product agregation",
        data: products.map(makeProductAgregationViewModel),
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async retryProductCreation(req: Request, res: Response) {
    try {
      const { totalProductToRetry, sucessCount } =
        await this.productService.retryProductCreation();

      return res.status(200).json({
        message: `Total products to retry: ${totalProductToRetry} and products sucessfully retried: ${sucessCount}`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
