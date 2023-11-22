import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import client from './client.jsx'
import { useNavigate } from 'react-router-dom'

export default function JualPage() {

    const {register, handleSubmit, reset, formState:{errors}} = useForm();
    const navigate = useNavigate();

    async function addItem(data){

    }

    return (
        <>
            <form onSubmit={handleSubmit(addItem)}>
                <label className='mt-1'>
                    Item Name:
                    <input type="text" {...register("namabarang", {required:{value:true, message:"Nama Barang wajib diisi"}})} placeholder="Nama Barang" className="mt-1 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/>
                    {errors.namabarang && <p style={{color: "red"}}>{errors.namabarang.message}</p>}
                </label>
                <br />
                <label className='mt-1'>
                    Starting Price:
                    <input type="text" {...register("starting_price", {required:{value:true, message:"Starting Price wajib diisi"}})} placeholder="Starting Price" className="mt-1 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/>
                    {errors.starting_price && <p style={{color: "red"}}>{errors.starting_price.message}</p>}
                </label>
                <br />
                <label className='mt-1'>
                    Asking Price:
                    <input type="text" {...register("asking_price", {required:{value:true, message:"Asking Price wajib diisi"}})} placeholder="Asking Price" className="mt-1 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/>
                    {errors.asking_price && <p style={{color: "red"}}>{errors.asking_price.message}</p>}
                </label>
                <br />
                <label className='mt-1'>
                    <input type="file" name="" id="" />
                </label>
                <br />
                <label className='mt-1'>
                    Ending Date: <input type="date" name="" id="" /> <input type="time" name="" id="" />
                </label>
                <br />
                <button type="submit">Add Item</button>
            </form>
        </>
    );
}
