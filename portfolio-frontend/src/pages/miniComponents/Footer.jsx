import React, { useState } from "react";

const Footer = () => {
  // Estado para manejar el correo electrónico del formulario de suscripción
  const [email, setEmail] = useState("");

  // Función para manejar el envío del formulario de suscripción
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Por favor, ingresa tu correo electrónico.");
      return;
    }
    alert(`Gracias por suscribirte con el correo: ${email}`);
    setEmail(""); // Limpiar el campo después del envío
  };

  return (
    <footer className="p-5 mt-6 w-full max-w-[1050px] mx-auto">
      {/* Línea divisoria */}
      <hr className="border-t border-gray-300" />

      {/* Contenido del footer */}
      <div className="mt-5 flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Título con efecto */}
        <h1 className="text-tubeLight-effect text-3xl tracking-[8px] text-center sm:text-left">
          Thanks For Scrolling
        </h1>

        {/* Enlaces útiles */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <a
            href="#about"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            About Us
          </a>
          <a
            href="#services"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Services
          </a>
          <a
            href="#contact"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Contact
            <p>Phone: 9564-6658</p>
          </a>
        </div>

        {/* Redes sociales */}
        <div className="flex gap-4">
          <a
            href="https://x.com/miltoncascor24"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            <i className="fab fa-twitter text-2xl"></i>
          </a>
          <a
            href="https://www.facebook.com/share/18mtHcVf2k/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            <i className="fab fa-facebook text-2xl"></i>
          </a>
          <a
            href="https://www.instagram.com/jonnathancasco/profilecard/?igsh=MXZhaGNiMnlkdjhveA=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            <i className="fab fa-instagram text-2xl"></i>
          </a>
        </div>
      </div>

      {/* Formulario de suscripción */}
      <div className="mt-6">
        <p className="text-gray-700 text-center sm:text-left mb-2">
          Subscribe to our newsletter:
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className="p-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Información de contacto y derechos de autor */}
      <div className="mt-6 text-center sm:text-left text-gray-600">
        <p>Email: miltoncascor24@gmail.com | Phone: 9564-6658</p>
        <p className="mt-2">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;