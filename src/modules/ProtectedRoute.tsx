/* eslint-disable react/react-in-jsx-scope */
import { Navigate, Outlet } from "react-router-dom"
import { AuthInfo } from "../context/AuthContext"

type ProtectedRouteType = {
    allowedRoles: string[]
}

const ProtectedRoute = ({allowedRoles}:ProtectedRouteType) => {
    const { authState } = AuthInfo()
    const { accessToken, roles } = authState
    return (
        (accessToken !== undefined && roles.find(role => allowedRoles.includes(role)))
            ? <Outlet />
            : <Navigate to="/login" />
    )
}

export default ProtectedRoute;
