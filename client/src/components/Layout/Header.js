import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  // Animation state for brand
  const [brandStyle, setBrandStyle] = useState({
    opacity: 0,
    transform: "translateX(-40px)",
    transition: "all 0.6s ease-out",
    color: "#ffffff",
    fontWeight: "600",
    letterSpacing: "0.5px",
  });

  useEffect(() => {
    setTimeout(() => {
      setBrandStyle((prev) => ({
        ...prev,
        opacity: 1,
        transform: "translateX(0)",
      }));
    }, 100); // delay for animation
  }, []);

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  // Navbar style
  const navbarStyle = {
    background: "linear-gradient(135deg, #000000, #1e293b)"
  };

  const navLinkStyle = {
    color: "#e2e8f0",
    transition: "color 0.3s ease",
    position: "relative",
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top" style={navbarStyle}>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand" style={brandStyle}>
              SwiftKart
            </Link>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />

              <li className="nav-item">
                <NavLink to="/" className="nav-link" style={navLinkStyle}>
                  Home
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/categories"
                  data-bs-toggle="dropdown"
                  style={navLinkStyle}
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/categories">
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link className="dropdown-item" to={`/category/${c.slug}`}>
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link" style={navLinkStyle}>
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link" style={navLinkStyle}>
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    style={navLinkStyle}
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                        className="dropdown-item"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink onClick={handleLogout} to="/login" className="dropdown-item">
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}

              <li className="nav-item" style={{ "marginBottom": "8px" }}>
                <NavLink
                  to="/cart"
                  className="nav-link"
                  style={{ ...navLinkStyle, color: "#ffffff" }}
                >
                  <Badge
                    count={cart?.length}
                    showZero
                    offset={[10, -5]}
                    style={{
                      backgroundColor: "transparent",
                      color: "#ffffff",
                    }}
                  >
                    <span style={{ color: "#ffffff" }}>Cart</span>
                  </Badge>
                </NavLink>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
