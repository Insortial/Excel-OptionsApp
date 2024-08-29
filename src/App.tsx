import React, {} from 'react'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import './index.css'
import './Auth.css'
import OptionsCreator from './modules/OptionsCreator.tsx';
import JobCreator from './modules/JobCreator.tsx';
import JobMenu from './modules/JobMenu.tsx';
import Login from './modules/Login.tsx';
import ProtectedRoute from './modules/ProtectedRoute.tsx';
import JobPackageCreator from './modules/JobPackageCreator.tsx';
import { packageLoader } from './loader/PackageLoader.ts';
import { AuthInfo } from './context/AuthContext.tsx';
import { jobOptionLoader } from './loader/JobOptionLoader.ts';

const App: React.FC = () => {
  const { accessToken } = AuthInfo()
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
          children : [
            {
              index: true,
              element: <OptionsCreator key="default"/>
            },
            {
              element: <OptionsCreator  key="package"/>,
              path: "/creatingOptions/package/:packageID",
              loader: async ({params}) => {
                return packageLoader(params.packageID, accessToken)
              }
            },
            {
              element: <OptionsCreator  key="jobOption"/>,
              path: "/creatingOptions/jobOption/:optionID",
              loader: async ({params}) => {
                return jobOptionLoader(params.optionID, accessToken)
              }
            },
          ]
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

  return <RouterProvider router={router} />;
}

export default App;