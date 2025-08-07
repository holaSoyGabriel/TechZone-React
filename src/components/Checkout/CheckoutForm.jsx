// src/components/CheckoutForm/CheckoutForm.jsx

import React, { useState } from 'react';

const CheckoutForm = () => {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    direccion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', form);
    // Aquí podrías enviar los datos a Firebase o mostrar un resumen
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Finalizar Compra</h2>

      <label htmlFor="nombre">Nombre:</label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        required
      />

      <label htmlFor="correo">Correo:</label>
      <input
        type="email"
        id="correo"
        name="correo"
        value={form.correo}
        onChange={handleChange}
        required
      />

      <label htmlFor="direccion">Dirección:</label>
      <input
        type="text"
        id="direccion"
        name="direccion"
        value={form.direccion}
        onChange={handleChange}
        required
      />

      <button type="submit">Confirmar Pedido</button>
    </form>
  );
};

export default CheckoutForm;
