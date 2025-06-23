import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URI } from "../../constant/apiBaseURI";
import { AuthInitResponse } from "../../types/AuthTypes";
import { AUTH_INIT_QUERY } from "../../constant/apiQueryPath";

export const AuthAPI = createApi({
  reducerPath: "AuthAPI",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URI }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    getInitializeToken: builder.query<AuthInitResponse, void>({
      query: () => `${AUTH_INIT_QUERY}`,
    }),
  }),
});

export const { useGetInitializeTokenQuery, useLazyGetInitializeTokenQuery } =
  AuthAPI;
