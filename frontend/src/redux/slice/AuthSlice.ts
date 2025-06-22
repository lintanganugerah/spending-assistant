import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { csrfTokenState, loginStatus, tokenState } from "../../types/AuthTypes";

const initialState = {
  token: "",
  csrfToken: "",
  isLoggedIn: false,
};

const AuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveCurrentToken(state: tokenState, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    removeCurrentToken(state: tokenState) {
      state.token = "";
    },
    saveCsrfToken(state: csrfTokenState, action: PayloadAction<string>) {
      state.csrfToken = action.payload;
    },
    removeCsrfToken(state: csrfTokenState) {
      state.csrfToken = "";
    },
    setLoggedInStatus(state: loginStatus) {
      state.isLoggedIn = true;
    },
    removeLoggedInStatus(state: loginStatus) {
      state.isLoggedIn = false;
    },
  },
});

export const { saveCurrentToken, removeCurrentToken } = AuthSlice.actions;
export default AuthSlice.reducer;
