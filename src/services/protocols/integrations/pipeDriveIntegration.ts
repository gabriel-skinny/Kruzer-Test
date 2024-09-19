export interface IGetProductsFromDealResponse {
  success: boolean;
  data: IGetProductsFromDealData[];
  additional_data: {
    products_quantity_total: number;
    products_sum_total: number;
    products_quantity_total_formatted: string;
    products_sum_total_formatted: string;
    pagination: {
      start: number;
      limit: number;
      more_items_in_collection: boolean;
      next_start?: number;
    };
  };
}

export interface IGetProductsFromDealData {
  id: number;
  deal_id: number;
  product_id: number;
  product_variation_id: any;
  name: string;
  order_nr: number;
  item_price: number;
  quantity: number;
  sum: number;
  currency: string;
  active_flag: boolean;
  enabled_flag: boolean;
  add_time: string;
  last_edit: string;
  comments: any;
  tax: number;
  quantity_formatted: string;
  sum_formatted: string;
  tax_method: string;
  discount: number;
  discount_type: string;
  billing_frequency: string;
  billing_frequency_cycles: any;
  billing_start_date: any;
  product: any;
}

export interface IPipeDriveIntegration {
  getProductsFromDeal(dealId: string): Promise<IGetProductsFromDealData[]>;
}
