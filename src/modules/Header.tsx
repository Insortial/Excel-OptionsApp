/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Link, useNavigate } from 'react-router-dom';
import { AuthInfo, LoggedInUpdate } from '../context/AuthContext';
import { DecodedToken } from '../types/AuthContextTypes';
import { jwtDecode } from 'jwt-decode';
import ExcelLogo from '../assets/excel_logo.svg';

interface HeaderProps {
  currentPage: "pdEditor" | "jobMenu" | "formOptions" | "loggedOut"
}


const Header:React.FC<HeaderProps> = ({currentPage}) => {
    const { saveLogInState } = LoggedInUpdate()
    const { accessToken } = AuthInfo()
    const navigate = useNavigate()
    const decodedToken:DecodedToken = accessToken !== "token" ? jwtDecode(accessToken) : {} as DecodedToken
    const roles = decodedToken.roles ?? []

    const headerTitle = {
        jobMenu: "Job Menu",
        formOptions: "Form Options",
        loggedOut: "Login",
        pdEditor: "P&D Editor"
    }

    const headerType = {
        jobMenu: "",
        formOptions: "",
        loggedOut: "appHeader",
        pdEditor: "pdTopHeader"
    }

    const logOut = async () => {
        const config:RequestInit = {
            method: 'DELETE',
            credentials: "include"
        }
        await fetch(`${import.meta.env.VITE_AUTH_URL}/logout`, config)
        saveLogInState(false)
        navigate("/login", { replace: true })
    }

    return (
        <header className={["loggedOut"].includes(currentPage) ? "" : "jobMenuHeader"} id={headerType[currentPage]}>
            {["loggedOut"].includes(currentPage) && 
                <div id="logoSection">
                    <img src={ExcelLogo} id="excelLogo"/>
                    <h2>Options Creator</h2>
                </div>}
            {["formOptions", "jobMenu"].includes(currentPage) && 
                <h1>{headerTitle[currentPage]}</h1>
            }
            {!"loggedOut".includes(currentPage) && 
                <h4 id={"pdEditor".includes(currentPage) ? "logOutButtonHeader" : "logOutButton"} onClick={() => logOut()}>Logout</h4>
            }
            <nav>
            {(currentPage === "pdEditor" && roles.includes("ADMIN") || currentPage === "formOptions") && 
                <Link to="/jobMenu" className='jobMenuButtons'>View Job Menu</Link>
            }
            {["jobMenu"].includes(currentPage) && <>
                <Link to="/creatingJob" className='jobMenuButtons'>Create Job Document</Link>
                <Link to="/creatingJobPackage" className='jobMenuButtons'>Edit/Create Job Package</Link>
            </>}
            {(roles.includes("ADMIN") && ["jobMenu"].includes(currentPage)) && <>
                <Link to="/pdEditor" className='jobMenuButtons'>P&D Editor</Link>
                <Link to="/formOptions" className='jobMenuButtons'>Edit Form Options</Link>
            </>}
            </nav>
        </header>
    )
}

export default Header;