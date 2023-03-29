import { Link, Outlet } from "react-router-dom"

export function Layout() {
  return (
    <div className="container is-fluid">
      <div className="columns">
        <div className="column is-3">
          <aside className="menu">
            <ul className="menu-list">
              <li><Link to="/" className="nav-link"> Booklog </Link></li>
              <li><Link to="/all-garages"> Garage </Link></li>
            </ul>
          </aside>
        </div>
        <div className="column">
          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}