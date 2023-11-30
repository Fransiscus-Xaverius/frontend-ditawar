import { Outlet, useNavigate } from "react-router-dom"
import Logo from '../assets/logo.png'
import { Link, NavLink } from "react-router-dom";
import client from "../client";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";

export default function Navbar(){
    let userToken = localStorage.getItem("token");

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        userToken = localStorage.getItem("token");
    }, [location]);

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            navigate('/search/'+e.target.value);
        }
    }

    return (
        <>
            <nav className="p-0" style={{borderBottom: "1px solid gray"}}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to="/"><img src={Logo} alt="" style={{width: "10%", height: "10%"}}/></Link>
                        <input type="text" placeholder='Cari Produk' onKeyUp={handleKeyPress.bind(this)} className="border border-secondary-subtle ps-3 me-3" style={{borderRadius: "8px", width: "40%", height: "2rem"}}/>
                        <div className="d-flex">
                        {!userToken && 
                            <>
                                <NavLink type="button" className="btn btn-outline-primary me-3" to="/login">Masuk</NavLink>
                                <NavLink type="button" className="btn btn-primary" to="/register">Daftar</NavLink>
                            </>
                        }
                        {userToken &&
                            <>
                                <NavLink type="button" className="btn btn-primary" to="/sell">Jual</NavLink>
                                <NavLink type="button" className="btn btn-primary" to="/profile">Profile</NavLink>
                                <NavLink type="button" className="btn btn-primary" to="/logout" onClick={()=>handleClick()}>Logout</NavLink>
                            </>
                        }
                    </div>
                 </div>
                </div>
            </nav>
            <Outlet/>
            <Footer/>
        </>
    )
}