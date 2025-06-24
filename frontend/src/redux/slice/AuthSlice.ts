import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenState } from "types/AuthTypes";

const initialState = {
  token: "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveCurrentToken(state: TokenState, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    removeCurrentToken(state: TokenState) {
      state.token = "";
    },
  },
});

export const { saveCurrentToken, removeCurrentToken } = AuthSlice.actions;
export default AuthSlice.reducer;
