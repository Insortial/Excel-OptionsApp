import React, {} from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import './index.css'
import OptionsCreator from './modules/OptionsCreator.tsx';
import JobCreator from './modules/JobCreator.tsx';
import FormOptionsProvider from './modules/OptionsTemplateContext.tsx';
import JobMenu from './modules/JobMenu.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/jobMenu" />
  },
  {
    path: "/creatingJob",
    element: <JobCreator />
  },
  {
    path: "/creatingOptions",
    element: <OptionsCreator />
  },
  {
    path: "/jobMenu",
    element: <JobMenu />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FormOptionsProvider>
      <section id="bannerAnnouncement">THIS IS A TEST SITE</section>
      <RouterProvider router={router} />
    </FormOptionsProvider>
  </React.StrictMode>,
)
