import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    loading: false,
    timeline: [],
    currentTimeline: null, // Nuevo estado para almacenar un timeline específico
    error: null,
    message: null,
  },
  reducers: {
    // Acciones para obtener todos los timelines
    getAllTimelineRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getAllTimelineSuccess(state, action) {
      state.timeline = action.payload;
      state.loading = false;
      state.error = null;
    },
    getAllTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Acciones para agregar un nuevo timeline
    addNewTimelineRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewTimelineSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    addNewTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // Acciones para eliminar un timeline
    deleteTimelineRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteTimelineSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    deleteTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // Acciones para obtener un timeline por ID
    getTimelineByIdRequest(state) {
      state.loading = true;
      state.error = null;
      state.currentTimeline = null;
    },
    getTimelineByIdSuccess(state, action) {
      state.loading = false;
      state.currentTimeline = action.payload;
      state.error = null;
    },
    getTimelineByIdFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.currentTimeline = null;
    },

    // Acciones para actualizar un timeline
    updateTimelineRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateTimelineSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    updateTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // Acciones para resetear el estado
    resetTimelineSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.timeline = [];
      state.currentTimeline = null;
    },
    clearAllErrors(state) {
      state.error = null;
      state.message = null;
    },
  },
});

// Acción para obtener todos los timelines
export const getAllTimeline = () => async (dispatch) => {
  dispatch(timelineSlice.actions.getAllTimelineRequest());
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/timeline/getall",
      { withCredentials: true }
    );
    dispatch(
      timelineSlice.actions.getAllTimelineSuccess(response.data.timelines)
    );
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Something went wrong";
    dispatch(timelineSlice.actions.getAllTimelineFailed(errorMessage));
  }
};

// Acción para agregar un nuevo timeline
export const addNewTimeline = (data) => async (dispatch) => {
  dispatch(timelineSlice.actions.addNewTimelineRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/timeline/add",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(
      timelineSlice.actions.addNewTimelineSuccess(response.data.message)
    );
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Something went wrong";
    dispatch(timelineSlice.actions.addNewTimelineFailed(errorMessage));
  }
};

// Acción para eliminar un timeline
export const deleteTimeline = (id) => async (dispatch) => {
  dispatch(timelineSlice.actions.deleteTimelineRequest());
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/timeline/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(
      timelineSlice.actions.deleteTimelineSuccess(response.data.message)
    );
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Something went wrong";
    dispatch(timelineSlice.actions.deleteTimelineFailed(errorMessage));
  }
};

// Acción para obtener un timeline por ID
export const getTimelineById = (id) => async (dispatch) => {
  dispatch(timelineSlice.actions.getTimelineByIdRequest());
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/timeline/get/${id}`,
      { withCredentials: true }
    );
    dispatch(
      timelineSlice.actions.getTimelineByIdSuccess(response.data.timeline)
    );
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Something went wrong";
    dispatch(timelineSlice.actions.getTimelineByIdFailed(errorMessage));
  }
};

// Acción para actualizar un timeline
export const updateTimeline = (id, data) => async (dispatch) => {
  dispatch(timelineSlice.actions.updateTimelineRequest());
  try {
    const response = await axios.put(
      `http://localhost:5000/api/v1/timeline/update/${id}`,
      data,
      { withCredentials: true }
    );
    dispatch(
      timelineSlice.actions.updateTimelineSuccess(response.data.message)
    );
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Something went wrong";
    dispatch(timelineSlice.actions.updateTimelineFailed(errorMessage));
  }
};

// Acción para resetear el slice
export const resetTimelineSlice = () => (dispatch) => {
  dispatch(timelineSlice.actions.resetTimelineSlice());
};

// Acción para limpiar errores
export const clearAllTimelineErrors = () => (dispatch) => {
  dispatch(timelineSlice.actions.clearAllErrors());
};

export default timelineSlice.reducer;
