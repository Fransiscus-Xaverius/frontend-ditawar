import { Outlet } from "react-router-dom"
import Logo from '../assets/logo.png'
import { Link, NavLink } from "react-router-dom";

export default function Navbar(){
    
    const userToken = localStorage.getItem('token')

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
                                <button type="button" className="btn btn-primary">Daftar</button>
                            </>
                        }
                    </div>
                 </div>
                </div>
            </nav>
            <Outlet/>
        </>
    )
}