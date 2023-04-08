import { Link, Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export function Layout() {
  return (
    <>
      <ul className="vmenu">
        <li><Link to="/" className="nav-link"> Booklog </Link></li>
        <li><Link to="/garages"> Garage </Link></li>
      </ul>
      <div className="container">
        <Outlet />
      </div>
      <ToastContainer />
    </>
  )
}