import { Link } from "react-router-dom";
import "./Header.scss";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Header = () => {
  const { user, handleLogout } = useContext(AuthContext);

  return (
    <header>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user?.role === "admin" && (
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        )}
        {user ? (
          <>
            <li>
              <button
                className="btn btn-outline-warning"
                onClick={handleLogout}
              >
                Logout - {user.email}
              </button>
            </li>
            <li>
              <Link to={"/cart"} className="ti-shopping-cart">
                {/* Xem gio hang */}
              </Link>
            </li>
            <li>
              <Link to={"/order"} className="btn btn-warning">
                Xem don hang
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>

      {/* <div className="search-btn">
        <Link to="/search" className="search-icon ti-search"></Link>
      </div> */}
    </header>
  );
};

export default Header;
