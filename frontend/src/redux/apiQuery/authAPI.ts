import { createApi } from "@reduxjs/toolkit/query/react";
import {
  AuthInitResponse,
  CheckExpiredTokenResponse,
  TokenState,
} from "types/AuthTypes";
import { saveCurrentToken } from "@redux/slice/AuthSlice";
import { BASE_QUERY_REDUX } from "@constant/apiBaseURI";

export const AuthAPI = createApi({
  reducerPath: "AuthAPI",
  baseQuery: BASE_QUERY_REDUX,
  tagTypes: ["InitialToken"],
  endpoints: (builder) => ({
    getInitializeToken: builder.query<AuthInitResponse, void>({
      query: () => `${import.meta.env.VITE_AUTH_INIT_EP}`,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(saveCurrentToken(data.token));
        } catch (error) {
          console.error("Token Failed", error);
        }
      },
    }),
    postCheckExpired: builder.query<CheckExpiredTokenResponse, TokenState>({
      query: (token) => ({
        url: `${import.meta.env.VITE_AUTH_EP}/expired`,
        method: "POST",
        body: token,
      }),
    }),
  }),
});

export const {
  useGetInitializeTokenQuery,
  useLazyGetInitializeTokenQuery,
  usePostCheckExpiredQuery,
  useLazyPostCheckExpiredQuery,
} = AuthAPI;
