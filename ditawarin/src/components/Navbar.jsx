import { Outlet } from "react-router-dom"
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

    useEffect(() => {
        userToken = localStorage.getItem("token");
    }, [location]);

    return (
        <>
            <nav style={{borderBottom: "1px solid gray"}}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to="/"><img src={Logo} alt="" style={{width: "10%", height: "10%"}}/></Link>
                        <input type="text" placeholder='Cari Produk'/>
                        <div className="d-flex">
                        {!userToken && 
                            <>
                                <NavLink type="button" className="btn btn-primary" to="/login">Masuk</NavLink>
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