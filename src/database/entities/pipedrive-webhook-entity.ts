import mongoose, { Schema } from "mongoose";
import { IWebhookDealUpdateDataInfo } from "../../services/protocols/integrations/webhookDealUpdate";

export interface IPipeDriveWebhookModel {
  _id: string;
  type: string;
  webhook_external_id: string;
  dealData: IWebhookDealUpdateDataInfo;
  createdAt: Date;
  updatedAt?: Date;
}

export const pipeDriveWebhookSchema: {
  [key in keyof Omit<IPipeDriveWebhookModel, "_id" | "createdAt">]: any;
} = {
  type: String,
  webhook_external_id: String,
  dealData: Object,
};

export const PipeDriveWebhookModel = mongoose.model<IPipeDriveWebhookModel>(
  "PipeDriveWebhook",
  new Schema(pipeDriveWebhookSchema, { timestamps: true })
);
