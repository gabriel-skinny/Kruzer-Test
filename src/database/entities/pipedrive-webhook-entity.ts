import mongoose, { Schema } from "mongoose";
import { IWebhookDealUpdateDataInfo } from "../../interfaces/webhookDealUpdate";

export interface IPipeDriveWebhookModel {
  _id: string;
  type: string;
  webhook_external_id: string;
  data: IWebhookDealUpdateDataInfo;
  errorOnProductCreation: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export const pipeDriveWebhookSchema: {
  [key in keyof Omit<IPipeDriveWebhookModel, "_id" | "createdAt">]: any;
} = {
  errorOnProductCreation: Boolean,
  type: String,
  webhook_external_id: String,
  data: Object,
};

export const PipeDriveWebhookModel = mongoose.model<IPipeDriveWebhookModel>(
  "PipeDriveWebhook",
  new Schema(pipeDriveWebhookSchema, { timestamps: true })
);
