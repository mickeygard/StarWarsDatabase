import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { TeamProvider } from './components/TeamContext';
import router from "./router";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TeamProvider>
      <RouterProvider router={router} />
    </TeamProvider>
  </React.StrictMode>
);
