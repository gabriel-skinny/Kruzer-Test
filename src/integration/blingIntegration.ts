import axios from "axios";
import { randomUUID } from "crypto";
import { addDays, addSeconds, isAfter, isBefore } from "date-fns";
import {
  IInsertProductData,
  IInsertProductResponse,
  IRequestAcesseTokenResponse,
} from "./interface";
import { BasicAuthHelper } from "../helpers/basicAuth";

const EXPIRES_IN_DAYS_REFRESH_TOKEN = 30;

interface IAutentication {
  acessToken: string;
  refreshToken: string;
  processedDate: Date;
  acessTokenExpireDate: Date;
  refreshTokenExpireDate: Date;
}

export class BlingIntegration {
  authorizationState?: string;
  authorizationCode?: string;
  basicToken: string;
  autentication?: IAutentication;

  constructor() {
    this.basicToken = BasicAuthHelper.encode({
      username: process.env.BLING_CLIENT_ID as string,
      password: process.env.BLING_CLIENT_SECRET as string,
    });
  }

  async checkAuthorization(): Promise<{ authorized: boolean }> {
    if (this.autentication) {
      if (isAfter(this.autentication.acessTokenExpireDate, Date.now())) {
        return { authorized: true };
      }

      if (isAfter(this.autentication.refreshTokenExpireDate, Date.now())) {
        const accessTokenData = await this.requestAcessToken("refresh_token");

        this.autentication.acessToken = accessTokenData.access_token;
        this.autentication.acessTokenExpireDate = addSeconds(
          new Date(),
          accessTokenData.expires_in
        );

        return { authorized: true };
      }
    }

    return { authorized: false };
  }

  async authorizationCallBack({
    state,
    code,
  }: {
    state: string;
    code: string;
  }) {
    if (state !== this.authorizationState)
      throw new Error("Diferent authorization session");

    this.authorizationCode = code;

    const acessTokenData = await this.requestAcessToken("authorization_code");

    this.autentication = {
      acessToken: acessTokenData.access_token,
      acessTokenExpireDate: addSeconds(new Date(), acessTokenData.expires_in),
      processedDate: new Date(),
      refreshToken: acessTokenData.refresh_token,
      refreshTokenExpireDate: addDays(
        new Date(),
        EXPIRES_IN_DAYS_REFRESH_TOKEN
      ),
    };
  }

  makeAuthorizationCodeUrl(): { authorizationCodeUrl: string } {
    this.authorizationState = randomUUID();

    const authorizationCodeUrl = `${process.env.BLING_PROD_URL}/Api/v3/oauth/authorize?response_type=code&client_id=${process.env.BLING_CLIENT_ID}&state=${this.authorizationState}`;

    return { authorizationCodeUrl };
  }

  async requestAcessToken(
    authorizationType: "refresh_token" | "authorization_code"
  ): Promise<IRequestAcesseTokenResponse> {
    const { data } = await axios.post<IRequestAcesseTokenResponse>(
      `${process.env.BLING_PROD_BASE_URL}/Api/v3/oauth/token`,
      {
        grant_type: authorizationType,
        code:
          authorizationType == "authorization_code"
            ? this.authorizationCode
            : this.autentication?.refreshToken,
      },
      {
        headers: {
          Authorization: `Basic ${this.basicToken}`,
        },
      }
    );

    return data;
  }

  async requestInsertProduct(
    productData: IInsertProductData
  ): Promise<{ id: string }> {
    const authorized = await this.checkAuthorization();

    if (!authorized)
      throw new Error("Can not make request because not authorized");

    const response = await axios.post<IInsertProductResponse>(
      `${process.env.BLING_PROD_BASE_URL}/Api/v3/produtos`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${this.autentication?.acessToken}`,
        },
      }
    );

    return { id: String(response.data.data.id) };
  }
}
