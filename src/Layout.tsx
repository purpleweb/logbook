import { Link, Outlet } from "react-router-dom"

export function Layout() {
  return (
    <div>
      <nav id="sidebarMenu" className="sidebar d-lg-block bg-gray-800 text-white collapse" data-simplebar >
        <div className="sidebar-inner px-4 pt-3">
          <ul className="nav flex-column pt-3 pt-md-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <span className="sidebar-icon"> <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" > <path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd" ></path> </svg> </span>
                <span className="sidebar-text">Booklog</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/all-garages" className="nav-link">
                <span className="sidebar-icon"> <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" > <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path> <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd" ></path> </svg> </span>
                <span className="sidebar-text">Garages</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}