import { NavLink, Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export function Layout() {
  return (
    <>
      <div className="global">
        <div className="vmenu">
          <NavLink to="/" className="nav-link"> Booklog </NavLink>
          <NavLink to="/garages"> Garage </NavLink>
        </div>
        <main>
           <Outlet />
        </main>
      </div>
      <ToastContainer />
    </>
  )
}