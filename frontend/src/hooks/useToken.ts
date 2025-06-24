import { useSelector } from "react-redux";
import { RootStateType } from "../redux/store";

export const selectToken = (state: RootStateType) => state.auth.token;

export function useToken() {
  return useSelector(selectToken);
}
