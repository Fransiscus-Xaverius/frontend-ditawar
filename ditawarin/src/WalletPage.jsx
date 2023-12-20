import { Navigate, useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import uang from './assets/money.png'
import { useState } from "react";

export default function WalletPage(){
    
	let userToken = localStorage.getItem("token");
    const wallet_data = useLoaderData();
    const [tarik, setTarik] = useState(false)
    const [top, setTop] = useState(false);
    const [historyType, setHistoryType] = useState("all");

    const history = wallet_data.wallet.result.history.reverse();
    console.log(history);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	console.log(wallet_data);

	const Rupiah = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	});

    const top_up = async (data) => {
        const options = {
            method: "POST",
        }

        const body_data = {
            nama: wallet_data.user.nama,
            email: wallet_data.user.email,
            phone: wallet_data.user.phone,
            desc: `Top Up Saldo sebesar ${Rupiah.format(data.amount)}`,
            amount: parseInt(data.amount),
            city: wallet_data.user.city,
            kode_pos: 12345, //needs fixing, additional data needed in register
            provinsi: wallet_data.user.province,
            alamat: wallet_data.user.address,
            wallet_id: wallet_data.wallet.result._id
        }

        console.log(body_data);

        try {
            const res = await axios.post(import.meta.env.VITE_API_URL + "/createInvoice", body_data);
            const json = res.data;
            console.log(json);
        } catch (error) {
            console.error(error);
        }
    }

    const tarikClick = () => {
		setTarik(true);
	};

    const topClick = () => {
        setTop(true)
    }

    const changemode=(data)=>{
        setHistoryType(data)
    }

    return (
        <>
        {!userToken && <Navigate to={"/login"} />}
		{userToken == "admin" && <Navigate to={"/login"} />}
        {userToken && (
            <div className="container fontcustom">
                <div className="row mt-5 justify-content-between">
                    <h1 className="mb-4" style={{color: "#06083D"}}><b>Detail Saldo</b></h1>
                    <div className="col-5 border border-secondary-subtle p-4" style={{borderRadius: "45px", maxHeight:"200px"}}>
                        <div className="d-flex mb-4 pb-3 align-items-center border-bottom">
                            <img src={uang} alt="" style={{width: "40px", height: "40px"}}/>
                            <div className="ketSaldo ms-3">
                                <p className="mb-0">Total Saldo Aktif</p>
                                <p className="mb-0" style={{fontWeight:"bold", color: "#06083D", fontSize:"22px"}}>{Rupiah.format(wallet_data.wallet.result.saldo)}</p>
                            </div>
                            <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="btn btn-success ms-auto" onClick={()=> {topClick()}}><b>Topup Saldo</b></button>  
                        </div>
                        <div className="d-flex">
                            <p className="mb-0">Saldo Tertahan :</p>
                            <p className="ms-auto mb-0">{Rupiah.format(wallet_data.wallet.result.saldo_tertahan)}</p>
                        </div>
                    </div>
                    

                    <div className="col-6 border border-secondary-subtle p-4" style={{borderRadius: "45px"}}>
                        <h2 className="mb-0" style={{color: "#06083D"}}><b>Riwayat Saldo</b></h2>
                        <div className="d-flex mt-4 border-bottom">
                            <button type="button" onClick={()=>{changemode("all")}} className="btn btn-success mt-3" style={{width: "100%", backgroundColor: "rgba(0, 123, 255, 0.5)"}}><b>Semua Transaksi</b></button>
                            <button type="button" onClick={()=>{changemode("topup")}} className="btn btn-success mt-3" style={{width: "100%", backgroundColor: "rgba(0, 123, 255, 0.5)"}}><b>Top Up</b></button>
                            <button type="button" onClick={()=>{changemode("sell")}} className="btn btn-success mt-3" style={{width: "100%", backgroundColor: "rgba(0, 123, 255, 0.5)"}}><b>Penjualan</b></button>
                            <button type="button" onClick={()=>{changemode("purchase")}} className="btn btn-success mt-3" style={{width: "100%", backgroundColor: "rgba(0, 123, 255, 0.5)"}}><b>Pembelian/Bid</b></button>
                        </div>
                        <div className="div" style={{ overflowY: "auto", maxHeight:"300px"}}>
                            {historyType == "all" && (
                                history.map((item, index) => {
                                    //bid type
                                    if(item.type == "bid"){
                                        let date = new Date(item.invoice.date)
                                        return (
                                            <>
                                                <div className="mt-3 border-bottom">
                                                    <p className="mb-0">Bid ID: {item.invoice.bid_id}</p>
                                                    <p className="mb-0">Auction ID: {item.invoice.bid_id}</p>
                                                    <p className="ms-auto mb-0">Amount: {Rupiah.format(item.invoice.amount)} (Pending)</p>
                                                    <p>{date.toString()}</p>
                                                    <p className="mb-0">Bid</p>
                                                </div>
                                            </>
                                        )
                                    }
                                    //purchase type
                                    if(item.type == "purchase"){
                                        let date = new Date(item.date)
                                        return (
                                            <>
                                                <div className="mt-3 border-bottom">
                                                    <p className="mb-0">Receiver ID: {item.to}</p>
                                                    <p className="ms-auto mb-0">Amount: {Rupiah.format(item.amount)}</p>
                                                    <p>{date.toString()}</p>    
                                                    <p className="mb-0">Purchase</p>
                                                </div>
                                            </>
                                        )
                                    }
                                    //topup type
                                    if(item.type == "topup"){
                                        let date = new Date(item.date)
                                        return (
                                            <>
                                            <div className="mt-3 border-bottom">
                                                <p className="mb-0">Transaction ID: {item.transaction_id}</p>
                                                <p className="ms-auto mb-0">Amount: {Rupiah.format(item.amount)}</p>
                                                <p>{date.toString()}</p>
                                                <p className="mb-0">{item.type}</p>
                                            </div>
                                            </>
                                        )
                                    }
                                    if(item.type == "sale"){
                                        return(
                                            <>
                                            <div className="mt-3 border-bottom">
                                                <p className="mb-0">Transaction ID: {item._id}</p>
                                                <p className="ms-auto mb-0">Amount: {Rupiah.format(item.amount)}</p>
                                                <p className="ms-auto mb-0">Status: COMPLETED TRANSACTION</p>
                                                <p className="ms-auto mb-0">{item.type}</p>
                                            </div>
                                            </>
                                        )
                                    }
                                    
                                })
                            )}
                            {historyType == "topup" && (
                                history.map((item, index) => {
                                    if(item.type == "topup"){
                                        let date = new Date(item.date)
                                        return (
                                            <>
                                            <div className="mt-3 border-bottom">
                                                <p className="mb-0">Transaction ID: {item.transaction_id}</p>
                                                <p className="ms-auto mb-0">Amount: {Rupiah.format(item.amount)}</p>
                                                <p>{date.toString()}</p>
                                                <p className="mb-0">{item.type}</p>
                                            </div>
                                            </>
                                        )
                                    }
                                })
                            )}
                            {historyType == "sell" && (
                                history.map((item, index) => {
                                    if(item.type == "sale"){
                                        let date = new Date(item.date)
                                        return (
                                            <>
                                            <div className="mt-3 border-bottom">
                                                <p className="mb-0">Transaction ID: {item._id}</p>
                                                <p className="ms-auto mb-0">Amount: {Rupiah.format(item.amount)}</p>
                                                <p>{date.toString()}</p>
                                                <p className="mb-0">{item.type}</p>
                                            </div>
                                            </>
                                        )
                                    }
                                })
                            )}
                            {historyType == "purchase" && (
                                history.map((item, index) => {
                                    if(item.type == "purchase"|| item.type == "bid"){
                                        if(item.type == "bid"){
                                            let date = new Date(item.invoice.date)
                                            return (
                                                <>
                                                    <div className="mt-3 border-bottom">
                                                        <p className="mb-0">Bid ID: {item.invoice.bid_id}</p>
                                                        <p className="mb-0">Auction ID: {item.invoice.bid_id}</p>
                                                        <p className="ms-auto mb-0">Amount: {Rupiah.format(item.invoice.amount)}(Pending)</p>
                                                        <p>{date.toString()}</p>
                                                        <p className="mb-0">Bid</p>
                                                    </div>
                                                </>
                                            )
                                        }
                                        if(item.type == "purchase"){
                                            let date = new Date(item.date)
                                            return (
                                                <>
                                                    <div className="mt-3 border-bottom">
                                                        <p className="mb-0">Receiver ID: {item.to}</p>
                                                        <p className="ms-auto mb-0">Amount: {Rupiah.format(item.amount)}</p>
                                                        <p>{date.toString()}</p>    
                                                        <p className="mb-0">Purchase</p>
                                                    </div>
                                                </>
                                            )
                                        }
                                    }
                                })
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-5 text-center">
                    {!tarik && (
                        <button type="button" className="btn btn-success mt-2" style={{width: "100%"}} onClick={()=> {tarikClick()}}><b>Tarik Saldo</b></button>
                    )}
                    {tarik && (
                        <div className="mt-3">
                            <div className="d-flex align-items-center">
                                <p className="mb-0 me-5" style={{fontSize: "20px"}}><b>Rp</b></p>
                                <input type="text"placeholder="Jumlah yang ingin ditarik" className="me-2 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "100%", height: "3rem"}}/> <br />
                            </div>
                            <button type="button" className="btn btn-success mt-3" style={{width: "100%"}}><b>Tarik Saldo</b></button>
                        </div>
                    )}
                </div>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">
                            Modal title
                            </h5>
                            <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            ></button>
                        </div>
                        <form onSubmit={handleSubmit(top_up)}>
                            <div className="d-flex ps-4 pt-4 pe-4 mb-4 pb-3 align-items-center border-bottom">
                                <img src={uang} alt="" style={{width: "40px", height: "40px"}}/>
                                <div className="ketSaldo ms-3">
                                    <p className="mb-0">Total Saldo Aktif</p>
                                    <p className="mb-0" style={{fontWeight:"bold", color: "#06083D", fontSize:"22px"}}>{Rupiah.format(wallet_data.wallet.result.saldo)}</p>
                                </div>
                                <div className="topup ms-auto text-end">
                                    <input type="number"placeholder="0" {...register("amount", {required:{value:true, message:"Jumlah top up wajib diisi!"}})} className=" ms-auto ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "13rem", height: "3rem"}}/> <br />
                                    {errors.amount && <p style={{color: "red"}}>{errors.amount.message}</p>}
                                    <button type="submit" className="btn btn-success ms-auto mt-2"><b>Topup Saldo</b></button>
                                </div>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        )}
            {/* <h1>Detail Saldo</h1>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <p>Saldo Aktif</p>
                        <h1 style={{fontWeight:"bold"}}>{Rupiah.format(wallet_data.wallet.result.saldo)}</h1>
                        <p>Saldo Tertahan: {Rupiah.format(wallet_data.wallet.result.saldo_tertahan)}</p>
                    </div>
                    <div className="col-4">
                        <p>Top Up</p>
                        <form onSubmit={handleSubmit(top_up)}>
                            Amount: IDR<input type="number" {...register('amount')} />
                            <button className="btn btn-primary">Top Up</button>
                        </form>
                    </div>
                </div>
            </div> */}
        </>
    )
}
