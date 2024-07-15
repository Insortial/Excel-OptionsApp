import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <header id="mainNav">
        <div id="navigation">
            <Link to="/" className='navLinks'>New Job</Link>
        </div>
        <div id="logoDiv">
            <h3>Excel Cabinets</h3>
        </div>
    </header>
  )
}

export default Navigation