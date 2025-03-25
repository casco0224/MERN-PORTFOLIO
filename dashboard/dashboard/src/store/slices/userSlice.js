import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    isAuthenticated: false,
    error: null,
    message: null,
    isUpdated: false,
  },
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = action.payload;
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    loadUserRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loadUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    updatePasswordRequest(state) {
      state.loading = true;
      state.isUpdated = false;
      state.error = null;
      state.message = null;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    updatePasswordFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.error = action.payload;
    },
    updateProfileRequest(state) {
      state.loading = true;
      state.isUpdated = false;
      state.error = null;
      state.message = null;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    updateProfileFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.error = action.payload;
    },
    updateProfileResetAfterUpdate(state) {
      state.isUpdated = false;
      state.error = null;
      state.message = null;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

// Acción para iniciar sesión
export const login = (email, password) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/user/login",
      { email, password },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(userSlice.actions.loginSuccess(data.user));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Error desconocido al iniciar sesión.";
    dispatch(userSlice.actions.loginFailed(errorMessage));
  }
};

// Acción para cargar datos del usuario
export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.loadUserRequest());
  try {
    const { data } = await axios.get("http://localhost:5000/api/v1/user/me", {
      withCredentials: true,
    });
    dispatch(userSlice.actions.loadUserSuccess(data.user));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Error desconocido al cargar el usuario.";
    dispatch(userSlice.actions.loadUserFailed(errorMessage));
  }
};

// Acción para cerrar sesión
export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "http://localhost:5000/api/v1/user/logout",
      { withCredentials: true }
    );
    dispatch(userSlice.actions.logoutSuccess(data.message));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Error desconocido al cerrar sesión.";
    dispatch(userSlice.actions.logoutFailed(errorMessage));
  }
};

// Acción para actualizar contraseña
export const updatePassword =
  (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
    dispatch(userSlice.actions.updatePasswordRequest());
    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/v1/user/update/password",
        { currentPassword, newPassword, confirmNewPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(userSlice.actions.updatePasswordSuccess(data.message));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Error desconocido al actualizar la contraseña.";
      dispatch(userSlice.actions.updatePasswordFailed(errorMessage));
    }
  };

// Acción para actualizar el perfil del usuario
export const updateProfile = (data) => async (dispatch) => {
  dispatch(userSlice.actions.updateProfileRequest());
  try {
    const response = await axios.put(
      "http://localhost:5000/api/v1/user/update/me",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(userSlice.actions.updateProfileSuccess(response.data.message));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Error desconocido al actualizar el perfil.";
    dispatch(userSlice.actions.updateProfileFailed(errorMessage));
  }
};

// Acción para reiniciar el estado del perfil después de la actualización
export const resetProfile = () => (dispatch) => {
  dispatch(userSlice.actions.updateProfileResetAfterUpdate());
};

// Acción para limpiar todos los errores
export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;
