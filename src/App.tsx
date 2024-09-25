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
import { jobOptionLoader } from './loader/JobOptionLoader.ts';
import useFetch from './hooks/useFetch.ts';

const App: React.FC = () => {
  const fetchHook = useFetch()
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
          path: "/optionCreator",
          children : [
            {
              index: true,
              element: <OptionsCreator key="default"/>
            },
            {
              element: <OptionsCreator  key="package"/>,
              path: "/optionCreator/package/:packageID",
              loader: async ({params}) => {
                const response = await fetchHook(`/getPackage/${params.packageID}`, "GET")
                if (!response.ok) {
                  throw new Error(response.statusText);
                }
                
                const data = await response.json()
                console.log(data)
                return {state: data}
              }
            },
            {
              element: <OptionsCreator  key="jobOption"/>,
              path: "/optionCreator/jobOption/:optionID",
              loader: async ({params}) => {
                const response = await fetchHook(`/getJobOption/${params.optionID}`, "GET")
                if (!response.ok) {
                  throw new Error(response.statusText);
                }
                const data = await response.json()
                return jobOptionLoader(data.jobDetails, data.listOfLots)
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