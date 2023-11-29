import { useLoaderData } from "react-router-dom";
import client from "./client"
import {React, useEffect, useState} from "react";

export default function AuctionPage(){

    const data = useLoaderData();
    // console.log(data);
    let item = data.itemdata;
    let auction = data.auctiondata;
    let user = data.userdata;
    let url =import.meta.env.VITE_API_URL+'/static/'+item.images;
    let berakhir = new Date(data.auctiondata.tanggal_selesai);
    
    // console.log(data.auctiondata.tanggal_selesai);
    
    // console.log(berakhir)
    // console.log(url);

    // console.log(item);
    // console.log(auction);

    const [timer, setTimer] = useState("00:00:00");

    const getTimeRemaining = () => {
        const total =
            Date.parse(berakhir) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor(
            (total / 1000 / 60) % 60
        );
        const days = Math.floor(
            total / (1000 * 60 * 60 * 24)
        );
        const hours = Math.floor(
            (total / 1000 / 60 / 60) % 24
        ) + (days * 24); // Add remaining days in hours
        return {
            total,
            hours,
            minutes,
            seconds,
        };
    };

    const startTimer = () => {
        let { total, hours, minutes, seconds } =
            getTimeRemaining();
        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : "0" + hours) +
                    ":" +
                    (minutes > 9
                        ? minutes
                        : "0" + minutes) +
                    ":" +
                    (seconds > 9 ? seconds : "0" + seconds)
            );
        }
    };

    useEffect(() => {
        const interval = setInterval(startTimer, 1000);
        return () => clearInterval(interval);
    }, []);

    let Rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    });
    const date = new Date(auction.tanggal_mulai)

    return (
        <>
            <div className="container-fluid">
                <div className="row mt-4 mx-auto" style={{height:"470px", width:"85%"}}>
                    <div className="col-md-4 text-center" style={{marginTop:"auto", marginBottom:"auto"}}>
                        <img src={url} alt="Item Image" style={{maxHeight:"300px", maxWidth:"300px"}}/>
                    </div>
                    <div className="col-md-5" style={{marginTop:"auto", marginBottom:"auto"}}>
                        <div className="display-5 ms-4">{item.nama}</div>
                        <div className="container-fluid d-flex ms-4 mt-3 mb-5">
                            <h2>{Rupiah.format(auction.asking_price)}</h2>
                        </div>
                        <hr />
                        <div className="h3 ms-4">Detail</div><br />
                        <div className="ms-4">{item.deskripsi}</div>
                    </div>
                    <div className="col-md-3" style={{marginTop:"auto", marginBottom:"auto"}}>
                        <div className="border rounded-4 text-center mx-auto">
                            <div className="bg-primary text-white rounded-top-4 p-3">Waktu Server</div>
                            <div className="mb-4 mt-4">
                                <b> DIBUKA PADA </b><br />
                                {date.toLocaleString('default', { month: 'long' }) + ", " + date.getDate() + " " + date.getFullYear() + " " + ("" + date.getHours()).padStart(2, "0") + ":" + ("" + date.getMinutes()).padStart(2, "0") + ":" + ("" + date.getSeconds()).padStart(2, "0")} <br />
                                <br />
                                <b> WAKTU BERAKHIR </b><br />
                                {timer}
                            </div>
                        </div>
                    </div>
                </div>
                {
                    auction.nama_penjual == user.nama ?
                    <div className="row mx-auto" style={{width:"50%"}}>
                        <div className="col-6 text-center"><button className="btn bg-primary rounded-pill text-white pt-3 pb-3" style={{width:"200px"}}>Ubah</button></div>
                        <div className="col-6 text-center"><button className="btn bg-primary rounded-pill text-white pt-3 pb-3" style={{width:"200px"}}>Lelang Produk</button></div>
                    </div>
                    :
                    <div className="row mx-auto" style={{width:"50%"}}>
                        <div className="col-4 text-center"><button className="btn bg-primary rounded-pill text-white pt-3 pb-3" style={{width:"200px"}}>Laporkan</button></div>
                        <div className="col-4 text-center"><button className="btn bg-primary rounded-pill text-white pt-3 pb-3" style={{width:"200px"}}>Masukkan Harga</button></div>
                        <div className="col-4 text-center"><button className="btn bg-primary rounded-pill text-white pt-3 pb-3" style={{width:"200px"}}>Keranjang</button></div>
                    </div>
                }
            </div>
        </>
    )
}