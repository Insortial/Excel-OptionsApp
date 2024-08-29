import React, { useNavigate } from 'react-router-dom';
import ExcelLogo from '../assets/excel_logo.svg'
import useFetch from '../hooks/useFetch'
import { AuthInfo, LoggedInUpdate } from '../context/AuthContext';

const Header = () => {
  const fetchHook = useFetch();
  const navigate = useNavigate();
  const { loggedIn } = AuthInfo()
  const { saveLogInState } = LoggedInUpdate()

  const logOut = () => {
    fetchHook("/logout", "DELETE")
    saveLogInState(false)
    navigate("/login", { replace: true })
  }

  return (
        <header id="appHeader">
            <div id="logoSection">
                <img src={ExcelLogo} id="excelLogo"/>
                <h2>Options Creator</h2>
            </div>
            <h4 onClick={logOut} style={{display: loggedIn ? "block" : "none"}}>Logout</h4>
        </header>
  )
}

export default Header;