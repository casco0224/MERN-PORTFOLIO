import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    projects: [],
    error: null,
    message: null,
    singleProject: {},
  },
  reducers: {
    getAllProjectsRequest(state) {
      state.projects = [];
      state.error = null;
      state.loading = true;
    },
    getAllProjectsSuccess(state, action) {
      state.projects = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllProjectsFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addNewProjectRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewProjectSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    addNewProjectFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteProjectRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteProjectSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    deleteProjectFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    updateProjectRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateProjectSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    updateProjectFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    resetProjectSlice(state) {
      state.error = null;
      state.projects = [];
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

// Acción para obtener todos los proyectos
export const getAllProjects = () => async (dispatch) => {
  dispatch(projectSlice.actions.getAllProjectsRequest());
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/project/getall",
      { withCredentials: true }
    );
    if (response.data?.projects) {
      dispatch(
        projectSlice.actions.getAllProjectsSuccess(response.data.projects)
      );
    } else {
      throw new Error("La respuesta de la API no contiene datos válidos.");
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Error desconocido al obtener proyectos.";
    dispatch(projectSlice.actions.getAllProjectsFailed(errorMessage));
  }
};

// Acción para agregar un nuevo proyecto
export const addNewProject = (data) => async (dispatch) => {
  dispatch(projectSlice.actions.addNewProjectRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/project/add",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    if (response.data?.message) {
      dispatch(
        projectSlice.actions.addNewProjectSuccess(response.data.message)
      );
    } else {
      throw new Error(
        "No se recibió un mensaje válido al agregar el proyecto."
      );
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Error desconocido al agregar proyecto.";
    dispatch(projectSlice.actions.addNewProjectFailed(errorMessage));
  }
};

// Acción para eliminar un proyecto
export const deleteProject = (id) => async (dispatch) => {
  dispatch(projectSlice.actions.deleteProjectRequest());
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/project/delete/${id}`,
      { withCredentials: true }
    );
    if (response.data?.message) {
      dispatch(
        projectSlice.actions.deleteProjectSuccess(response.data.message)
      );
    } else {
      throw new Error(
        "No se recibió un mensaje válido al eliminar el proyecto."
      );
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Error desconocido al eliminar proyecto.";
    dispatch(projectSlice.actions.deleteProjectFailed(errorMessage));
  }
};

// Acción para actualizar un proyecto
export const updateProject = (id, newData) => async (dispatch) => {
  dispatch(projectSlice.actions.updateProjectRequest());
  try {
    const response = await axios.put(
      `http://localhost:5000/api/v1/project/update/${id}`,
      newData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    if (response.data?.message) {
      dispatch(
        projectSlice.actions.updateProjectSuccess(response.data.message)
      );
    } else {
      throw new Error(
        "No se recibió un mensaje válido al actualizar el proyecto."
      );
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Error desconocido al actualizar proyecto.";
    dispatch(projectSlice.actions.updateProjectFailed(errorMessage));
  }
};

// Acción para reiniciar el estado del slice
export const resetProjectSlice = () => (dispatch) => {
  dispatch(projectSlice.actions.resetProjectSlice());
};

// Acción para limpiar errores
export const clearAllProjectErrors = () => (dispatch) => {
  dispatch(projectSlice.actions.clearAllErrors());
};

export default projectSlice.reducer;
