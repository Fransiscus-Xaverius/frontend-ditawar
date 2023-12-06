import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import client from "../client";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import { useLoaderData } from "react-router-dom";

export default function Navbar() {
  let userToken = localStorage.getItem("token");

  let Rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const data = useLoaderData();

  console.log(data);

  const location = useLocation();
  const navigate = useNavigate();

//   useEffect(() => {
//     userToken = localStorage.getItem("token");
//   }, [location]);

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      navigate("/search/" + e.target.value);
    }
  }

  return (
    <>
      <nav className="p-0" style={{ borderBottom: "1px solid gray" }}>
        <div className="container-fluid" style={{ backgroundColor: "#06083D" }}>
          <div className="d-flex align-items-center">
            <Link to="/" style={{ width: "80px" }}>
              <img src={Logo} alt="" className="img-fluid" />
            </Link>
            <input
              type="text"
              placeholder="Cari Produk"
              onKeyUp={handleKeyPress.bind(this)}
              className="border border-secondary-subtle p-4 mx-auto"
              style={{ borderRadius: "8px", width: "40%", height: "2rem" }}
            />
            <div className="d-flex align-items-center">
              {!userToken && (
                <>
                  <NavLink
                    type="button"
                    className="btn btn-outline-light me-3"
                    to="/login"
                  >
                    Masuk
                  </NavLink>
                  <NavLink
                    type="button"
                    className="btn btn-outline-light"
                    to="/register"
                  >
                    Daftar
                  </NavLink>
                </>
              )}
              {userToken && (
                <>
                  <img
                    style={{ height: "48px" }}
                    className="nav-item rounded-circle me-2"
                    alt="avatar_user"
                    src={import.meta.env.VITE_API_URL + "/static/" + data.profile_picture || ""
                }
                  />
                  <div className="me-3">
                    <NavLink
                      className="nav-item"
                      to="/profile"
                      style={{ textDecoration: "none" }}
                    >
                      <p className="mb-0 text-light">
                        Hi, {data.nama || "User"}
                      </p>
                    </NavLink>
                    <NavLink
                      className="nav-item"
                      to="/wallet"
                      style={{ textDecoration: "none" }}
                    >
                      <p className="mb-0 text-light">
                        Saldo: {Rupiah.format(parseInt(data.wallet))}
                      </p>
                    </NavLink>
                  </div>
                  <NavLink
                    type="button"
                    className="btn btn-outline-light ms-3 me-3"
                    to="/purchases"
                    style={{ minWidth: "80px" }}
                  >
                    My Items
                  </NavLink>
                  <NavLink
                    type="button"
                    className="btn btn-outline-light ms-3 me-3"
                    to="/sell"
                    style={{ minWidth: "80px" }}
                  >
                    JUAL
                  </NavLink>
                  {/* <NavLink type="button" className="btn btn-primary" to="/profile">Profile</NavLink> */}
                  <NavLink
                    type="button"
                    className="btn btn-outline-light"
                    to="/logout"
                    style={{ minWidth: "80px" }}
                    onClick={() => handleClick()}
                  >
                    LOGOUT
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
      <Footer />
    </>
  );
}
