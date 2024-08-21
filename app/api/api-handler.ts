import axios, { AxiosInstance, isAxiosError } from "axios";

export const BASE_URL: string = "https://staging1.internal1.packiyo.com/api/v1";
const TOKEN: string = "748|C3zKP2aDBIpU1iH7jpXwOyu7yzi03P37jwTeoWIM";
export const CUSTOMER_ID: string = "17";

class ApiHandler {
  axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/vnd.api+json",
    },
  });

  async sendRequest<T>(
    method: string,
    endpoint: string,
    data: object = {},
    params: object = {},
  ): Promise<T> {
    try {
      const response = await this.axiosInstance({
        method,
        url: endpoint,
        data,
        params,
      });
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const detail = error.response.data.errors?.[0]?.detail;
        throw new Error(detail);
      } else {
        throw new Error(
          `Error occurred while making ${method} request to ${endpoint}`,
        );
      }
    }
  }

  get<T>(endpoint: string, params?: object): Promise<T> {
    return this.sendRequest<T>("GET", endpoint, undefined, params);
  }

  post<T>(endpoint: string, data: object): Promise<T> {
    return this.sendRequest<T>("POST", endpoint, data);
  }

  patch<T>(endpoint: string, data: object): Promise<T> {
    return this.sendRequest<T>("PATCH", endpoint, data);
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.sendRequest<T>("DELETE", endpoint);
  }
}

export default new ApiHandler();
