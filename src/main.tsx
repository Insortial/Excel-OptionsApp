import React, {} from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import App from './App.tsx'
import './index.css'
import OptionsCreator from './modules/OptionsCreator.tsx';
import JobCreator from './modules/JobCreator.tsx';
import FormOptionsProvider from './modules/OptionsTemplateContext.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/creatingJob" />
  },
  {
    path: "/creatingJob",
    element: <JobCreator />
  },
  {
    path: "/creatingOptions",
    element: <OptionsCreator />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FormOptionsProvider>
      <RouterProvider router={router} />
    </FormOptionsProvider>
  </React.StrictMode>,
)
