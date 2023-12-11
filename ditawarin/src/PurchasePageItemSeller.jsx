
import React from 'react';

const PurchasePageItemSeller = () => {

    let Rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    });

    return (
        <>
            <div className="card mb-3 mt-4" style={{ minHeight: "25vh", width: "60vw" }}>
                <div className="row g-0">
                    <div className="col-md-2 text-center pt-5">
                        <img src={url} className="img-fluid rounded-start" style={{ height: "10vh" }} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <p className="card-title" style={{ fontSize: "20px" }}>
                                {props.item.nama} 
                                <br /><p style={{fontSize: "15px"}}>transaction/{props.item._id}</p>
                                </p>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <p className="card-text" style={{ fontSize: "20px" }}>Seller : {props.seller.nama}</p>
                                    
                                </div>
                                <div className="col-6 ">
                                    <p>Total :
                                    {Rupiah.format(props.transaction.invoice.amount)} <br /></p>
                                    <img src={location} alt="" style={{ width: "20px" }} className="ms-2" />{props.auctiondata.kecamatan+","+props.auctiondata.kota_kabupaten+","+props.auctiondata.provinsi}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col d-flex">
                                    <button className="btn btn-success me-2" style={{ width: "100px" }}>Detail</button>
                                    {/* <button className="btn btn-primary" style={{ width: "100px" }}>Confirm</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PurchasePageItemSeller;
