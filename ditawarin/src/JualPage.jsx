import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form'
import { Link, redirect } from 'react-router-dom'
import simbolPlus from './assets/plus.png'
import client from './client.jsx'
import { useNavigate } from 'react-router-dom'

export default function JualPage() {

    const {register, handleSubmit, reset, formState:{errors}} = useForm();
    const navigate = useNavigate();
    const [gambar, setGambar] = useState(0);
    const [files, setFiles] = useState("");
    const [preview, setPreview] = useState()

    async function addItem(data){
        let kate = "";
        for (let i = 0; i < data.kategori.length; i++) {
            if (i == data.kategori.length - 1) {
                kate = kate + data.kategori[i]
            }else{
                kate = kate + data.kategori[i] + ", "
            }
        }
        if(data.starting_price > data.asking_price){
            alert("Starting price tidak boleh lebih besar dari asking price")
            return
        }
        const url = 'http://localhost:3000/uploadFile';
        const formData = new FormData();
        let kategori = kate; //simpan kategori format = <namakategori>,<namakategori>,<namakategori>
        console.log(files)
        console.log(data);
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
                    jam_selesai: data.jam_selesai,
                    kategori: kategori.toLowerCase()
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

    function handleClick(){
        const element = document.getElementById('files');
        element.click()
    }
    function handleChange(e){
        if (e.target.files[0] == undefined) {
            setFiles("")
            setGambar(0)
        }else{
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
            <div className='container'>
                <h1 className='mt-4'>Upload Produk</h1>
                <hr />
                <form className='row' onSubmit={handleSubmit(addItem)}>
                    <div className='col-md-6'>
                        <input type="text" {...register("namabarang", {required:{value:true, message:"Nama Barang wajib diisi"}})} placeholder="Nama Produk*" className="mt-1 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/>
                        {errors.namabarang && <p style={{color: "red"}}>{errors.namabarang.message}</p>}
                        <br />
                        <input type="text" {...register("starting_price", {required:{value:true, message:"Starting Price wajib diisi"}})} placeholder="Starting Price*" className="mt-1 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/>
                        {errors.starting_price && <p style={{color: "red"}}>{errors.starting_price.message}</p>}
                        <br />
                        <input type="text" {...register("asking_price", {required:{value:true, message:"Asking Price wajib diisi"}})} placeholder="Asking Price*" className="mt-1 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/>
                        {errors.asking_price && <p style={{color: "red"}}>{errors.asking_price.message}</p>}
                        <br />
                        <textarea {...register("deskripsi", {required:{value:true, message:"Deskripsi Barang wajib diisi"}})} placeholder="Deskripsi Barang*" className="mt-1 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "10rem"}}></textarea>
                        {errors.namabarang && <p style={{color: "red"}}>{errors.namabarang.message}</p>}
                        <br />
                        Kategori <br />
                        <div className="row">
                            <div className="col-md-6">
                                <input type="checkbox" style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Rumah Tangga"} id="" /><label htmlFor="" className="ms-4 h4">Rumah Tangga</label><br />
                                <input type="checkbox" style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Elektronik"} id="" /><label htmlFor="" className="ms-4 h4">Elektronik</label><br />
                                <input type="checkbox" style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Buku"} id="" /><label htmlFor="" className="ms-4 h4">Buku</label><br />
                                <input type="checkbox" style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Dapur"} id="" /><label htmlFor="" className="ms-4 h4">Dapur</label> <br />
                                <input type="checkbox" style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Fashion"} id="" /><label htmlFor="" className="ms-4 h4">Fashion</label> <br />
                                <input type="checkbox" style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Perhiasan"} id="" /><label htmlFor="" className="ms-4 h4">Perhiasan</label> <br />
                            </div>
                            <div className="col-md-6">
                                <input type="checkbox" style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Logam Mulia"} id="" /><label htmlFor="" className="ms-4 h4">Logam Mulia</label><br />
                                <input type="checkbox" style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Mainan & Hobi"} id="" /><label htmlFor="" className="ms-4 h4">Mainan & Hobi</label><br />
                                <input type="checkbox" style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Peralatan Olahraga"} id="" /><label htmlFor="" className="ms-4 h4">Peralatan Olahraga</label> <br />
                                <input type="checkbox" style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Otomotif"} id="" /><label htmlFor="" className="ms-4 h4">Otomotif</label> <br />
                                <input type="checkbox" style={{width:"17px", height:"17px"}} {...register("kategori")} value={"Properti"} id="" /><label htmlFor="" className="ms-4 h4">Properti</label> <br />
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
                                    <img src={simbolPlus} alt="" style={{width:"30%"}}/>
                                </div>
                            </>
                            :
                            <div>
                                <div className='mx-auto border text-center pt-5 pb-5 rounded-4' style={{width:"65%"}} onClick={handleClick}>
                                    <img src={preview} alt="" style={{width:"50%"}}/>
                                </div>
                            </div>
                        }
                        <input type="file" {...register("files", {required: "Wajib memberikan gambar barang"})} style={{display:"none"}} onChange={handleChange} name="files" id="files" />                                    
                        {errors.files && <p style={{color: "red"}}>{errors.files.message}</p>}
                        <button type="submit" className='btn bg-dark text-white mx-auto w-25 pt-3 pb-3 mt-4'>Add Item</button>
                    </div>
                </form>
            </div>
        </>
    );
}
