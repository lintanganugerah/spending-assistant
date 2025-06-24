import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
// Base URL

export const BASE_URI = `${import.meta.env.VITE_REST_ENDPOINT}/api/${
  import.meta.env.VITE_ENDPOINT_VERSION
}`;

export const BASE_QUERY_REDUX = retry(fetchBaseQuery({ baseUrl: BASE_URI }), {
  maxRetries: 2,
});
