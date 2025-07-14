import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface LoginResponse {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
  admin: string;
  access_token: string;
  email_sent: string;
  status?: number;
  message?: string;
  bear_token?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post<LoginResponse>(
        `https://9jatext.com.ng/admin/api/v1/login/`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (
        response.data.status === 200 &&
        response.data.message === "change the default password"
      ) {
        const thirtyMinutes = new Date(new Date().getTime() + 30 * 60 * 1000);

        // Store bear_token in cookies
        Cookies.set("bear_token", response.data.bear_token as any, {
          expires: thirtyMinutes,
          sameSite: "strict",
        });

        return {
          isFirstLogin: true,
          bearToken: response.data.bear_token,
          message: response.data.message,
          status: response.data.status,
        };
      }

      const userData = {
        email: response.data.email,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        profileImage: response.data.profile_image,
        admin: response.data.admin,
      };

      // Set cookies with 30 minutes expiration
      const thirtyMinutes = new Date(new Date().getTime() + 30 * 60 * 1000);

      Cookies.set("token", response.data.access_token, {
        expires: thirtyMinutes,
        sameSite: "strict",
      });

      Cookies.set("user", JSON.stringify(userData), {
        expires: thirtyMinutes,
        sameSite: "strict",
      });

      return {
        user: userData,
        token: response.data.access_token,
        message: response.data.email_sent,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token"); // Fixed typo here
      if (!token) {
        // If no token exists, consider it already logged out
        return { message: "Already logged out" };
      }

      const response = await axios.post(
        "https://9jatext.com.ng/admin/api/v1/logout/",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Clear cookies regardless of API response
      Cookies.remove("token");
      Cookies.remove("user");

      return response.data;
    } catch (error: any) {
      // Clear cookies even if API call fails
      Cookies.remove("token");
      Cookies.remove("user");

      return rejectWithValue(
        error.response?.data?.detail || error.message || "Logout failed"
      );
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (
    passwordData: {
      oldPassword: string;
      newPassword: string;
      confirmNewPassword: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        "https://9jatext.com.ng/admin/api/v1/change/password/",
        {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
          confirmNewPassword: passwordData.confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Password change failed"
      );
    }
  }
);

export const changePasswordFirsUser = createAsyncThunk(
  "auth/changePassword",
  async (
    passwordData: {
      oldPassword: string;
      newPassword: string;
      confirmNewPassword: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const bear_token = Cookies.get("bear_token");
      const response = await axios.post(
        "https://9jatext.com.ng/admin/api/v1/change/password/",
        {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
          confirmNewPassword: passwordData.confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${bear_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Password change failed"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        "https://9jatext.com.ng/admin/api/v1/reset/password/",
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Password reset failed"
      );
    }
  }
);

// Update AuthState interface to match the new user structure
interface AuthState {
  user: {
    email: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    admin: string;
  } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  } as AuthState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("token");
      Cookies.remove("user");
    },
    checkAuth: (state) => {
      const token = Cookies.get("token");
      const user = Cookies.get("user");

      if (!token || !user) {
        state.user = null;
        state.token = null;
        Cookies.remove("token");
        Cookies.remove("user");
      } else {
        state.token = token;
        state.user = JSON.parse(user);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user as any;
        state.token = action.payload.token as any;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
        state.token = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        Cookies.remove("token");
        Cookies.remove("user");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        // Still clear the user data even if the server logout failed
        state.user = null;
        state.token = null;
        Cookies.remove("token");
        Cookies.remove("user");
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
