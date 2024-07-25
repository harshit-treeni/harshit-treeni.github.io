import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ToastContainer } from "react-toastify";

import { RouterProvider, createHashRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Dashboard from "./routes/Dashboard";
import DataEntry from "./routes/DataEntry";
import DataStatusReport from "./routes/DataStatusReport";
import Home from "./routes/Home";
import Main from "./Main";
import SuppliersPage from "./routes/SuppliersPage";

import "react-toastify/dist/ReactToastify.css";
import "@glideapps/glide-data-grid/dist/index.css";

const router = createHashRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/data-management/data-entry",
        element: <DataEntry />,
      },
      {
        path: "/data-management/data-status-report",
        element: <DataStatusReport />,
      },
      {
        path: "/supply-chain/suppliers",
        element: <SuppliersPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <DndProvider backend={HTML5Backend}>
      <RouterProvider router={router} />
    </DndProvider>
    <ToastContainer />
  </>
);
