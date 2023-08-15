import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { UserType } from "../types/UserType";

interface UserState {
  user: UserType | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload;
    },

  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export default userSlice.reducer;
