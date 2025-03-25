import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";

const ViewTimeline = () => {
  // Estados para almacenar los datos de la línea de tiempo
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  // Obtener el ID de la URL
  const { id } = useParams();

  // Navegación
  const navigate = useNavigate();

  // Obtener los datos de la línea de tiempo desde el backend
  useEffect(() => {
    const getTimeline = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/timeline/get/${id}`,
          { withCredentials: true }
        );
        const timeline = response.data.timeline;
        console.log("Datos recibidos del backend:", timeline); // Depuración

        // Asignar los datos a los estados
        setTitle(timeline.title || "No title"); // Valor predeterminado si no hay título
        setDescription(timeline.description || "No description"); // Valor predeterminado si no hay descripción
        setFrom(timeline.from || "No date"); // Valor predeterminado si no hay fecha
        setTo(timeline.to || "Present"); // Valor predeterminado si no hay fecha
      } catch (error) {
        toast.error(error.response?.data?.message || "Error al cargar la línea de tiempo");
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };
    getTimeline();
  }, [id]);

  // Función para regresar al dashboard
  const handleReturnToDashboard = () => {
    navigate("/");
  };

  // Si los datos están cargando, mostrar un mensaje de carga
  if (loading) {
    return <div className="text-center mt-10">Cargando...</div>;
  }

  return (
    <>
      <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
        <div className="w-[100%] px-5 md:w-[1000px] pb-5">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="flex justify-end">
                <Button onClick={handleReturnToDashboard}>
                  Return to Dashboard
                </Button>
              </div>
              <div className="mt-10 flex flex-col gap-5">
                {/* Título de la línea de tiempo */}
                <div className="w-full sm:col-span-4">
                  <h1 className="text-2xl font-bold mb-4">{title}</h1>
                </div>

                {/* Descripción de la línea de tiempo */}
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Description:</p>
                  <p>{description}</p>
                </div>

                {/* Fechas de la línea de tiempo */}
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Timeline:</p>
                  <p>
                    <strong>From:</strong> {from}
                  </p>
                  <p>
                    <strong>To:</strong> {to}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTimeline;