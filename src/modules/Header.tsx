import ExcelLogo from '../assets/excel_logo.svg'
/* import useFetch from '../hooks/useFetch'
import { AuthInfo, LoggedInUpdate } from '../context/AuthContext'; */

const Header = () => {
  /* const fetchHook = useFetch();
  const navigate = useNavigate();
  const { loggedIn } = AuthInfo()
  const { saveLogInState } = LoggedInUpdate()

  const logOut = () => {
    fetchHook("/logout", "DELETE")
    saveLogInState(false)
    navigate("/login", { replace: true })
  } */

  return (
        <header id="appHeader">
            <div id="logoSection">
                <img src={ExcelLogo} id="excelLogo"/>
                <h2>Options Creator</h2>
            </div>
        </header>
  )
}

export default Header;