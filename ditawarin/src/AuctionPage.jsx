import { useLoaderData } from "react-router-dom";
import client from "./client"
import {React, useEffect, useState} from "react";

export default function AuctionPage(){

    const data = useLoaderData();
    console.log(data.data.result);
    let item = data.data.result;
    let url =import.meta.env.VITE_API_URL+'/static/'+item.images;
    console.log(url);
    return (
        <>
            <div className="container-fluid p-5">
                <div className="row">
                    <h1>{item.nama}</h1>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="container-fluid d-flex">
                                <h4>{item.deskripsi}</h4>
                            </div>
                            <img src={url} alt="Item Image" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}