import { Outlet, useNavigate } from "react-router-dom"
import Logo from '../assets/logo.png'
import { Link, NavLink } from "react-router-dom";
import client from "../client";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import { useLoaderData } from "react-router-dom";

export default function Navbar(){
    let userToken = localStorage.getItem("token");

    let Rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    });

    const data = useLoaderData();

    console.log(data);

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

    // const url_pp = import.meta.env.VITE_API_URL+'/static/'+data.profile_picture || "";

    return (
        <>
            <nav className="p-0" style={{borderBottom: "1px solid gray"}}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to="/"><img src={Logo} alt="" style={{width: "15%", height: "15%"}}/></Link>
                        <input type="text" placeholder='Cari Produk' onKeyUp={handleKeyPress.bind(this)} className="border border-secondary-subtle ps-3 me-3" style={{borderRadius: "8px", width: "40%", height: "2rem"}}/>
                        <div className="d-flex align-items-center">
                        {!userToken && 
                            <>
                                <NavLink type="button" className="btn btn-outline-primary me-3" to="/login">Masuk</NavLink>
                                <NavLink type="button" className="btn btn-primary" to="/register">Daftar</NavLink>
                            </>
                        }
                        {userToken &&
                            <>
                                {/* <img style={{height:"4vh"}} className="nav-item rounded-circle" alt="avatar_user" src={url_pp} />
                                <NavLink className="nav-item" to="/profile"><p className="mb-0">Hi, {data.nama||"User"}</p></NavLink>
                                <NavLink className="nav-item" to="/wallet"><p className="mb-0">Saldo: {Rupiah.format(parseInt(data.wallet))}</p></NavLink> */}
                                <NavLink type="button" className="btn btn-primary ms-3 me-3" to="/sell">Jual</NavLink>
                                {/* <NavLink type="button" className="btn btn-primary" to="/profile">Profile</NavLink> */}
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