import axios, { AxiosError } from "axios";
import { PixelsErrorResponse, NetworkError, TimeoutError, PixelsHttpError } from "./customError";

const httpErrorHandler = (error: AxiosError<PixelsErrorResponse> | Error): Promise<Error> => {
  let promiseError: Promise<Error>;
  console.log(error);
  if (axios.isAxiosError(error)) {
    if (Object.is(error.code, "ECONNABORTED")) {
      promiseError = Promise.reject(new TimeoutError());
    } else if (Object.is(error.message, "Network Error")) {
      promiseError = Promise.reject(new NetworkError());
    } else {
      const { response } = error as AxiosError<PixelsErrorResponse>;
      if (response && response.data && response.data.code) {
        promiseError = Promise.reject(new PixelsHttpError(response.data.code, response));
      } else {
        // Handle cases where response or response.data.code is not available
        promiseError = Promise.reject(new PixelsHttpError("Unknown error occurred", response));
      }
    }
  } else {
    promiseError = Promise.reject(error);
  }
  return promiseError;
};
export default httpErrorHandler;
