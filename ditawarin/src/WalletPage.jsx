import { useLoaderData } from "react-router-dom"
import {useForm} from "react-hook-form"
import axios from 'axios';
import uang from './assets/money.png'
import { useState } from "react";

export default function WalletPage(){
    
    const wallet_data = useLoaderData();
    const [tarik, setTarik] = useState(false)

    const {register, handleSubmit, reset, formState:{errors}} = useForm();

    console.log(wallet_data);

    const Rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    });

    // const top_up = async (data) => {
    //     const options = {
    //         method: "POST",
    //     }

    //     const body_data = {
    //         nama: wallet_data.user.nama,
    //         email: wallet_data.user.email,
    //         phone: wallet_data.user.phone,
    //         desc: `Top Up Saldo sebesar ${Rupiah.format(data.amount)}`,
    //         amount: parseInt(data.amount),
    //         city: wallet_data.user.city,
    //         kode_pos: 12345, //needs fixing, additional data needed in register
    //         provinsi: wallet_data.user.province,
    //         alamat: wallet_data.user.address,
    //         wallet_id: wallet_data.wallet.result._id
    //     }

    //     console.log(body_data);

    //     try {
    //         const res = await axios.post(import.meta.env.VITE_API_URL + "/createInvoice", body_data);
    //         const json = res.data;
    //         console.log(json);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    const tarikClick = () => {
		setTarik(true);
	};


    return (
        <>
        <div className="container">
            <div className="row mt-5 justify-content-between">
                <h1 className="mb-4" style={{color: "#06083D"}}><b>Detail Saldo</b></h1>
                {!tarik && (
                <div className="col-5 border border-secondary-subtle p-4" style={{borderRadius: "45px"}}>
                    <div className="d-flex mb-4 pb-3 align-items-center border-bottom">
                        <img src={uang} alt="" style={{width: "40px", height: "40px"}}/>
                        <div className="ketSaldo ms-3">
                            <p className="mb-0">Total Saldo Aktif</p>
                            <p className="mb-0" style={{fontWeight:"bold", color: "#06083D", fontSize:"22px"}}>{Rupiah.format(wallet_data.wallet.result.saldo)}</p>
                        </div>
                        <button type="button" className="btn btn-success ms-auto" onClick={()=> {tarikClick()}}><b>Tarik Saldo</b></button>
                    </div>
                    <div className="d-flex">
                        <p className="mb-0">Saldo Refund :</p>
                        <p className="ms-auto mb-0">{Rupiah.format(wallet_data.wallet.result.saldo_tertahan)}</p>
                    </div>
                    <div className="d-flex">
                        <p className="mb-0">Saldo Tertahan :</p>
                        <p className="ms-auto mb-0">Rp 0</p>
                    </div>
                </div>
                )}
                {tarik && (
                <div className="col-5 border border-secondary-subtle p-4" style={{borderRadius: "45px"}}>
                    <div className="d-flex mb-4 pb-3 align-items-center border-bottom">
                        <img src={uang} alt="" style={{width: "40px", height: "40px"}}/>
                        <div className="ketSaldo ms-3">
                            <p className="mb-0">Total Saldo Aktif</p>
                            <p className="mb-0" style={{fontWeight:"bold", color: "#06083D", fontSize:"22px"}}>{Rupiah.format(wallet_data.wallet.result.saldo)}</p>
                        </div>
                        <div className="tarikSaldo ms-auto text-end">
                            <input type="text"placeholder="Jumlah yang ingin ditarik" className=" ms-auto ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "13rem", height: "3rem"}}/> <br />
                            <button type="button" className="btn btn-success mt-2"><b>Tarik Saldo</b></button>
                        </div>
                    </div>
                    <div className="d-flex">
                        <p className="mb-0">Saldo Refund :</p>
                        <p className="ms-auto mb-0">{Rupiah.format(wallet_data.wallet.result.saldo_tertahan)}</p>
                    </div>
                    <div className="d-flex">
                        <p className="mb-0">Saldo Tertahan :</p>
                        <p className="ms-auto mb-0">Rp 0</p>
                    </div>
                </div>
                )}

                <div className="col-6 border border-secondary-subtle p-4" style={{borderRadius: "45px"}}>
                    <h2 className="mb-0" style={{color: "#06083D"}}><b>Riwayat Saldo</b></h2>
                    <div className="d-flex mt-4 border-bottom">
                        <p>Semua Transaksi</p>
                        <p className="ms-3">Penjualan</p>
                    </div>
                </div>
            </div>
        </div>
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