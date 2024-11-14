import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  role: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.accessToken = null;
      state.role = null;
    },

    userLogin: (state, action) => {
      state.accessToken = action.payload.access_token;
      state.role = action.payload.role;
    },
  },
});

export const { userLogout, userLogin } = userSlice.actions;

export default userSlice.reducer;
