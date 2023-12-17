import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, redirect, useFetcher, useLoaderData } from "react-router-dom";
import client from "./client.jsx";
import { useNavigate } from "react-router-dom";
import plus from "./assets/plus.png";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

export default function ProfilePage() {
	let userToken = localStorage.getItem("token");
	const data = useLoaderData();
	const navigate = useNavigate();
	const fetcher = useFetcher();
	const [editing, setEditing] = useState(false);

	const Schema = Joi.object({
		_id: Joi.string(),
		nama: Joi.string().empty(),
		email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ["com", "id"] } })
			.empty(),
		phone: Joi.string().empty(),
		city: Joi.string().empty(),
		profile_picture: Joi.string().empty(),
		password: Joi.string().allow(null, ""),
		cpassword: Joi.string().valid(Joi.ref("password")),
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: joiResolver(Schema),
		values: {
			_id: data?._id,
			nama: data?.nama,
			email: data?.email,
			phone: data?.phone,
			city: data?.city,
		},
	});

	const editClick = () => {
		setEditing(true);
	};

	async function UpdateSubmit(Data) {
		const url = "http://localhost:3000/uploadFile"; //needs to be seen before hosting
		const formData = new FormData();
		formData.append("image", files);
		let image;
		try {
			const res = await fetch(url, {
				method: "POST",
				body: formData,
			})
				.then(function (a) {
					return a.json();
				})
				.then(function (json) {
					console.log(json);
					image = json.filename;
				});
		} catch (error) {
			alert("Gagal upload file");
			return;
		}

		if (image != undefined) {
			Data.profile_picture = image;
		} else {
			Data.profile_picture = data.profile_picture;
		}

		try {
			const user = await client.put("/user?id=" + Data._id, {
				nama: Data.nama,
				email: Data.email,
				phone: Data.phone,
				city: Data.city,
				profile_picture: Data.profile_picture,
				password: Data.password,
			});
		} catch (error) {
			console.log(error);
			alert(error);
		}

		try {
			const url2 = "/reload?id=" + Data._id;
			const response = await client.post(url2);
			console.log(response.data);
			if (response.status === 200) {
				console.log(response.data.user);
				localStorage.setItem("token", response.data.token);
				localStorage.setItem("user", response.data.user);
				alert("berhasil update");
				window.location.reload(true);
			}
		}
		catch (error) {
			console.log(error);
			alert(error);
		}
	}
	const [gambar, setGambar] = useState(0);
	const [files, setFiles] = useState("");
	const [preview, setPreview] = useState();

	function handleClick() {
		const element = document.getElementById("profile_picture");
		element.click();
	}
	function handleChange(e) {
		if (e.target.files[0] == undefined) {
			setFiles("");
			setGambar(0);
		} else {
			setFiles(e.target.files[0]);
			setGambar(1);
		}
	}

	useEffect(() => {
		if (!files) {
			setPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(files);
		setPreview(objectUrl);

		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl);
	}, [files]);

	return (
		<>
			{!userToken && <Navigate to={"/login"}/>}
            {userToken == "admin" && <Navigate to={"/login"}/>}
			{!editing && (
				<div className="container fontcustom">
					<div className="d-flex" style={{ marginTop: "5rem" }}>
						<h2>Profile Diri</h2>
						<br />
						<button
							type="button"
							className="btn btn-primary ms-auto"
							onClick={() => {
								editClick();
							}}
						>
							Edit
						</button>
					</div>
					<hr />
					<div className="row">
						<div className="col-sm-4 mt-3 mb-3 mb-sm-0">
							<div className="card p-4" style={{ height: "350px" }}>
								<div
									className="card-body text-center rounded-4"
									style={{ paddingTop: "100px", paddingBottom: "100px" }}
								>
									<img
										src={
											import.meta.env.VITE_API_URL +
											"/static/" +
											data.profile_picture
										}
										style={{ width: "50%", height: "50%" }}
									/>{" "}
									<br />
									<h3 className="mt-3" style={{ color: "gray" }}>
										Profile Picture
									</h3>
								</div>
							</div>
						</div>
						<div className="col-sm-8 mt-3">
							<div className="card p-3" style={{ height: "100%" }}>
								<div className="card-body">
									<form>
										<div className="d-flex align-items-center ">
											<label>
												<b>Nama Lengkap </b>
											</label>
											<input
												type="text"
												placeholder="Nama Lengkap"
												className="ps-3 border border-secondary-subtle ms-auto"
												{...register("nama")}
												style={{
													borderRadius: "10px",
													height: "3rem",
													width: "60%",
												}}
												disabled
											/>{" "}
											<br />
										</div>
										<div className="d-flex align-items-center mt-4">
											<label>
												<b>Email</b>
											</label>
											<input
												type="email"
												placeholder="Nama Lengkap"
												className="ps-3 border border-secondary-subtle ms-auto"
												{...register("email")}
												style={{
													borderRadius: "10px",
													height: "3rem",
													width: "60%",
												}}
												disabled
											/>{" "}
											<br />
										</div>
										<div className="d-flex align-items-center mt-4">
											<label>
												<b>No. Handphone</b>
											</label>
											<input
												type="text"
												placeholder="Nama Lengkap"
												className="ps-3 border border-secondary-subtle ms-auto"
												{...register("phone")}
												style={{
													borderRadius: "10px",
													height: "3rem",
													width: "60%",
												}}
												disabled
											/>{" "}
											<br />
										</div>
										<div className="d-flex align-items-center mt-4">
											<label>
												<b>Kota </b>
											</label>
											<input
												type="text"
												placeholder="Nama Lengkap"
												className="ps-3 border border-secondary-subtle ms-auto"
												{...register("city")}
												style={{
													borderRadius: "10px",
													height: "3rem",
													width: "60%",
												}}
												disabled
											/>{" "}
											<br />
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
			)}
			{
				editing && (
					<form onSubmit={handleSubmit(UpdateSubmit)}>
						<div className="container fontcustom">
							<div className="d-flex" style={{ marginTop: "5rem" }}>
								<h2>Profile Diri</h2>
								<br />
								<button
									type="submit"
									className="btn btn-primary ms-auto"
									name="_id"
									{...register("_id")}
								>
									Simpan
								</button>
							</div>
							<hr />
							<div className="row">
								<div className="col-sm-4 mt-3 mb-3 mb-sm-0">
									<div className="card p-4" style={{ height: "350px" }}>
										<div className="card-body p-0 text-center">
											{gambar == 0 ? (
												<>
													<div
														className="mx-auto border text-center pt-5 pb-5 rounded-4"
														style={{ width: "65%" }}
														onClick={handleClick}
													>
														<img src={plus} alt="" style={{ width: "30%" }} />
													</div>
												</>
											) : (
												<div>
													<div
														className="mx-auto border text-center pt-5 pb-5 rounded-4"
														style={{ width: "65%" }}
														onClick={handleClick}
													>
														<img src={preview} style={{ width: "50%" }} />
													</div>
												</div>
											)}
											<input
												type="file"
												style={{ display: "none" }}
												onChange={handleChange}
												name="profile_picture"
												id="profile_picture"
											/>
											{errors.files && (
												<p style={{ color: "red" }}>{errors.files.message}</p>
											)}
											<br />
											<label
												htmlFor="profile_picture"
												style={{ color: "gray" }}
											>
												Upload Foto
											</label>
										</div>
									</div>
								</div>
								<div className="col-sm-8 mt-3">
									<div className="card p-3" style={{ height: "100%" }}>
										<div className="card-body">
											<div className="d-flex align-items-center ">
												<label>
													<b>Nama Lengkap </b>
												</label>
												<input
													type="text"
													placeholder="Nama Lengkap"
													className="ps-3 border border-secondary-subtle ms-auto"
													style={{
														borderRadius: "10px",
														height: "3rem",
														width: "60%",
													}}
													{...register("nama")}
												/>{" "}
												<br />
											</div>
											<div className="d-flex align-items-center mt-4">
												<label>
													<b>Email</b>
												</label>
												<input
													type="text"
													placeholder="Email"
													className="ps-3 border border-secondary-subtle ms-auto"
													style={{
														borderRadius: "10px",
														height: "3rem",
														width: "60%",
													}}
													{...register("email")}
												/>{" "}
												<br />
											</div>
											<div className="d-flex align-items-center mt-4">
												<label>
													<b>No. Handphone</b>
												</label>
												<input
													type="text"
													placeholder="No. Handphone"
													className="ps-3 border border-secondary-subtle ms-auto"
													style={{
														borderRadius: "10px",
														height: "3rem",
														width: "60%",
													}}
													{...register("phone")}
												/>{" "}
												<br />
											</div>
											<div className="d-flex align-items-center mt-4">
												<label>
													<b>Kota </b>
												</label>
												<input
													type="text"
													placeholder="Kota"
													className="ps-3 border border-secondary-subtle ms-auto"
													style={{
														borderRadius: "10px",
														height: "3rem",
														width: "60%",
													}}
													{...register("city")}
												/>{" "}
												<br />
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="card mt-4">
								<div
									className="card-header text-center"
									style={{ backgroundColor: "#06083D", color: "white" }}
								>
									<h4>Ganti Password</h4>
								</div>
								<div className="card-body">
									<div className="row justify-content-center text-center">
										<div className="col-6 p-0">
											<label>
												<b>Password Baru </b>
											</label>
											<input
												type="text"
												className="mt-3 mb-3 ps-3 border border-secondary-subtle"
												style={{
													borderRadius: "10px",
													height: "3rem",
													width: "100%",
												}}
												{...register("password")}
											/>{" "}
											<br />
											<label>
												<b>Konfirmasi Password </b>
											</label>
											<br />
											<input
												type="text"
												className="mt-3 mb-3 ps-3 border border-secondary-subtle"
												style={{
													borderRadius: "10px",
													height: "3rem",
													width: "100%",
												}}
												{...register("cpassword")}
											/>{" "}
											<br />
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
				)

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
	);
}
