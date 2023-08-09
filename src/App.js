import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navegacion from "./plantilla/Navegacion";
import ListadoDeProductos from "./productos/ListadoDeProductos";
import AgregarProducto from "./productos/AgregarProducto";
import EditarProducto from "./productos/EditarProducto";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navegacion></Navegacion>
        <Routes>
          <Route
            exact
            path="/"
            element={<ListadoDeProductos></ListadoDeProductos>}
          ></Route>
          <Route
            exact
            path="/agregar"
            element={<AgregarProducto></AgregarProducto>}
          ></Route>
          <Route
            exact
            path="/editar/:id"
            element={<EditarProducto></EditarProducto>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
