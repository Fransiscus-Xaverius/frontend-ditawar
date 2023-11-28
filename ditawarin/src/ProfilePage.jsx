import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { Link, redirect, useLoaderData } from 'react-router-dom'
import client from './client.jsx'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage(){

    const navigate = useNavigate();
    const {register, handleSubmit, reset, formState:{errors}} = useForm();
    const [editing, setEditing] = useState(false);

    const editClick = () =>{
        setEditing(true);
    }

    const data = useLoaderData();
    console.log(data);

    return (
        <>
            {!editing && 
                <div className="container-fluid">
                    <label className="mt-1">
                        Nama : <input type="text" disabled name="" value={"a"} id="" />
                    </label>
                    <br />
                    <label className="mt-1">
                        Email :
                    </label>
                    <br />
                    <label className="mt-1">
                        No. Handphone :
                    </label>
                    <br />
                    <label className="mt-1">
                        Kota :
                    </label>
                    <br />
                    <label className="mt-1">
                        Password
                    </label>
                    <br />
                    <button className="btn btn-success rounded" onClick={()=>{editClick()}}>Edit</button>
                </div>
            }
            {editing && 
                <form onSubmit={handleSubmit()}>
                    <div className="form-group">
                        <label htmlFor="nama">Nama</label>
                        <input type="text" className="form-control" id="nama" placeholder="Nama" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" id="email" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="alamat">Alamat</label>
                        <input type="text" className="form-control" id="alamat" placeholder="Alamat" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nohp">Nomor HP</label>
                        <input type="text" className="form-control" id="nohp" placeholder="Nomor HP" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="text" className="form-control" id="password" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Konfirmasi Password</label>
                        <input type="text" className="form-control" id="password" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form> 
            }
        </>
    )
}