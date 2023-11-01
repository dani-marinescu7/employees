import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import EmployeeList from "./Pages/EmployeeList";
import EmployeeSearchList from "./Pages/EmployeeSearchList";
import EmployeeMissingList from "./Pages/EmployeeMissingList"
import EmployeeCreator from "./Pages/EmployeeCreator";
import EmployeeUpdater from "./Pages/EmployeeUpdater";
import CompanyCreator from "./Pages/CompanyCreator";

import EquipmentLayout from "./Pages/EquipmentLayout";
import EquipmentList from "./Pages/EquipmentList";
import EquipmentCreator from "./Pages/EquipmentCreator";
import EquipmentUpdater from "./Pages/EquipmentUpdater";

import "./index.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <EmployeeList />,
  },
  {
    path: "/:column/:order",
    element: <EmployeeList />,
  },
  {
    path: "/employees/:search",
    element: <EmployeeSearchList />,
  },
  {
    path: "/missing",
    element: <EmployeeMissingList />,
  },
  {
    path: "/create",
    element: <EmployeeCreator />,
  },
  {
    path: "/create-company",
    element: <CompanyCreator />,
  },
  {
    path: "/update/:id",
    element: <EmployeeUpdater />,
  },
  {
    path: "/table-test",
    element: <TableTest />,
  },
  {
    path: "/form-test",
    element: <FormTest />,
  },
  {
    path: "/equipments",
    element: <EquipmentLayout />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/equipments",
    element: <EquipmentList />,
  },
  {
    path: "/create-equipment",
    element: <EquipmentCreator />,
  },
  {
    path: "/update-equipment/:id",
    element: <EquipmentUpdater />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Route />
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
