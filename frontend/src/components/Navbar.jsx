import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="topbar">
      <div className="nav-wrap">
        <NavLink to="/" className="brand">
          eMobilis Dishes
        </NavLink>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Home
          </NavLink>
          <NavLink to="/dishes" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Dishes
          </NavLink>
          <NavLink to="/dishes/add" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Add Dish
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
