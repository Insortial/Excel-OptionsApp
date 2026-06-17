import React from 'react'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import './index.css'
import './App.css'
import OptionsCreator from './modules/features/OptionsCreator';
import JobCreator from './modules/features/JobAndPackageCreator/JobCreator';
import JobMenu from './modules/features/JobMenu/component.tsx';
import Login from './modules/features/Login';
import ProtectedRoute from './modules/components/ProtectedRoute';
import JobPackageCreator from './modules/features/JobAndPackageCreator/JobPackageCreator/component.tsx';
import { jobOptionLoader } from './loader/JobOptionLoader.ts';
import useFetch from './hooks/useFetch.ts';
import FormOptions from './modules/features/FormOptions';
import PDEditor from './modules/features/PDEditor';
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