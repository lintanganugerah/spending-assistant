import { useEffect } from "react";
import { useGetInitializeTokenQuery } from "redux/apiQuery/authAPI";
import isTokenExpired from "helpers/isTokenExpired";
import { useToken } from "./useToken";
import { useDispatch } from "react-redux";
import { saveCurrentToken } from "redux/slice/AuthSlice";

export function useInitializeToken() {
  const token = useToken();
  const dispatch = useDispatch();
  const expired = isTokenExpired(token);

  const { data, isSuccess, isError } = useGetInitializeTokenQuery(undefined, {
    skip: !(!token || expired), // fetch hanya jika token kosong/expired
  });

  useEffect(() => {
    if (isSuccess && data?.token) {
      dispatch(saveCurrentToken(data.token));
    }

    if (isError) {
      console.warn("Gagal fetch initialize token.");
    }
  }, [isSuccess, isError, data, dispatch]);
}
