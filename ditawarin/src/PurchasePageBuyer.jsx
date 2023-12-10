import plus from "./assets/plus.png"
import location from "./assets/loc.png";
import { useLoaderData } from "react-router-dom";
import PurchasePageItem from "./PurchasePageItem";
import DataHandler from "./data/DataHandler";

export default function PurchasePageBuyer() {
    const data = useLoaderData();
    const result = data.data.result;
    console.log(result);

    

    return (
        <>
        <h1>Purchase Page Buyer</h1>
        <div className="container-fluid">
            <div className="row">
                <div className="d-flex">
                    <button className="btn text-light mt-3 mb-3 me-3 pt-3 pb-3" type="submit" style={{backgroundColor: "#06083D"}}>
                        <div className="d-flex align-items-center">
                            <b>PESANAN BERHASIL</b>
                            <p className="ms-2 mb-0" style={{backgroundColor: "red", borderRadius: "20px", width: "20px", height: "25px"}}>1</p>
                        </div>
                    </button>
                    <button className="d-flex btn text-light mt-3 mb-3  pt-4 pb-4" type="submit" style={{backgroundColor: "#06083D"}}>
                        <div className="d-flex align-items-center">
                            <b>PESANAN DIPROSES</b> 
                            <p className="ms-2 mb-0" style={{backgroundColor: "red", borderRadius: "20px", width: "20px", height: "25px"}}>1</p>
                        </div>
                    </button>
                </div>
            </div>
            <div className="row">
                {result.map((item,index) => {
                    return (
                        <PurchasePageItem key={index} {...item} />
                    )
                })}
            </div>
        </div>
        </>
    );
}