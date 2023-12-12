import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function PurchasesPage(){
    let userToken = localStorage.getItem("token");
    return(
        <>
        {!userToken && <Navigate to={"/login"}/>}
        {userToken == "admin" && <Navigate to={"/login"}/>}
        <h1>Purchases Page</h1>

        <div className="container-fluid">
            <div className="row">
                <div className="col-4">
                    <div className="row d-flex">
                        <div className="col d-flex flex-column">
                            <NavLink to="seller" className="btn btn-primary" style={{width:"100px"}}>
                                As Seller
                            </NavLink>
                            <br />
                            <NavLink to="buyer" className="btn btn-success" style={{width:"100px"}}>
                                As Buyer
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <Outlet />
                </div>
            </div>
        </div>

        </>
    )
}