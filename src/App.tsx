import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProductList from "./components/ProductList";
import ProductView from "./components/ProductView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductList />,
  },
  {
    path: "products/:id",
    element: <ProductView />,
  },
]);

const App = () => {
  return (
    <>
      {" "}
      <RouterProvider router={router} />
      <div className="content"></div>
    </>
  );
};

export default App;
