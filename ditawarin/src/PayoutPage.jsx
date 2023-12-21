import { Navigate, useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import uang from './assets/money.png'
import { useCallback, useState } from "react";

export default function PayoutPage(){
    let userToken = localStorage.getItem("token");
    const wallet_data = useLoaderData();

    const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

    const Rupiah = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	});

    const payout = async (data) => {
        const options = {
            method: "POST",
        }
        alert("Penarikan saldo sedang diproses, mohon tunggu sebentar!")
        // alert('called payout')

        const body_data = {
            nama: wallet_data.user.nama,
            email: wallet_data.user.email,
            phone: wallet_data.user.phone,
            desc: `Penarikan Saldo sebesar ${Rupiah.format(data.amount)}`,
            amount: parseInt(data. payout_amount),
            rekening: data.rekening,
            nama_rekening: data.nama_rekening,
            city: wallet_data.user.city,
            kode_pos: 12345, //needs fixing, additional data needed in register
            provinsi: wallet_data.user.province,
            alamat: wallet_data.user.address,
            wallet_id: wallet_data.wallet.result._id
        }

        try {
            const res = await axios.post(import.meta.env.VITE_API_URL + "/payout", body_data);
            alert("Penarikan Saldo Berhasil!")
            window.location.reload();
        } catch (error) {
            console.log(error)
            if(error.response){
                alert(`Penarikan saldo gagal! Reason:${error.response.data.msg}`)
            }
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(payout)}>
                <div className="d-flex align-items-center mb-3">
                    <p className="mb-0">Nama Pemilik Rekening :</p>
                    <input
                        type="text"
                        {...register("nama_rekening", { required: { value: true, message: "Nama Pemilik Rekening wajib diisi" } })}
                        className="ms-auto ps-3 border border-secondary-subtle"
                        style={{ borderRadius: "10px", width: "13rem", height: "3rem" }}
                    />
                </div>
                <div className="d-flex align-items-center mb-3">
                    {errors.nama_rekening && <p style={{ color: "red" }}>{errors.nama_rekening.message}</p>}
                </div>
                <div className="d-flex align-items-center mb-3">
                    <p className="mb-0">Nomor Rekening :</p>
                    <input
                        type="text"
                        {...register("rekening", { required: { value: true, message: "Nomor rekening wajib diisi" } })}
                        className="ms-auto ps-3 border border-secondary-subtle"
                        style={{ borderRadius: "10px", width: "13rem", height: "3rem" }}
                    />
                </div>
                <div className="d-flex align-items-center mb-3">
                    {errors.rekening && <p style={{ color: "red" }}>{errors.rekening.message}</p>}
                </div>
                <div className="d-flex align-items-center mb-3">
                    <p className="mb-0">Jumlah Uang :</p>
                    <input
                        type="number"
                        {...register("payout_amount", { required: { value: true, message: "Jumlah uang tidak boleh kosong!" } })}
                        className="ms-auto ps-3 border border-secondary-subtle"
                        style={{ borderRadius: "10px", width: "13rem", height: "3rem" }}
                    />
                </div>
                <div className="d-flex align-items-center mb-3">
                    {errors.payout_amount && <p style={{ color: "red" }}>{errors.payout_amount.message}</p>}
                </div>
                <button type="submit" className="btn btn-success ms-auto mt-2" style={{ width: "100%" }}>
                    <b>Tarik Saldo</b>
                </button>
            </form>
        </>
    )
}