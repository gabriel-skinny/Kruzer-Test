import mongoose, { Schema } from "mongoose";

export interface IWebhookModel {
  _id: string;
  name: string;
  type: string;
  direction: "in" | "out";
  webhook_external_id: string;
  data: Object;
  createdAt: Date;
  updatedAt?: Date;
}

export const webhookSchema: {
  [key in keyof Omit<IWebhookModel, "_id" | "createdAt">]: any;
} = {
  name: String,
  type: String,
  direction: String,
  webhook_external_id: String,
  data: Object,
};

export const WebhookModel = mongoose.model<IWebhookModel>(
  "Webhook",
  new Schema(webhookSchema, { timestamps: true })
);
