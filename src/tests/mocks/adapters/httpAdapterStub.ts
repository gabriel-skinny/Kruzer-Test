import { IHttpAdapter } from "../../../services/protocols/adapters/httpAdapter";

export class HttpAdapterStub implements IHttpAdapter {
  get<T>(data: {
    url: string;
    options?: { params?: any; headers?: { Authorization: string } };
  }): Promise<T> {
    throw new Error("Method not implemented.");
  }
  post<T>(data: {
    url: string;
    bodyData: Object;
    options?: { params?: any; headers?: { Authorization: string } };
  }): Promise<T> {
    throw new Error("Method not implemented.");
  }
}
