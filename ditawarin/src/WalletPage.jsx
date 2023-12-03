import { useLoaderData } from "react-router-dom"
import {useForm} from "react-hook-form"
import axios from 'axios';

export default function WalletPage(){
    
    const wallet_data = useLoaderData();

    const {register, handleSubmit, reset, formState:{errors}} = useForm();

    console.log(wallet_data);

    const Rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
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

    return (
        <>
            <h1>Detail Saldo</h1>
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
            </div>
        </>
    )
}