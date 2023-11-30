import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { Link, redirect, useLoaderData } from 'react-router-dom'
import client from './client.jsx'
import { useNavigate } from 'react-router-dom'
import plus from './assets/plus.png'

export default function ProfilePage(){

    const navigate = useNavigate();
    const {register, handleSubmit, reset, formState:{errors}} = useForm();
    const [editing, setEditing] = useState(false);

    const editClick = () =>{
        setEditing(true);
    }

    const data = useLoaderData();
    
    

    return (
        <>
            {!editing && 
                <div className="container">
                    <div className="d-flex" style={{marginTop: "5rem"}}>
                        <h2>Profile Diri</h2><br />
                        <button type="button" className="btn btn-primary ms-auto" onClick={()=>{editClick()}}>Edit</button>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-4 mt-3 mb-3 mb-sm-0">
                            <div className="card p-4" style={{height: "350px"}}>
                                <div className="card-body text-center rounded-4" style={{paddingTop: "100px", paddingBottom: "100px"}}>
                                    <img src={plus} alt="" style={{width: "50px", height: "50px"}}/> <br />
                                    <h3 className='mt-3' style={{color: "gray"}}>Upload Foto</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8 mt-3">
                            <div className="card p-3" style={{height: "100%"}}>
                                <div className="card-body">
                                    <form>
                                        <div className="d-flex align-items-center ">
                                            <label><b>Nama Lengkap </b></label>
                                            <input type="text" placeholder="Nama Lengkap" className="ps-3 border border-secondary-subtle ms-auto" value={"Gaby"} style={{borderRadius: "10px", height: "3rem", width: "60%"}}/> <br />
                                        </div>
                                        <div className="d-flex align-items-center mt-4">
                                            <label><b>Email</b></label>
                                        </div>
                                        <div className="d-flex align-items-center mt-4">
                                            <label><b>No. Handphone</b></label>
                                        </div>
                                        <div className="d-flex align-items-center mt-4">
                                            <label><b>Kota </b></label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <label className="mt-1">
                        Nama : <input type="text" disabled name="" value={"a"} id="" />
                    </label>
                    <br />
                    <label className="mt-1">
                        Email : <input type="text" disabled name="" value={data.email} id="" />
                    </label>
                    <br />
                    <label className="mt-1">
                        No. Handphone : <input type="text" disabled name="" value={data.phone} id="" />
                    </label>
                    <br />
                    <label className="mt-1">
                        Kota : <input type="text" disabled name="" value={data.city} id="" />
                    </label>
                    <br />
                    <label className="mt-1">
                        Password : <input type="password" disabled name="" id="" />
                    </label>
                    <br />
                    <button className="btn btn-success rounded" onClick={()=>{editClick()}}>Edit</button> */}
                </div>
            }
            {editing && 
            <div className="container">
                <div className="d-flex" style={{marginTop: "5rem"}}>
                    <h2>Profile Diri</h2><br />
                    <button type="button" className="btn btn-primary ms-auto" onSubmit={()=>{handleSubmit()}}>Simpan</button>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-4 mt-3 mb-3 mb-sm-0">
                        <div className="card p-4" style={{height: "350px"}}>
                            <div className="card-body p-0 text-center">
                                    <img src={plus} alt="" style={{width: "50px", height: "50px"}}/> <br />
                                    <h3 style={{color: "gray"}}>Upload Foto</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-8 mt-3">
                        <div className="card p-3" style={{height: "100%"}}>
                            <div className="card-body">
                                <form>
                                    <div className="d-flex align-items-center ">
                                        <label><b>Nama Lengkap </b></label>
                                        <input type="text" placeholder="Nama Lengkap" className="ps-3 border border-secondary-subtle ms-auto" style={{borderRadius: "10px", height: "3rem", width: "60%"}}/> <br />
                                    </div>
                                    <div className="d-flex align-items-center mt-4">
                                        <label><b>Email</b></label>
                                        <input type="text" placeholder="Email" className="ps-3 border border-secondary-subtle ms-auto" style={{borderRadius: "10px", height: "3rem", width: "60%"}}/> <br />
                                    </div>
                                    <div className="d-flex align-items-center mt-4">
                                        <label><b>No. Handphone</b></label>
                                        <input type="text" placeholder="No. Handphone" className="ps-3 border border-secondary-subtle ms-auto" style={{borderRadius: "10px", height: "3rem", width: "60%"}}/> <br />
                                    </div>
                                    <div className="d-flex align-items-center mt-4">
                                        <label><b>Kota </b></label>
                                        <input type="text" placeholder="Kota" className="ps-3 border border-secondary-subtle ms-auto" style={{borderRadius: "10px", height: "3rem", width: "60%"}}/> <br />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mt-4">
                    <div className="card-header text-center" style={{backgroundColor: "#06083D", color: "white"}}>
                        <h4>Ganti Password</h4>
                    </div>
                    <div className="card-body">
                        <div className="row justify-content-center text-center">
                            <div className="col-6 p-0">
                                <label><b>Password Baru </b></label>
                                <input type="text" className="mt-3 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", height: "3rem", width: "100%"}}/> <br />
                                <label><b>Konfirmasi Password </b></label><br />
                                <input type="text" className="mt-3 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", height: "3rem", width: "100%"}}/> <br />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

                // <form onSubmit={handleSubmit()}>
                //     <div className="form-group">
                //         <label htmlFor="nama">Nama</label>
                //         <input type="text" className="form-control" id="nama" placeholder="Nama" />
                //     </div>
                //     <div className="form-group">
                //         <label htmlFor="email">Email</label>
                //         <input type="text" className="form-control" id="email" placeholder="Email" />
                //     </div>
                //     <div className="form-group">
                //         <label htmlFor="alamat">Alamat</label>
                //         <input type="text" className="form-control" id="alamat" placeholder="Alamat" />
                //     </div>
                //     <div className="form-group">
                //         <label htmlFor="nohp">Nomor HP</label>
                //         <input type="text" className="form-control" id="nohp" placeholder="Nomor HP" />
                //     </div>
                //     <div className="form-group">
                //         <label htmlFor="password">Password</label>
                //         <input type="text" className="form-control" id="password" placeholder="Password" />
                //     </div>
                //     <div className="form-group">
                //         <label htmlFor="password">Konfirmasi Password</label>
                //         <input type="text" className="form-control" id="password" placeholder="Password" />
                //     </div>
                //     <button type="submit" className="btn btn-primary">Submit</button>
                // </form> 
            }
        </>
    )
}