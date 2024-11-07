import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.accessToken = null;
    },

    userLogin: (state, action) => {
      state.accessToken = action.payload.access_token;
    },
  },
});

export const { userLogout, userLogin } = userSlice.actions;

export default userSlice.reducer;
