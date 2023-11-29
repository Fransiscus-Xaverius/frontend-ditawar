import { useLoaderData } from "react-router-dom";
import client from "./client"
import {React, useEffect, useState} from "react";
import { useForm } from "react-hook-form";

export default function AuctionPage(){

    const data = useLoaderData();
    const {register, handleSubmit, reset} = useForm()
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
        // console.log(hours, minutes, seconds)
        return {
            total,
            hours,
            minutes,
            seconds,
        };
    };

    const startTimer = () => {
        // console.log(timer)
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

    

    function bidauction(){

    }

    let Rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    });
    const date = new Date(auction.tanggal_mulai)

    return (
        <>
            {console.log(auction)}
            <div className="container-fluid">
                <div className="row mt-4 mx-auto" style={{height:"470px", width:"85%"}}>
                    <div className="col-md-4 text-center" style={{marginTop:"auto", marginBottom:"auto"}}>
                        <img src={url} alt="Item Image" className="border border-5 rounded-5" style={{maxHeight:"300px", maxWidth:"300px"}}/>
                    </div>
                    <div className="col-md-5" style={{marginTop:"auto", marginBottom:"auto"}}>
                        <div className="h3 ms-4" >{item.nama}</div>
                        <div className="h5 ms-4">{auction.kategori_barang}</div>
                        <div className="container-fluid d-flex ms-4 mt-3 mb-5">
                            <h2>{Rupiah.format(auction.asking_price)}</h2>
                        </div>
                        <hr />
                        <div className="h3 ms-4">Detail</div><br />
                        <div className="ms-4 w-100">{item.deskripsi}</div>
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
                        <div className="col-4 text-center"><button data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="btn bg-primary rounded-pill text-white pt-3 pb-3" style={{width:"200px"}}>Masukkan Harga</button></div>
                        <div className="col-4 text-center"><button className="btn bg-primary rounded-pill text-white pt-3 pb-3" style={{width:"200px"}}>Keranjang</button></div>
                    </div>
                }
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={handleSubmit(bidauction)}>
                                <div className="modal-body row">
                                    <div className="text-center h2">{item.nama}</div>      
                                    <div className="text-center mb-5">
                                        <img src={url} alt="Item Image" className="border border-5 rounded-5" style={{maxHeight:"300px", maxWidth:"300px"}}/> <br />
                                        <h5>{Rupiah.format(auction.asking_price)}</h5>
                                    </div>               
                                    <input type="text" {...register("nominal_bid")} className="p-2 col-md-8 mx-auto" placeholder="Masukkan Harga"/>
                                    <button type="submit" className="btn bg-primary text-white col-md-3 mx-auto">Ajukan</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}