import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import client from "./client";

export default function Report() {
    const user = useLoaderData()
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try{
			await client.post(`service?id_user=${user._id}&id_auction=${localStorage.getItem("auction")}`, {
				msg : data.msg,
			});
		}
		catch(error){
			alert(error);
		}
        navigate(-1)
    }

	return (
		<div className="fontcustom">
			<h1 className="text-center fs-1 mt-5">Laporkan</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="text-center">
				<label className="fs-2">Masalah</label>
				<br />
				<textarea cols={100} rows={10} className="my-3" {...register("msg")} />
				<br />
				<button
					type="submit"
					className="bg-primary rounded-1 border-0 fs-4 px-3"
				>
					SEND
				</button>
			</form>
		</div>
	);
}
