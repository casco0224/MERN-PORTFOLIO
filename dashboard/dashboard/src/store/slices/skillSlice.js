import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const skillSlice = createSlice({
  name: "skill",
  initialState: {
    loading: false,
    skills: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllSkillsRequest(state) {
      state.skills = [];
      state.error = null;
      state.loading = true;
    },
    getAllSkillsSuccess(state, action) {
      state.skills = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllSkillsFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addNewSkillRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewSkillSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    addNewSkillFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteSkillRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteSkillSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    deleteSkillFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    updateSkillRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateSkillSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    updateSkillFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    resetSkillSlice(state) {
      state.error = null;
      state.skills = [];
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const getAllSkills = () => async (dispatch) => {
  dispatch(skillSlice.actions.getAllSkillsRequest());
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/skill/getall",
      { withCredentials: true }
    );
    if (response.data && response.data.skills) {
      dispatch(skillSlice.actions.getAllSkillsSuccess(response.data.skills));
    } else {
      throw new Error("La respuesta no contiene datos de habilidades.");
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Error desconocido al obtener las habilidades.";
    dispatch(skillSlice.actions.getAllSkillsFailed(errorMessage));
  }
};

export const addNewSkill = (data) => async (dispatch) => {
  dispatch(skillSlice.actions.addNewSkillRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/skill/add",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    if (response.data && response.data.message) {
      dispatch(skillSlice.actions.addNewSkillSuccess(response.data.message));
    } else {
      throw new Error(
        "La respuesta del servidor no contiene un mensaje válido."
      );
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Error desconocido al agregar la habilidad.";
    dispatch(skillSlice.actions.addNewSkillFailed(errorMessage));
  }
};

export const updateSkill = (id, proficiency) => async (dispatch) => {
  dispatch(skillSlice.actions.updateSkillRequest());
  try {
    const response = await axios.put(
      `http://localhost:5000/api/v1/skill/update/${id}`,
      { proficiency },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.data && response.data.message) {
      dispatch(skillSlice.actions.updateSkillSuccess(response.data.message));
    } else {
      throw new Error(
        "La respuesta del servidor no contiene un mensaje válido."
      );
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Error desconocido al actualizar la habilidad.";
    dispatch(skillSlice.actions.updateSkillFailed(errorMessage));
  }
};

export const deleteSkill = (id) => async (dispatch) => {
  dispatch(skillSlice.actions.deleteSkillRequest());
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/skill/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    if (response.data && response.data.message) {
      dispatch(skillSlice.actions.deleteSkillSuccess(response.data.message));
    } else {
      throw new Error(
        "La respuesta del servidor no contiene un mensaje válido."
      );
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Error desconocido al eliminar la habilidad.";
    dispatch(skillSlice.actions.deleteSkillFailed(errorMessage));
  }
};

export const clearAllSkillErrors = () => (dispatch) => {
  dispatch(skillSlice.actions.clearAllErrors());
};

export const resetSkillSlice = () => (dispatch) => {
  dispatch(skillSlice.actions.resetSkillSlice());
};

export default skillSlice.reducer;
