import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  role: null,
  name: null,
  uid: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.accessToken = null;
      state.role = null;
      state.name = null;
      state.uid = null;
    },

    userLogin: (state, action) => {
      state.accessToken = action.payload.access_token;
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.uid = action.payload.uid;
    },
  },
});

export const { userLogout, userLogin } = userSlice.actions;

export default userSlice.reducer;
