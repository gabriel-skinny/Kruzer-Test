export interface IHttpAdapter {
  get<T>(data: {
    url: string;
    options?: { params?: any; headers?: { Authorization: string } };
  }): Promise<T>;
  post<T>(data: {
    url: string;
    bodyData: Object;
    options?: { params?: any; headers?: { Authorization: string } };
  }): Promise<T>;
}
