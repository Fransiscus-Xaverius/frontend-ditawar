import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { Link, redirect } from 'react-router-dom'
import client from './client.jsx'
import { useNavigate } from 'react-router-dom'

export default function JualPage() {

    const {register, handleSubmit, reset, formState:{errors}} = useForm();
    const navigate = useNavigate();

    async function addItem(data){
        if(data.starting_price > data.asking_price){
            alert("Starting price tidak boleh lebih besar dari asking price")
            return
        }
        const url = 'http://localhost:3000/uploadFile';
        const formData = new FormData();
        console.log(data.files[0])
        console.log(data);
        formData.append('image', data.files[0]);
        let image;
        try {
            const res = await fetch(url, {
                method: 'POST',
                body: formData
            }).then(function(a){
                return a.json();
            }).then(function(json){
                console.log(json);
                image = json.filename;
            })
        } catch (error) {
            alert("Gagal upload file");
            return
        }
        const url2 = '/addItem?token='+localStorage.getItem('token')+'&nama='+data.namabarang+'&deskripsi='+data.deskripsi+'&images='+image;
        let item_id;
        try {
            const res2 = await client.post(url2);
            console.log(res2);
            item_id = res2.data.result.insertedId;
            try {
                const url3 = '/auction';
                const body_data2 = {
                    token: localStorage.getItem('token'),
                    id_barang: item_id,
                    starting_price: data.starting_price,
                    asking_price: data.asking_price,
                    tanggal_selesai: data.tanggal_selesai,
                    jam_selesai: data.jam_selesai
                }
                const res3 = await client.post(url3, body_data2);
                console.log("respond 3");
                console.log(res3);
                let auction_id = res3.data.result.insertedId;
                console.log(auction_id)
                navigate('/listing/'+auction_id);
            } catch (error) {
                alert('Gagal menambahkan auction');
                console.log(error);
            }
        } catch (error) {
            alert("Gagal menambahkan item");
            console.log(error);
            return
        }

    }
    return (
        <>
            <form onSubmit={handleSubmit(addItem)}>
                <label className='mt-1'>
                    Nama Barang:
                    <input type="text" {...register("namabarang", {required:{value:true, message:"Nama Barang wajib diisi"}})} placeholder="Nama Barang" className="mt-1 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/>
                    {errors.namabarang && <p style={{color: "red"}}>{errors.namabarang.message}</p>}
                </label>
                <br />
                <label className='mt-1'>
                    Deskripsi:
                    <input type="text" {...register("deskripsi", {required:{value:true, message:"Deskripsi Barang wajib diisi"}})} placeholder="Deskripsi Barang" className="mt-1 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/>
                    {errors.namabarang && <p style={{color: "red"}}>{errors.namabarang.message}</p>}
                </label>
                <br />
                <label className='mt-1'>
                    Harga Awal:
                    <input type="text" {...register("starting_price", {required:{value:true, message:"Starting Price wajib diisi"}})} placeholder="Starting Price" className="mt-1 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/>
                    {errors.starting_price && <p style={{color: "red"}}>{errors.starting_price.message}</p>}
                </label>
                <br />
                <label className='mt-1'>
                    Harga Acuan:
                    <input type="text" {...register("asking_price", {required:{value:true, message:"Asking Price wajib diisi"}})} placeholder="Asking Price" className="mt-1 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/>
                    {errors.asking_price && <p style={{color: "red"}}>{errors.asking_price.message}</p>}
                </label>
                <br />
                <label className='mt-1'>
                    <input type="file" {...register("files", {required: "Wajib memberikan gambar barang"})}  name="files" id="files" />
                    {errors.files && <p style={{color: "red"}}>{errors.image.message}</p>}
                </label>
                <br />
                <label className='mt-1'>
                    Ending Date: <input {...register('tanggal_selesai', {required:"Wajib memberikan tanggal auction selesai"})} type="date" name="tanggal_selesai" id="tanggal_selesai" /> <input {...register('jam_selesai', {required:"wajib memberikan jam auction selesai"})} type="time" name="jam_selesai" id="jam_selesai" />
                    {errors.tanggal_selesai && <p style={{color: "red"}}>{errors.tanggal_selesai.message}</p>} {errors.jam_selesai && <p style={{color: "red"}}>{errors.jam_selesai.message}</p>}
                </label>
                <br />
                <button type="submit">Add Item</button>
            </form>
        </>
    );
}
