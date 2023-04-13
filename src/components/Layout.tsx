import { Link, NavLink, Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export function Layout() {
  return (
    <>
      <ul className="vmenu">
        <li><NavLink to="/" className="nav-link"> Booklog </NavLink></li>
        <li><NavLink to="/garages"> Garage </NavLink></li>
      </ul>
      <div className="container">
        <Outlet />
      </div>
      <ToastContainer />
    </>
  )
}