import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routerConfig from './router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={createBrowserRouter(routerConfig)} />
);
