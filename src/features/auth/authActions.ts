import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCookies } from "../../utils/cookies";
import { User } from "../../types/userTypes";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RefreshTokenBody {
  refreshToken: string;
}

export const loginAndStoreTokens = createAsyncThunk(
  "auth/loginAndStoreTokens",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/login",
        credentials
      );

      const { accessToken, refresh_token } = response.data;

      setCookies("refreshToken", refresh_token, 3600);

      return accessToken;
    } catch (error: any) {
      // Handle login error here
      return rejectWithValue(
        (error.response?.data || "An error occurred during login") as string
      );
    }
  }
);

export const refreshTokenAndStoreTokens = createAsyncThunk(
  "auth/refreshTokenAndStoreTokens",
  async (refreshToken: string, { rejectWithValue }) => {
    try {
      const body: RefreshTokenBody = {
        refreshToken,
      };

      const response = await axios.post(
        "http://localhost:8080/api/v1/users/refresh-token",
        body
      );

      const { accessToken, refresh_token } = response.data;

      setCookies("refreshToken", refresh_token, 3600);

      return accessToken;
    } catch (error: any) {
      // Handle refresh token error here
      return rejectWithValue(
        (error.response?.data ||
          "An error occurred while refreshing the token") as string
      );
    }
  }
);

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/users",
});

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (accessToken: string, { rejectWithValue }) => {
    try {
      const response = await api.post<User>("/profile", {
        // headers: {
        // Authorization: `Bearer ${accessToken}`,
        // },
        token: accessToken,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        (error.response?.data ||
          "An error occurred while profile fetch") as string
      );
    }
  }
);
