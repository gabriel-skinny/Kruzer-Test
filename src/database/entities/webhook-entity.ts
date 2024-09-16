import mongoose from "mongoose";

export interface IWebhookModel {
  name: string;
  type: string;
  direction: "in" | "out";
  data: Object;
}

export const webhookSchema: { [key in keyof IWebhookModel]: any } = {
  name: String,
  type: String,
  direction: String,
  data: Object,
};

export const makeWebhookModel = () => {
  const WebhookModel = mongoose.model<IWebhookModel>("Webhook");

  return WebhookModel;
};
