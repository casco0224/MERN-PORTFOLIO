import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import {
  clearAllTimelineErrors,
  getAllTimeline,
  resetTimelineSlice,
  updateTimeline,
} from "@/store/slices/timelineSlice";

const UpdateTimeline = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState(""); // Exclusivamente años
  const [to, setTo] = useState("");

  const { error, message, loading } = useSelector((state) => state.timeline);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  // Cargar los datos de la línea de tiempo al montar el componente
  useEffect(() => {
    const getTimeline = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/timeline/get/${id}`,
          { withCredentials: true }
        );
        const timeline = response.data.timeline;

        setTitle(timeline?.title || "");
        setDescription(timeline?.description || "");
        setFrom(timeline?.timeline?.from || "");
        setTo(timeline?.timeline?.to || "");
      } catch (error) {
        toast.error(error.response?.data?.message || "Error al cargar la línea de tiempo");
      }
    };
    getTimeline();
  }, [id]);

  // Mostrar mensajes de éxito o error
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline()); // Vuelve a cargar la lista de timeline
      navigate("/manage-timeline"); // Redirige al usuario a la página de gestión
    }
  }, [error, message, dispatch, navigate]);

  // Función para actualizar la línea de tiempo
  const handleUpdateTimeline = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title || "");
    formData.append("description", description || "");
    formData.append("from", from || "");
    formData.append("to", to || "");

    dispatch(updateTimeline(id, formData))
      .then(() => {
        toast.success("Línea de tiempo actualizada correctamente");
        dispatch(getAllTimeline()); // Vuelve a cargar la lista de timeline
        navigate("/manage-timeline"); // Redirige al usuario a la página de gestión
      })
      .catch((error) => {
        toast.error(error.message || "Error al actualizar la línea de tiempo");
      });
  };

  // Función para regresar al dashboard
  const handleReturnToDashboard = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center mt-10 p-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-md p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Actualizar Cronología
        </h2>
        <form onSubmit={handleUpdateTimeline}>
          <div className="grid grid-cols-1 gap-4 mb-6">
            {/* Título */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Título de la cronología"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Descripción de la cronología"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Desde */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Desde (Año)
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ejemplo: 2018"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>

            {/* Hasta */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hasta (Año)
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ejemplo: 2026"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between">
            {loading ? (
              <SpecialLoadingButton content="Actualizando..." width="w-40" />
            ) : (
              <button
                type="submit"
                className="w-40 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
              >
                Actualizar
              </button>
            )}
            <button
              type="button"
              onClick={handleReturnToDashboard}
              className="w-40 p-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Volver al Panel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTimeline;