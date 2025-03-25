import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const softwareApplicationSlice = createSlice({
  name: "softwareApplications",
  initialState: {
    loading: false,
    softwareApplications: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllsoftwareApplicationsRequest(state) {
      state.softwareApplications = [];
      state.error = null;
      state.loading = true;
    },
    getAllsoftwareApplicationsSuccess(state, action) {
      state.softwareApplications = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllsoftwareApplicationsFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addNewsoftwareApplicationsRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewsoftwareApplicationsSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    addNewsoftwareApplicationsFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    deletesoftwareApplicationsRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deletesoftwareApplicationsSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    deletesoftwareApplicationsFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    resetSoftwareApplicationSlice(state) {
      state.error = null;
      state.softwareApplications = [];
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const getAllSoftwareApplications = () => async (dispatch) => {
  dispatch(
    softwareApplicationSlice.actions.getAllsoftwareApplicationsRequest()
  );
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/softwareapplication/getall",
      { withCredentials: true }
    );
    if (response.data && response.data.softwareApplications) {
      dispatch(
        softwareApplicationSlice.actions.getAllsoftwareApplicationsSuccess(
          response.data.softwareApplications
        )
      );
    } else {
      throw new Error("La respuesta no contiene aplicaciones de software.");
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Error desconocido al obtener las aplicaciones.";
    dispatch(
      softwareApplicationSlice.actions.getAllsoftwareApplicationsFailed(
        errorMessage
      )
    );
  }
};

export const addNewSoftwareApplication = (data) => async (dispatch) => {
  dispatch(
    softwareApplicationSlice.actions.addNewsoftwareApplicationsRequest()
  );
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/softwareapplication/add?svg",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    if (response.data && response.data.message) {
      dispatch(
        softwareApplicationSlice.actions.addNewsoftwareApplicationsSuccess(
          response.data.message
        )
      );
    } else {
      throw new Error(
        "La respuesta del servidor no contiene un mensaje válido."
      );
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Error desconocido al agregar la aplicación.";
    dispatch(
      softwareApplicationSlice.actions.addNewsoftwareApplicationsFailed(
        errorMessage
      )
    );
  }
};

export const deleteSoftwareApplication = (id) => async (dispatch) => {
  dispatch(
    softwareApplicationSlice.actions.deletesoftwareApplicationsRequest()
  );
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/softwareapplication/delete/${id}`,
      { withCredentials: true }
    );
    if (response.data && response.data.message) {
      dispatch(
        softwareApplicationSlice.actions.deletesoftwareApplicationsSuccess(
          response.data.message
        )
      );
    } else {
      throw new Error(
        "La respuesta del servidor no contiene un mensaje válido."
      );
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Error desconocido al eliminar la aplicación.";
    dispatch(
      softwareApplicationSlice.actions.deletesoftwareApplicationsFailed(
        errorMessage
      )
    );
  }
};

export const clearAllSoftwareAppErrors = () => (dispatch) => {
  dispatch(softwareApplicationSlice.actions.clearAllErrors());
};

export const resetSoftwareApplicationSlice = () => (dispatch) => {
  dispatch(softwareApplicationSlice.actions.resetSoftwareApplicationSlice());
};

export default softwareApplicationSlice.reducer;
