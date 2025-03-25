import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import SpecialLoadingButton from "./SpecialLoadingButton";
import {
  addNewTimeline,
  clearAllTimelineErrors,
  getAllTimeline,
  resetTimelineSlice,
} from "@/store/slices/timelineSlice";

const AddTimeline = () => {
  // Estados para manejar los datos del formulario
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // Obtener el estado de carga, mensajes y errores desde Redux
  const { loading, message, error } = useSelector((state) => state.timeline);

  // Hooks de navegación y dispatch de Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Función para manejar el envío del formulario
  const handleAddNewTimeline = (e) => {
    e.preventDefault();

    // Validación de campos
    if (!title.trim()) {
      toast.error("El título es obligatorio");
      return;
    }
    if (!description.trim()) {
      toast.error("La descripción es obligatoria");
      return;
    }
    if (!from.trim()) {
      toast.error("La fecha de inicio es obligatoria");
      return;
    }
    if (!to.trim()) {
      toast.error("La fecha de fin es obligatoria");
      return;
    }

    // Validación adicional: fecha de inicio no puede ser mayor que fecha de fin
    if (parseInt(from) > parseInt(to)) {
      toast.error("La fecha de inicio no puede ser mayor que la fecha de fin");
      return;
    }

    // Crear un objeto FormData para enviar al backend
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("from", from);
    formData.append("to", to);

    // Dispatch de la acción para agregar una nueva línea de tiempo
    dispatch(addNewTimeline(formData))
      .then(() => {
        // El mensaje de éxito se maneja en el useEffect con `message`
      })
      .catch((error) => {
        toast.error(error.message || "Error al agregar la línea de tiempo");
      });
  };

  // Efecto para manejar mensajes de éxito y errores
  useEffect(() => {
    if (error) {
      toast.error(error); // Mostrar mensaje de error
      dispatch(clearAllTimelineErrors()); // Limpiar errores
    }
    if (message) {
      toast.success(message); // Mostrar mensaje de éxito
      dispatch(resetTimelineSlice()); // Reiniciar el estado de Redux
      dispatch(getAllTimeline()); // Recargar la lista de líneas de tiempo
      navigate("/manage-timeline"); // Redirigir al usuario a la página de gestión
    }
  }, [error, message, dispatch, navigate]);

  // Función para regresar al dashboard
  const handleReturnToDashboard = () => {
    navigate("/"); // Redirigir al usuario a la ruta raíz
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
      <form
        className="w-[100%] px-5 md:w-[650px]"
        onSubmit={handleAddNewTimeline}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
              AGREGAR NUEVA LÍNEA DE TIEMPO
            </h2>
            <div className="mt-10 flex flex-col gap-5">
              {/* Campo para el título */}
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Título
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Ej: Matriculación"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Campo para la descripción */}
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Descripción
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <textarea
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Ej: Descripción de la línea de tiempo"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Campo para la fecha de inicio */}
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Fecha de inicio (Desde)
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="number"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Ej: 2020"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Campo para la fecha de fin */}
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Fecha de fin (Hasta)
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="number"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Ej: 2023"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          {!loading ? (
            <Button type="submit" className="w-full">
              Agregar Línea de Tiempo
            </Button>
          ) : (
            <SpecialLoadingButton content={"Agregando Línea de Tiempo..."} />
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
  );
};

export default AddTimeline;