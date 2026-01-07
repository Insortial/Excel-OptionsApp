import React from 'react'
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
import FormOptions from './modules/FormOptions.tsx';
import PDEditor from './modules/PDEditor.tsx';
import { pdLoader } from './loader/PDLoader.ts';

const App: React.FC = () => {
  const fetchHook = useFetch()
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={"/login"} />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      element: <ProtectedRoute allowedRoles={["ADMIN", "MEASURE"]}/>,
      children: [
        {
          path: "/pdEditor/:level",
          element: <PDEditor />,
          loader: async ({params, request}) => {
            return pdLoader(params.level ?? 'project', request, fetchHook)
          }
        }
      ]
    },
    {
      element: <ProtectedRoute allowedRoles={["ADMIN", "OPT"]}/>,
      children: [
        {
          path: "/creatingJob",
          element: <JobCreator />
        },
        {
          element: <ProtectedRoute allowedRoles={["ADMIN"]}/>,
          children: [
            {
              path: "/formOptions",
              element: <FormOptions />,
              loader: async () => {
                let data = null
                const response = await fetchHook(`/formOptions`, "GET")
                if (!response.ok) {
                  return null
                } else {
                  data = await response.json()
                  console.log(data)
                }
                
                return data
              }
            }
          ]
        },
        {
          path: "/optionCreator",
          children : [
            {
              index: true,
              element: <OptionsCreator key="default"/>
            },
            {
              element: <OptionsCreator key="packageID"/>,
              path: "/optionCreator/package/:packageID",
              loader: async ({params}) => {
                let data = null
                const response = await fetchHook(`/getPackage/${params.packageID}`, "GET")
                if (!response.ok) {
                  return null
                } else {
                  data = await response.json()
                  console.log(data)
                }
                
                return {state: data}
              }
            },
            {
              element: <OptionsCreator  key="optionID"/>,
              path: "/optionCreator/jobOption/:optionID",
              loader: async ({params}) => {
                return await jobOptionLoader(params.optionID, fetchHook)
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