import location from "./assets/loc.png";
import { useState } from "react";
import client from './client';
import { useNavigate } from 'react-router';
export default function PurchasePageItem(props) {

    let Rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    });

    const navigate = useNavigate();

    console.log(props);
    const url = import.meta.env.VITE_API_URL + "/static/" + props.item.images || "";
    console.log(props);

    let lastHistory = null;
    if(props.history.length > 0){
        lastHistory = props.history[props.history.length-1];
        console.log(lastHistory)
    }

    let isMarked = false;
    let isFinished = false;
    let date = new Date();

    if(lastHistory){
        if(lastHistory.type == "marked"){
            isMarked = true;
            isFinished = false;
        }
        else if(lastHistory.type == "finished"){
            isFinished = true;
            isMarked = false;
            date = new Date(lastHistory.date);
        }
    }

    const finishPurchase = async () => {
        const token = localStorage.getItem("token");
        const result = await client.post(`/purchase/finish?id=${props._id}`, {
            token: token,
        });
        console.log(result.data);
        if(result.status == 201){
            alert("Pesanan diselesaikan!")
            navigate(0);
        }
        else{
            alert("Terjadi kesalahan!")
        }
    }

    if(!props.status){
        return (
            <div className="card mb-3 mt-4" style={{ minHeight: "25vh", width: "80vw" }}>
                <div className="row g-0">
                    <div className="col-md-2 text-center pt-5">
                        <img src={url} className="img-fluid rounded-start" style={{ height: "10vh" }} />
                    </div>
                    <div className="col-md-10">
                        <div className="card-body">
                            <p className="card-title" style={{ fontSize: "20px" }}>
                                {props.item.nama} 
                                <br /><p style={{fontSize: "15px"}}>transaction/{props.item._id}</p>
                                </p>
                            <div className="row mb-3">
                                <div className="col-8">
                                    <p className="card-text" style={{ fontSize: "20px" }}>Seller : {props.seller.nama}</p>
                                    {isFinished && <p className="card-text" style={{ fontSize: "12px" }}>Status : <br /> Transaksi selesai</p>}
                                    {isFinished && <p className="card-text" style={{ fontSize: "12px" }}>{date.toString()}</p>}
                                    {isMarked && <p className="card-text" style={{ fontSize: "12px" }}>Status : <br /> Seller menyatakan transaksi selesai. Menunggu konfirmasi buyer</p>}
                                </div>
                                <div className="col-4">
                                    <p style={{fontSize:"15px"}}>Total : <br /> {Rupiah.format(props.transaction.invoice.amount)} <br /></p>
                                    <img src={location} alt="" style={{ width: "20px" }} className="ms-2" /> <p style={{fontSize:'12px'}}>{props.auctiondata.kecamatan+","+props.auctiondata.kota_kabupaten+","+props.auctiondata.provinsi}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col d-flex">
                                    <button className="btn btn-success me-2" style={{ width: "100px" }}>Detail</button>
                                    {isMarked && <button className="btn btn-primary" style={{ width: "100px" }} onClick={()=>{finishPurchase()}}>Confirm</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else{
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
                                        <button className="btn btn-success me-2" style={{ width: "100px" }}>Ulas</button>
                                        <button className="btn btn-warning" style={{ width: "100px" }}>Laporkan</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}