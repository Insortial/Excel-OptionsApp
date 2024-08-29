import React, { Navigate, Outlet } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { AuthInfo } from "../context/AuthContext"
import { DecodedToken } from "../../../types/AuthContextTypes"

type ProtectedRouteType = {
    allowedRoles: string[]
}

const ProtectedRoute = ({allowedRoles}:ProtectedRouteType) => {
    const { accessToken } = AuthInfo()
    const decodedToken:DecodedToken|undefined = accessToken !== "token" ? jwtDecode(accessToken) : undefined

    return (
        (decodedToken !== undefined && decodedToken.roles.find(role => allowedRoles.includes(role)))
            ? <Outlet />
            : <Navigate to="/login" />
    )
}

export default ProtectedRoute;
