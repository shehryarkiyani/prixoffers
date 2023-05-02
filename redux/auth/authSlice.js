import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

const initialState = getCookie("token")
  ? {
      isLoggedIn: true,
      user: {},
    }
  : {
      isLoggedIn: false,
      user: {},
    };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    deAuthenticate: (state) => {
      state.isLoggedIn = false;
      state.user ={}
    },
    authenticate: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    restoreAuthState: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { deAuthenticate, authenticate, restoreAuthState } = authSlice.actions;

export default authSlice.reducer;
