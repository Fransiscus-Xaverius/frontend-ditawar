import { useLoaderData } from "react-router-dom";
import plus from "./assets/plus.png"
import location from "./assets/loc.png";
export default function PurchasePageSeller() {

    const data = useLoaderData();
    console.log(data);

    return (
        <>
        <h1>Purchase Page Seller</h1>
        <div className="container-fluid">
            <div className="row">
                <div className="d-flex">
                    <button className="btn text-light mt-3 mb-3 me-3 pt-3 pb-3" type="submit" style={{backgroundColor: "#06083D"}}>
                        <div className="d-flex align-items-center">
                            <b>PESANAN MASUK</b>
                            <p className="ms-2 mb-0" style={{backgroundColor: "red", borderRadius: "20px", width: "20px", height: "25px"}}>1</p>
                        </div>
                    </button>
                    <button className="d-flex btn text-light mt-3 mb-3  pt-4 pb-4" type="submit" style={{backgroundColor: "#06083D"}}>
                        <div className="d-flex align-items-center">
                            <b>PESANAN DIBATALKAN</b> 
                            <p className="ms-2 mb-0" style={{backgroundColor: "red", borderRadius: "20px", width: "20px", height: "25px"}}>1</p>
                        </div>
                    </button>
                </div>
            </div>
            {/* PESANAN MASUK */}
            <div className="card mb-3 mt-4" style={{ minHeight: "30vh", width: "60vw" }}>
                <div className="row g-0">
                    <div className="col-md-4 text-center pt-2">
                        <img src={plus} className="img-fluid rounded-start" style={{ height: "30vh" }}/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <p className="card-title" style={{ fontSize: "35px" }}>aa</p>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <p className="card-text" style={{ fontSize: "20px" }}>Penawaran: aaa</p>
                                </div>
                                <div className="col-6">
                                    <img src={location} alt="" style={{ width: "20px" }}  className="ms-2"/>aaa
                                </div>
                            </div>
                            <p className="card-text overflow-y-auto" style={{ fontSize: "15px", maxHeight: "80px" }} >aaa</p>
                            <div className="d-flex">
                                <button className="d-flex btn btn-success text-light mt-3 mb-3 me-3" type="submit"><b>SETUJUI PENAWARAN</b></button>
                                <button className="d-flex btn btn-danger text-light mt-3 mb-3" type="submit"><b>TOLAK PENAWARAN</b></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> <br />

            {/* PESANAN DIBATALKAN */}
            <div className="card mb-3 mt-4" style={{ minHeight: "30vh", width: "60vw" }}>
                <div className="row g-0">
                    <div className="col-md-4 text-center pt-2">
                        <img src={plus} className="img-fluid rounded-start" style={{ height: "30vh" }}/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <p className="card-title" style={{ fontSize: "35px" }}>aa</p>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <p className="card-text" style={{ fontSize: "20px" }}>Penawaran: aaa</p>
                                </div>
                                <div className="col-6">
                                    <img src={location} alt="" style={{ width: "20px" }}  className="ms-2"/>aaa
                                </div>
                            </div>
                            <p className="card-text overflow-y-auto" style={{ fontSize: "15px", maxHeight: "80px" }} >aaa</p>
                            <button className="d-flex btn btn-danger text-light mt-3 mb-3 me-3" type="submit"><b>DIBATALKAN OLEH aaa</b></button>
                        </div>
                    </div>
                </div>
            </div> <br />
        </div>
        </>
    );
}