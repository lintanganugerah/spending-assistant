import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/UserTypes";

const initialState = {
  id: "",
  name: "",
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUserData(state: User, action: PayloadAction<User>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});

export const { saveUserData } = UserSlice.actions;
export default UserSlice.reducer;
