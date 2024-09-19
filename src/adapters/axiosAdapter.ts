import axios from "axios";
import { IHttpAdapter } from "../services/protocols/adapters/httpAdapter";

export class AxiosAdapter implements IHttpAdapter {
  async get<T>({
    url,
    options,
  }: {
    url: string;
    options?: { params?: any; headers?: { Authorization: string } };
  }): Promise<T> {
    const { data } = await axios.get<T>(url, options);

    return data;
  }

  async post<T>({
    url,
    bodyData,
    options,
  }: {
    url: string;
    bodyData: Object;
    options?: { params?: any; headers?: { Authorization: string } };
  }): Promise<T> {
    const { data } = await axios.post<T>(url, bodyData, options);

    return data;
  }
}
