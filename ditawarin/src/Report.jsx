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
			<h1 className="text-center fs-1 mt-5">Apa yang terjadi?</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="text-center">
				<br />
				<textarea cols={100} rows={10} className="my-3 p-4" {...register("msg")} placeholder="Beritahu apa yang menjadi masalahmu"/>
				<br />
				<button
						type="submit"
						className="btn text-white p-2"
						style={{
							width: "130px",
							backgroundColor: "#06083D",
							textTransform: "uppercase",
							borderRadius: "10px",
						}}
					>
						<b>SEND</b>
				</button>
			</form>
		</div>
	);
}
