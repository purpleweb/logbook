import { Link, Outlet } from "react-router-dom"

export function Layout() {
  return (
    <div>
      <aside className="menu">
        <ul className="menu-list">
          <li><Link to="/" className="nav-link"> Booklog </Link></li>
          <li><Link to="/all-garages"> Garage </Link></li>
        </ul>
      </aside>
      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}