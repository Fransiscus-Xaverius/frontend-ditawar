import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import PurchasePageItem from "./PurchasePageItemBuyer";
export default function PurchasePageSeller() {

    const data = useLoaderData();
    console.log(data);

    const result = data.data.result;

    const filter = result.reduce((r, o) =>{
        r[o.status == "pending" ? 'pendingData' : 'finishedData'].push(o);
        return r
    }, {pendingData: [], finishedData: []})

    const [mode, setMode] = useState("pending");

    const changeMode = (mode) => {
        setMode(mode);
    }

    return (
        <>
        <h1>Purchase Page Seller</h1>
        <div className="container-fluid">
            <div className="row">
                <div className="d-flex">
                    <button className="btn text-light mt-3 mb-3 me-3 pt-3 pb-3" type="submit" style={{backgroundColor: "#06083D"}}>
                        <div className="d-flex align-items-center" onClick={()=>{changeMode("finished")}}>
                            <b>PESANAN MASUK</b>
                            <p className="ms-2 mb-0" style={{backgroundColor: "red", borderRadius: "20px", width: "20px", height: "25px"}}>1</p>
                        </div>
                    </button>
                    <button className="d-flex btn text-light mt-3 mb-3  pt-4 pb-4" type="submit" style={{backgroundColor: "#06083D"}}>
                        <div className="d-flex align-items-center" onClick={()=>{changeMode("pending")}}>
                            <b>PESANAN DIBATALKAN</b> 
                            <p className="ms-2 mb-0" style={{backgroundColor: "red", borderRadius: "20px", width: "20px", height: "25px"}}>1</p>
                        </div>
                    </button>
                </div>
            </div>
            <div className="row">
                
            </div>
        </div>
        </>
    );
}