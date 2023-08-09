import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AgregarProducto() {
  let navegacion = useNavigate();

  const [producto, setProducto] = useState({
    codigo: "",
    nombre: "",
    oferta: false,
    precio_normal: "",
    precio_oferta: "",
  });

  const { codigo, nombre, oferta, precio_normal, precio_oferta } = producto;

  const onInputChange = (e) => {
    // Use el id del campo de tipo checkbox para identificarlo
    if (e.target.id === "ofertacheck1") {
      const value = e.target.checked;
      setProducto({ ...producto, [e.target.name]: value });
    } else {
      const value = e.target.value;
      setProducto({ ...producto, [e.target.name]: value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const urlBase = "http://localhost:8080/app/productos";
    await axios.post(urlBase, producto);
    // Redirigimos a la pagina de inicio
    navegacion("/");
  };

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h1>Agregar Producto</h1>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        {/* CODIGO */}
        <div className="mb-3">
          <label htmlFor="codigo" className="form-label">
            Codigo
          </label>
          <input
            type="text"
            className="form-control"
            id="codigo"
            name="codigo"
            required={true}
            value={codigo}
            onChange={(e) => onInputChange(e)}
          ></input>
        </div>
        {/* NOMBRE */}
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            required={true}
            value={nombre}
            onChange={(e) => onInputChange(e)}
          ></input>
        </div>

        {/* OFERTA */}
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="ofertacheck1"
            name="oferta"
            checked={oferta}
            onChange={(e) => onInputChange(e)}
          ></input>
          <label className="form-check-label" htmlFor="ofertacheck1">
            Oferta
          </label>
        </div>

        {/* PRECIO NORMAL */}
        <div className="mb-3">
          <label htmlFor="precio_normal" className="form-label">
            Precio
          </label>
          <input
            type="number"
            step="any"
            className="form-control"
            id="precio_normal"
            name="precio_normal"
            required={true}
            value={precio_normal}
            onChange={(e) => onInputChange(e)}
          ></input>
        </div>

        {/* PRECIO OFERTA */}
        <div className="mb-3">
          <label htmlFor="precio_oferta" className="form-label">
            Precio de oferta
          </label>
          <input
            type="number"
            step="any"
            className="form-control"
            id="precio_oferta"
            name="precio_oferta"
            value={precio_oferta}
            onChange={(e) => onInputChange(e)}
          ></input>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-warning btn-sm me-3">
            Agregar
          </button>
          <Link to="/" className="btn btn-danger btn-sm">
            Regresar
          </Link>
        </div>
      </form>
    </div>
  );
}
