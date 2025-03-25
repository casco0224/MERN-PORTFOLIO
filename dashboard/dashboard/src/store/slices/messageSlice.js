import { createSlice } from "/node_modules/.vite/deps/@reduxjs_toolkit.js?v=957a9260";
import axios from "/node_modules/.vite/deps/axios.js?v=957a9260";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    messages: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllMessagesRequest(state) {
      state.messages = [];
      state.error = null;
      state.loading = true;
    },
    getAllMessagesSuccess(state, action) {
      state.messages = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllMessagesFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteMessageRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteMessageSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    deleteMessageFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    resetMessageSlice(state) {
      state.error = null;
      state.messages = [];
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

// Acción para obtener todos los mensajes
export const getAllMessages = () => async (dispatch) => {
  dispatch(messageSlice.actions.getAllMessagesRequest());
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/message/getall",
      { withCredentials: true }
    );
    if (response.data && response.data.messages) {
      dispatch(
        messageSlice.actions.getAllMessagesSuccess(response.data.messages)
      );
    } else {
      throw new Error("La respuesta de la API no contiene mensajes.");
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Error desconocido al obtener los mensajes.";
    dispatch(messageSlice.actions.getAllMessagesFailed(errorMessage));
  }
};

// Acción para eliminar un mensaje por ID
export const deleteMessage = (id) => async (dispatch) => {
  dispatch(messageSlice.actions.deleteMessageRequest());
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/message/delete/${id}`,
      { withCredentials: true }
    );
    if (response.data && response.data.message) {
      dispatch(
        messageSlice.actions.deleteMessageSuccess(response.data.message)
      );
    } else {
      throw new Error("La respuesta de la API no contiene un mensaje válido.");
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Error desconocido al eliminar el mensaje.";
    dispatch(messageSlice.actions.deleteMessageFailed(errorMessage));
  }
};

// Acción para limpiar errores
export const clearAllMessageErrors = () => (dispatch) => {
  dispatch(messageSlice.actions.clearAllErrors());
};

// Acción para reiniciar el estado de mensajes
export const resetMessagesSlice = () => (dispatch) => {
  dispatch(messageSlice.actions.resetMessageSlice());
};

export default messageSlice.reducer;
