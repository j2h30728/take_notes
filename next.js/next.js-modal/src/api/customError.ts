import axios, { AxiosError, AxiosResponse } from "axios";

export class NetworkError extends Error {
  constructor(message = "") {
    super(message);
    this.name = "NetworkError";
  }
}
export class TimeoutError extends Error {
  constructor(message = "") {
    super(message);
    this.name = "TimeoutError";
  }
}
/** pixels */
export interface PixelsErrorResponse {
  status: string;
  code: string;
}

export class PixelsHttpError extends Error {
  private readonly privateResponse: AxiosResponse<PixelsErrorResponse> | undefined;

  constructor(message?: string, response?: AxiosResponse<PixelsErrorResponse>) {
    super(message);
    this.name = "PixelsHttpError";
    this.privateResponse = response;
  }

  get response(): AxiosResponse<PixelsErrorResponse> | undefined {
    return this.privateResponse;
  }
}

export function isServerError(error: unknown): error is AxiosError {
  return axios.isAxiosError(error);
}
