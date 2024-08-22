import React, {} from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import './index.css'
import './Auth.css'
import OptionsCreator from './modules/OptionsCreator.tsx';
import JobCreator from './modules/JobCreator.tsx';
import AuthProvider from './modules/AuthContext.tsx';
import FormOptionsProvider from './modules/OptionsTemplateContext.tsx';
import JobMenu from './modules/JobMenu.tsx';
import Login from './modules/Login.tsx';
import ProtectedRoute from './modules/ProtectedRoute.tsx';
import JobPackageCreator from './modules/JobPackageCreator.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    element: <ProtectedRoute allowedRoles={["ADMIN", "OPTIONS"]}/>,
    children: [
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
      },
      {
        path:"/creatingJobPackage",
        element: <JobPackageCreator />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <FormOptionsProvider>
        <section id="bannerAnnouncement">THIS IS A TEST SITE</section>
        <RouterProvider router={router} />
      </FormOptionsProvider>
    </AuthProvider>
  </React.StrictMode>,
)
