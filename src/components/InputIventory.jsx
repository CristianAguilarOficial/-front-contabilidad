import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/InputIventario.css';

const formatoNumero = new Intl.NumberFormat('es-CO');

function InputInventario({ agregarHistorial }) {
  const [formulario, setFormulario] = useState({
    producto: '',
    descripcion: '',
    valor: '',
    estado: 'Importante',
    relevancia: 'Hogar',
    fecha: '',
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === 'valor') {
      // Eliminar caracteres no numéricos
      value = value.replace(/\D/g, '');

      // Convertir a número y formatear
      value = value ? formatoNumero.format(parseInt(value, 10)) : '';
    }

    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formulario.producto.trim() ||
      !formulario.fecha ||
      formulario.valor === ''
    ) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const nuevoRegistro = {
      ...formulario,
      id: uuidv4(),
      valor: parseInt(formulario.valor.replace(/\./g, ''), 10),
    };

    agregarHistorial(nuevoRegistro);

    setFormulario({
      producto: '',
      descripcion: '',
      valor: '',
      estado: 'Importante',
      relevancia: 'Hogar',
      fecha: '',
    });
  };

  return (
    <div className="inventario-container">
      <div className="inventario-contenido">
        <h1>Gastos</h1>
        <form onSubmit={handleSubmit}>
          <table className="tabla-contenido">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Descripción</th>
                <th>Valor</th>
                <th>Estado</th>
                <th>Relevancia</th>
                <th>Fecha</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    className="input-moderno"
                    type="text"
                    name="producto"
                    placeholder="Producto"
                    value={formulario.producto}
                    onChange={handleChange}
                    required
                  />
                </td>
                <td>
                  <input
                    className="input-moderno"
                    type="text"
                    name="descripcion"
                    placeholder="Descripción"
                    value={formulario.descripcion}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    className="input-moderno"
                    type="text"
                    name="valor"
                    placeholder="Valor"
                    value={formulario.valor}
                    onChange={handleChange}
                    required
                  />
                </td>
                <td>
                  <select
                    className="select-moderno"
                    name="estado"
                    value={formulario.estado}
                    onChange={handleChange}
                  >
                    <option>Importante</option>
                    <option>Poco importante</option>
                    <option>Nada importante</option>
                  </select>
                </td>
                <td>
                  <select
                    className="select-moderno"
                    name="relevancia"
                    value={formulario.relevancia}
                    onChange={handleChange}
                  >
                    <option>Hogar</option>
                    <option>Empresa</option>
                    <option>Salud</option>
                    <option>Otros</option>
                  </select>
                </td>
                <td>
                  <input
                    className="input-moderno"
                    type="date"
                    name="fecha"
                    value={formulario.fecha}
                    onChange={handleChange}
                    required
                  />
                </td>
                <td>
                  <button className="boton-moderno" type="submit">
                    Cargar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}

export default InputInventario;
