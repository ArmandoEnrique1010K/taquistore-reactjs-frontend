import axios from "axios";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

export default function ListadoDeProductos() {
  const urlBase = "http://localhost:8080/app/productos";

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const resultado = await axios.get(urlBase);
    console.log("Resultado cargar productos");
    console.log(resultado.data);

    setProductos(resultado.data);
  };

  const eliminarProducto = async (id) => {
    await axios.delete(`${urlBase}/${id}`);
    cargarProductos();
  };

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h1>Sistema de Gestión de productos</h1>
      </div>

      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Codigo</th>
            <th scope="col">Nombre</th>
            <th scope="col">Oferta</th>
            <th scope="col">Precio</th>
            <th scope="col">Precio de oferta</th>
            <th scope="col">Estado</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            //Iteramos el arreglo de productos
            // Con campos de tipo boolean, no va a retornar true o false,
            // se debe colocar una condicion
            productos.map((producto, indice) => (
              <tr key={indice}>
                <th scope="row">{producto.id_producto}</th>
                <td>{producto.codigo}</td>
                <td>{producto.nombre}</td>
                <td>
                  {producto.oferta ? (
                    <span style={{ color: "green" }}>Esta de oferta</span>
                  ) : (
                    <span style={{ color: "red" }}>No esta de oferta</span>
                  )}
                </td>

                <td>
                  <NumericFormat
                    value={producto.precio_normal}
                    displayType={"text"}
                    thousandSeparator=","
                    prefix={"S/."}
                    decimalScale={2}
                    fixedDecimalScale
                  ></NumericFormat>
                </td>

                <td>
                  {producto.precio_oferta ? (
                    <NumericFormat
                      value={producto.precio_oferta}
                      displayType={"text"}
                      thousandSeparator=","
                      prefix={"S/."}
                      decimalScale={2}
                      fixedDecimalScale
                    ></NumericFormat>
                  ) : (
                    "no hay"
                  )}
                </td>

                <td>{producto.estado ? "disponible" : "no disponible"}</td>
                <td className="text-center">
                  <div>
                    <Link
                      to={`/editar/${producto.id_producto}`}
                      className="btn btn-warning btn-sm me-3"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => eliminarProducto(producto.id_producto)}
                      className="btn btn-danger btn-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
