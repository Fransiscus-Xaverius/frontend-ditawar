import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form'
import { Link, Navigate, redirect, useLoaderData } from 'react-router-dom'
import simbolPlus from './assets/plus.png'
import client from './client.jsx'
import { useNavigate } from 'react-router-dom'

export default function UpdatePage() {
    let userToken = localStorage.getItem("token");
    const navigate = useNavigate();
    const [gambar, setGambar] = useState(0);
    const [files, setFiles] = useState("");
    const [preview, setPreview] = useState()
    const data = useLoaderData();
    const { register, handleSubmit, reset, formState:{errors}} = useForm();
    console.log("auction data", data);
    let item = data.itemdata;
    let auction = data.auctiondata;
    let user = data.userdata;
    let highest_bid = data.highest_bid;

    let url = import.meta.env.VITE_API_URL + "/static/" + item.images;
    let katego = auction.kategori;

    async function updateItem(data){
        let kate = "";
        for (let i = 0; i < data.kategori.length; i++) {
            if (i == data.kategori.length - 1) {
                kate = kate + data.kategori[i]
            }else{
                kate = kate + data.kategori[i] + ", "
            }
        }
        if(parseInt(data.starting_price) > parseInt(data.asking_price)){
            alert("Starting price tidak boleh lebih besar dari asking price")
            return
        }
        const url = 'http://localhost:3000/uploadFile'; //needs to be seen before hosting
        const formData = new FormData();
        let kategori = kate; //simpan kategori format = <namakategori>,<namakategori>,<namakategori>
        console.log(files)
        console.log(data);
        let url2;
        if (gambar == 1) {
            formData.append('image', files);
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
            url2 = '/editItem?token='+localStorage.getItem('token')+'&id_item='+item._id+'&nama='+data.namabarang+'&deskripsi='+data.deskripsi+'&images='+image;
        }else{
            url2 = '/editItem?token='+localStorage.getItem('token')+'&id_item='+item._id+'&nama='+data.namabarang+'&deskripsi='+data.deskripsi+'&images='+item.images;
        }
        let item_id;
        try {
            const res2 = await client.put(url2);
            console.log(res2);
            console.log(data.tanggal_selesai)
            try {
                const url3 = '/auction?token='+localStorage.getItem('token')+'&id_auction='+auction._id+'&starting_price='+data.starting_price+'&asking_price='+data.starting_price+'&tanggal_selesai='+data.tanggal_selesai+'&jam_selesai='+data.jam_selesai+'&kategori='+kategori.toLowerCase()+'&kecamatan='+data.kecamatan+'&kota_kabupaten='+data.kota_kabupaten+'&provinsi='+data.provinsi+'&highest_bid='+auction.highest_bid;
                const res3 = await client.put(url3);
                console.log("respond 3");
                console.log(res3);
                navigate('/listing/'+auction._id);
            } catch (error) {
                alert('Gagal edit auction');
                console.log(error);
            }
        } catch (error) {
            alert("Gagal edit item");
            console.log(error);
            return
        }
        console.log(gambar)
    }

    function handleClick(){
        const element = document.getElementById('files');
        element.click()
    }
    function handleChange(e){
        if (e.target.files[0] == undefined) {
            setFiles("")
            setGambar(0)
        }else{
            console.log(e.target.files[0])
            setFiles(e.target.files[0]);
            setGambar(1)
        }
    }

    useEffect(() => {
        if (!files) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(files)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [files])

    return (
        <>
            {!userToken && <Navigate to={"/login"}/>}   
            {userToken == "admin" && <Navigate to={"/login"}/>}
            <div className='container'>
                <h1 className='mt-4'>Upload Produk</h1>
                <hr />
                <form className='row' onSubmit={handleSubmit(updateItem)}>
                    <div className='col-md-6'>
                        <input type="text" defaultValue={item.nama} {...register("namabarang", {required:{value:true, message:"Nama Barang wajib diisi"}})} placeholder="Nama Produk*" className="mt-1 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/>
                        {errors.namabarang && <p style={{color: "red"}}>{errors.namabarang.message}</p>}
                        <br />
                        <input type="number" defaultValue={auction.starting_price} {...register("starting_price", {required:{value:true, message:"Starting Price wajib diisi"}})} placeholder="Starting Price*" className="mt-1 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/>
                        {errors.starting_price && <p style={{color: "red"}}>{errors.starting_price.message}</p>}
                        <br />
                        <input type="number" defaultValue={auction.asking_price} {...register("asking_price", {required:{value:true, message:"Asking Price wajib diisi"}})} placeholder="Asking Price*" className="mt-1 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/>
                        {errors.asking_price && <p style={{color: "red"}}>{errors.asking_price.message}</p>}

                        <br />
                        <input type="text" defaultValue={auction.kecamatan} {...register("kecamatan", {required:{value:true, message:"Lokasi Kecamatan wajib diisi"}})} placeholder="Kecamatan*" className="mt-1 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/>
                        {errors.kecamatan && <p style={{color: "red"}}>{errors.kecamatan.message}</p>}
                        <br />
                        <input type="text" defaultValue={auction.kota_kabupaten} {...register("kota_kabupaten", {required:{value:true, message:"Lokasi Kota/Kabupaten wajib diisi"}})} placeholder="Kota/Kabupaten*" className="mt-1 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/>
                        {errors.kota_kabupaten && <p style={{color: "red"}}>{errors.kota_kabupaten.message}</p>}
                        <br />
                        <input type="text" defaultValue={auction.provinsi} {...register("provinsi", {required:{value:true, message:"Lokasi Provinsi wajib diisi"}})} placeholder="Pronvinsi*" className="mt-1 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/>
                        {errors.provinsi && <p style={{color: "red"}}>{errors.provinsi.message}</p>}
                        <br />
                        Kategori <br />
                        <div className="row">
                            <div className="col-md-6">
                                {auction.kategori_barang.includes("rumah tangga") ? 
                                <><input type="checkbox" defaultChecked={true} style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Rumah Tangga"} id="" /><label htmlFor="" className="ms-4 h4">Rumah Tangga</label><br /></>
                                :
                                <><input type="checkbox" style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Rumah Tangga"} id="" /><label htmlFor="" className="ms-4 h4">Rumah Tangga</label><br /></>}
                                {auction.kategori_barang.includes("elektronik") ?
                                <><input type="checkbox" defaultChecked={true} style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Elektronik"} id="" /><label htmlFor="" className="ms-4 h4">Elektronik</label><br /></>
                                :
                                <><input type="checkbox" style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Elektronik"} id="" /><label htmlFor="" className="ms-4 h4">Elektronik</label><br /></>
                                }
                                {auction.kategori_barang.includes("buku") ?
                                <><input type="checkbox" defaultChecked={true} style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Buku"} id="" /><label htmlFor="" className="ms-4 h4">Buku</label><br /></>
                                :
                                <><input type="checkbox" style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Buku"} id="" /><label htmlFor="" className="ms-4 h4">Buku</label><br /></>
                                }
                                {auction.kategori_barang.includes("dapur") ?
                                <><input type="checkbox" defaultChecked={true} style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Dapur"} id="" /><label htmlFor="" className="ms-4 h4">Dapur</label> <br /></>
                                :
                                <><input type="checkbox" style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Dapur"} id="" /><label htmlFor="" className="ms-4 h4">Dapur</label> <br /></>
                                }
                                {auction.kategori_barang.includes("fashion") ?
                                <><input type="checkbox" defaultChecked={true} style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Fashion"} id="" /><label htmlFor="" className="ms-4 h4">Fashion</label> <br /></>
                                :
                                <><input type="checkbox" style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Fashion"} id="" /><label htmlFor="" className="ms-4 h4">Fashion</label> <br /></>
                                }
                                {auction.kategori_barang.includes("perhiasan") ?
                                <><input type="checkbox" defaultChecked={true} style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Perhiasan"} id="" /><label htmlFor="" className="ms-4 h4">Perhiasan</label> <br /></>
                                :
                                <><input type="checkbox" style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Perhiasan"} id="" /><label htmlFor="" className="ms-4 h4">Perhiasan</label> <br /></>
                                }
                            </div>
                            <div className="col-md-6">
                                {auction.kategori_barang.includes("logam mulia") ?
                                <><input type="checkbox" defaultChecked={true} style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Logam Mulia"} id="" /><label htmlFor="" className="ms-4 h4">Logam Mulia</label><br /></>
                                :
                                <><input type="checkbox" style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Logam Mulia"} id="" /><label htmlFor="" className="ms-4 h4">Logam Mulia</label><br /></>
                                }
                                {auction.kategori_barang.includes("Mainan dan Hobi") ?
                                <><input type="checkbox" defaultChecked={true} style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Mainan dan Hobi"} id="" /><label htmlFor="" className="ms-4 h4">Mainan & Hobi</label><br /></>
                                :
                                <><input type="checkbox" style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Mainan dan Hobi"} id="" /><label htmlFor="" className="ms-4 h4">Mainan & Hobi</label><br /></>
                                }
                                {auction.kategori_barang.includes("peralatan olaharga") ?
                                <><input type="checkbox" defaultChecked={true} style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Peralatan Olahraga"} id="" /><label htmlFor="" className="ms-4 h4">Peralatan Olahraga</label> <br /></>
                                :
                                <><input type="checkbox" style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Peralatan Olahraga"} id="" /><label htmlFor="" className="ms-4 h4">Peralatan Olahraga</label> <br /></>                                
                                }
                                {auction.kategori_barang.includes("otomotif") ?
                                <><input type="checkbox" defaultChecked={true} style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Otomotif"} id="" /><label htmlFor="" className="ms-4 h4">Otomotif</label> <br /></>
                                :
                                <><input type="checkbox" style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Otomotif"} id="" /><label htmlFor="" className="ms-4 h4">Otomotif</label> <br /></>
                                }
                                {auction.kategori_barang.includes("properti") ?
                                <><input type="checkbox" defaultChecked={true} style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Properti"} id="" /><label htmlFor="" className="ms-4 h4">Properti</label> <br /></>
                                :
                                <><input type="checkbox" style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Properti"} id="" /><label htmlFor="" className="ms-4 h4">Properti</label> <br /></>
                                }
                            </div>
                        </div>
                        Ending Date <br /> <input {...register('tanggal_selesai', {required:"Wajib memberikan tanggal auction selesai"})} className='p-2 me-3' style={{width:"35%"}} type="date" name="tanggal_selesai" id="tanggal_selesai" /> <input {...register('jam_selesai', {required:"wajib memberikan jam auction selesai"})} className='p-2' style={{width:"35%"}} type="time" name="jam_selesai" id="jam_selesai" />
                        {errors.tanggal_selesai && <p style={{color: "red"}}>{errors.tanggal_selesai.message}</p>} {errors.jam_selesai && <p style={{color: "red"}}>{errors.jam_selesai.message}</p>}
                    </div>
                    <div className='col-md-6 text-center'>
                        {
                            gambar == 0 ?
                            <>
                                <div className='mx-auto border text-center pt-5 pb-5 rounded-4' style={{width:"65%"}} onClick={handleClick}>
                                    <img src={url} alt="" style={{width:"50%"}}/>
                                </div>
                            </>
                            :
                            <div>
                                <div className='mx-auto border text-center pt-5 pb-5 rounded-4' style={{width:"65%"}} onClick={handleClick}>
                                    <img src={preview} alt="" style={{width:"50%"}}/>
                                </div>
                            </div>
                        }
                        <input type="file" {...register("files")} style={{display:"none"}} onChange={handleChange} name="files" id="files" />                                    
                        {errors.files && <p style={{color: "red"}}>{errors.files.message}</p>}
                        <br />
                        <textarea defaultValue={item.deskripsi} {...register("deskripsi", {required:{value:true, message:"Deskripsi Barang wajib diisi"}})} placeholder="Deskripsi Barang*" className="mt-1 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "10rem"}}></textarea>
                        {errors.namabarang && <p style={{color: "red"}}>{errors.namabarang.message}</p>}
                        <button type="submit" className='btn bg-dark text-white mx-auto w-25 pt-3 pb-3 mt-4'>Edit Item</button>
                    </div>
                </form>
            </div>
        </>
    );
}
