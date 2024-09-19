import { IWebhookDealUpdateData } from "../integrations/webhookDealUpdate";

export interface IPipeDriveService {
  handleUpdateDealEvent({
    data,
    meta,
    previous,
  }: IWebhookDealUpdateData): Promise<void>;
}
