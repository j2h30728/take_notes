import axios from "axios";

export const apiPixelsRequester = axios.create({
  baseURL: "https://api.pexels.com/v1",
  timeout: 5000,
  headers: {
    Authorization: process.env.NEXT_PUBLIC_PIXELS_ACCESS_KEY,
  },
});

// apiPixelsRequester.interceptors.response.use((response: AxiosResponse) => response, httpErrorHandler);
