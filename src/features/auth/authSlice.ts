import { createSlice } from "@reduxjs/toolkit";

import { removeCookies } from "../../utils/cookies";
import {
  refreshTokenAndStoreTokens,
  getProfile,
  loginAndStoreTokens,
} from "./authActions";
import { User } from "../../types/userTypes";

export interface AuthState {
  accessToken: string | null;
  profile: User | null;
  isLoading: boolean;
  error: string | undefined | null;
}

const initialState: AuthState = {
  accessToken: null,
  profile: null,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      removeCookies("refreshToken");
      state.accessToken = null;
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAndStoreTokens.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(loginAndStoreTokens.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload;
      })
      .addCase(loginAndStoreTokens.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(getProfile.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(refreshTokenAndStoreTokens.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(refreshTokenAndStoreTokens.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload;
      })
      .addCase(refreshTokenAndStoreTokens.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
