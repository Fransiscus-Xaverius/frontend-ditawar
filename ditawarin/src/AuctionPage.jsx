import { useLoaderData } from "react-router-dom";
import client from "./client"
import {React, useEffect, useState} from "react";

export default function AuctionPage(){

    const data = useLoaderData();
    console.log(data.data.result);
    let item = data.data.result;

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
                                <h1>{item.nama}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}