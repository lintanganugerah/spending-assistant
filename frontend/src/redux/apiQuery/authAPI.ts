import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthInitResponse } from "types/AuthTypes";
import { BASE_URI } from "constant/apiBaseURI";

export const AuthAPI = createApi({
  reducerPath: "AuthAPI",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URI }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    getInitializeToken: builder.query<AuthInitResponse, void>({
      query: () => `${import.meta.env.VITE_AUTH_INIT_EP}`,
    }),
  }),
});

export const { useGetInitializeTokenQuery, useLazyGetInitializeTokenQuery } =
  AuthAPI;
