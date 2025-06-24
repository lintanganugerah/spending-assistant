import { useEffect } from "react";
import {
  useLazyGetInitializeTokenQuery,
  useLazyPostCheckExpiredQuery,
} from "redux/apiQuery/authAPI";
import { useToken } from "./useToken";

export function useInitializeToken() {
  const token = useToken();
  const [checkExpired, { isLoading: isChecking }] =
    useLazyPostCheckExpiredQuery();
  const [fetchInitToken, { isLoading: isFetching }] =
    useLazyGetInitializeTokenQuery();

  useEffect(() => {
    async function validate() {
      // Jika salah satu sedang loading skip dulu, tunggu perubahan load selesai
      if (isChecking || isFetching) return;

      // Token kosong, fetch baru
      if (!token) {
        await fetchInitToken();
        return;
      }

      const result = await checkExpired({ token }).unwrap();

      // Token expired, fetch baru
      if (result.expired) {
        await fetchInitToken();
      }
    }

    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isChecking, isFetching]);
}
