import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const forgotResetPassSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    forgotPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    resetPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

// Acción para enviar el correo de recuperación de contraseña
export const forgotPassword = (email) => async (dispatch) => {
  dispatch(forgotResetPassSlice.actions.forgotPasswordRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/user/password/forgot",
      { email },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    if (response.data?.message) {
      dispatch(
        forgotResetPassSlice.actions.forgotPasswordSuccess(
          response.data.message
        )
      );
    } else {
      throw new Error(
        "No se recibió un mensaje válido al solicitar el cambio de contraseña."
      );
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Error desconocido al solicitar el cambio de contraseña.";
    dispatch(forgotResetPassSlice.actions.forgotPasswordFailed(errorMessage));
  }
};

// Acción para restablecer la contraseña
export const resetPassword =
  (token, password, confirmPassword) => async (dispatch) => {
    dispatch(forgotResetPassSlice.actions.resetPasswordRequest());
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/user/password/reset/${token}`,
        { password, confirmPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data?.message) {
        dispatch(
          forgotResetPassSlice.actions.resetPasswordSuccess(
            response.data.message
          )
        );
      } else {
        throw new Error(
          "No se recibió un mensaje válido al restablecer la contraseña."
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Error desconocido al restablecer la contraseña.";
      dispatch(forgotResetPassSlice.actions.resetPasswordFailed(errorMessage));
    }
  };

// Acción para limpiar los errores
export const clearAllForgotResetPassErrors = () => (dispatch) => {
  dispatch(forgotResetPassSlice.actions.clearAllErrors());
};

export default forgotResetPassSlice.reducer;
