import mongoose, { Schema } from "mongoose";

export interface IWebhookModel {
  _id: string;
  name: string;
  type: string;
  direction: "in" | "out";
  data: Object;
}

export const webhookSchema: { [key in keyof IWebhookModel]: any } = {
  _id: Schema.ObjectId,
  name: String,
  type: String,
  direction: String,
  data: Object,
};

export const makeWebhookModel = () => {
  const WebhookModel = mongoose.model<IWebhookModel>(
    "Webhook",
    new Schema(webhookSchema)
  );

  return WebhookModel;
};
