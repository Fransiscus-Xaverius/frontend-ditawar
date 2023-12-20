import { Navigate, useLoaderData } from "react-router-dom";
import client from "./client";
import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import location from "./assets/loc.png";
import { useNavigate } from "react-router-dom";
import { buyNowHandler } from "./Handler/AuctionRelatedHandler";

export default function AuctionPage() {
  let userToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const data = useLoaderData();
  const { register, handleSubmit, reset } = useForm();
  console.log("auction data", data);
  let item = data.itemdata;
  let auction = data.auctiondata;
  let user = data.userdata;
  let highest_bid = data.highest_bid;

  let url = import.meta.env.VITE_API_URL + "/static/" + item.images;
  let berakhir = new Date(data.auctiondata.tanggal_selesai);

  const [timer, setTimer] = useState("00:00:00");

  const getTimeRemaining = () => {
    const total = Date.parse(berakhir) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / 1000 / 60 / 60) % 24) + days * 24; // Add remaining days in hours
    // console.log(hours, minutes, seconds)
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = () => {
    // console.log(timer)
    let { total, hours, minutes, seconds } = getTimeRemaining();
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  useEffect(() => {
    const interval = setInterval(startTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  async function bidauction(formdata) {
    const data = {
      token: localStorage.getItem("token"),
      idAuction: auction._id,
      bid: formdata.nominal_bid,
    };
    try {
      const newBid = await client.post("/bid", data);
      console.log(newBid);
      alert("Bid berhasil!");
      navigate(0);
    } catch (err) {
      if (
        err.response &&
        (err.response.status === 400 || err.response.status === 500)
      ) {
        const errorMessage = err.response.data.msg;
        console.log("----------------");
        console.log(errorMessage);
        alert(errorMessage);
      } else {
        console.log(err);
        alert(err.message);
      }
      return;
    }

    // if(data.auction.highest_bid == null || data.auction.highest_bid == undefined){

    // const update = client.put('/auction', {
    //     token: localStorage.getItem("token"),
    //     id_auction: auction._id,
    //     starting_price: auction.starting_price,
    //     asking_price: auction.asking_price,
    //     tanggal_selesai: auction.tanggal_selesai,
    //     jam_selesai: auction.jam_selesai,
    //     kategori: auction.kategori_barang,
    //     kecamatan: auction.kecamatan,
    //     kota_kabupaten: auction.kota_kabupaten,
    //     provinsi: auction.provinsi,
    //     highest_bid: newBid.insertedId,
    // }).then((res)=>{
    //     console.log(res)
    //     alert("Bid berhasil!")
    //     window.location.reload();
    // }).catch((err)=>{
    //     console.log(err)
    //     alert(err)
    //     return;
    // })

    // }
    // else{

    // }
  }

  let Rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const date = new Date(auction.tanggal_mulai);

  const ubahAuctionHandler = async (data) => {
    const auction_status = await client.get('/auction?id=' + auction._id);
    if (auction_status.data.result.ended) {
      alert("Auction telah selesai!");
      return;
    }
    else{
      navigate("/edit/"+auction._id)
    }
  }

  const buyNowClick = async() => {
    const data = {
      token: localStorage.getItem("token"),
      idAuction: auction._id,
    };
    try {
      const newBid = await client.post("/buynow", data);
      console.log(newBid);
      alert("Buy Now berhasil!");
      navigate("/");
    } catch (err) {
      if (
        err.response &&
        (err.response.status === 400 || err.response.status === 500)
      ) {
        const errorMessage = err.response.data.msg;
        console.log("----------------");
        console.log(errorMessage);
        alert(errorMessage);
      } else {
        console.log(err);
        alert(err.message);
      }
      return;
    }
  };

  return (
    <>
      {console.log(auction)}
      <div className="container-fluid">
      {!userToken && <Navigate to={"/login"} />}
			{userToken == "admin" && <Navigate to={"/login"} />}
        <div className="row mt-5 mx-auto fontcustom">
          <div className="col-md-3 me-4">
            <div className="border rounded-4 text-center mx-auto mt-4 mt-md-0">
              <div className="text-white rounded-top-4 p-3" style={{backgroundColor: "#06083D"}}>
                <b>WAKTU SERVER</b>
              </div>
              <div className="mb-4 mt-4">
                <b> DIBUKA PADA </b>
                <br />
                {date.toLocaleString("default", { month: "long" }) +
                ", " +
                date.getDate() +
                " " +
                date.getFullYear() +
                " " +
                ("" + date.getHours()).padStart(2, "0") +
                ":" +
                ("" + date.getMinutes()).padStart(2, "0") +
                ":" +
                ("" + date.getSeconds()).padStart(2, "0")}{" "}
                <br />
                <br />
                <b> WAKTU BERAKHIR </b>
                <br />
                {timer}
              </div>
            </div>
          </div>

          <div className="col-12 col-md-8">
            <div className="row">
              <div
                className="col-12 col-md-8"
                style={{ marginTop: "auto", marginBottom: "auto" }}
              >
                <div className="d-flex align-items-center">
                  {auction.kategori_barang.split(",").map(kategori=>
                    (
                      <h6 className="p-2 ms-2" style={{textTransform: "uppercase", backgroundColor: "#CEF9D3", color: "#0C560B", borderRadius: "12px", width: "fit-content"}} key={kategori}>{kategori}</h6>
                  ))}
                </div>
                <div className="h3 ms-2">{item.nama}</div>
                <p className="text-secondary mb-4">
                  <img src={location} alt="" style={{width: "25px", height: "25px"}}/>
                  {auction.kecamatan}, {auction.kota_kabupaten},{" "}
                  {auction.provinsi}
                </p>
                <p className="text-secondary mb-0">
                    Mulai dari : {Rupiah.format(auction.starting_price)}
                </p>
                <h2>
                  Penawaran Tertinggi :{" "}
                  {highest_bid ? Rupiah.format(highest_bid.bid) : 0}
                </h2>
                <p className="text-secondary mb-0">
                    Beli Sekarang : {Rupiah.format(auction.asking_price)}
                </p>
                <div className="h3 mt-4 border-bottom pb-3"><b>DESCRIPTION</b></div>
                <div className="w-100 mt-3">{item.deskripsi}</div>
              </div>
              <div className="col-md-4 text-center">
                <img
                  src={url}
                  alt="Item Image"
                  className="border border-5 rounded-5 img-fluid"
                  style={{ maxHeight: "300px" }}
                />
              </div>
          
              

              {auction.nama_penjual == user.nama ? (
                <div className="col-sm-6 text-md-start pt-4">
                  <button
                    className="btn rounded-pill text-white p-3"
                    style={{ width: "170px" , backgroundColor: "#06083D", textTransform: "uppercase", float: "right"}}
                    onClick={() => {ubahAuctionHandler()}}
                  ><b>
                    Ubah
                  </b></button>
                </div>
              ) : (
                <div className="col-sm-12 mt-4">
                  <div className="row">
                    <div className="col-3 text-center">
                      <button
                        className="btn bg-danger rounded-pill text-white p-3"
                        style={{ width: "170px", textTransform: "uppercase" }}
                      ><b>
                        Laporkan
                      </b></button>
                    </div>
                    <div className="col-3 text-center">
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop1"
                        className="btn bg-primary rounded-pill text-white pt-3 pb-3"
                        style={{ width: "180px", textTransform: "uppercase" }}
                      ><b>
                        Masukkan Harga
                      </b></button>
                    </div>
                    {
                      highest_bid && auction.asking_price <= highest_bid.bid ?
                      <div className="col-3 text-center">
                        <button
                          disabled
                          className="btn bg-success rounded-pill text-white pt-3 pb-3"
                          style={{  width: "170px", textTransform: "uppercase" }}
                        ><b>
                          Beli Sekarang
                        </b></button>
                      </div>
                      :
                      <div className="col-3 text-center">
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop2"
                          className="btn bg-success rounded-pill text-white pt-3 pb-3"
                          style={{  width: "170px", textTransform: "uppercase" }}
                        ><b>
                          Beli Sekarang
                        </b></button>
                      </div>
                    }
                    
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className="modal fade fontcustom"
          id="staticBackdrop1"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Masukkan Bid
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={handleSubmit(bidauction)}>
                <div className="modal-body row">
                  <div className="text-center h2">{item.nama}</div>
                  <div className="text-center mb-5">
                    <img
                      src={url}
                      alt="Item Image"
                      className="border border-5 rounded-5"
                      style={{ maxHeight: "300px", maxWidth: "300px" }}
                    />{" "}
                    <br />
                    <h5>Highest Bid: {Rupiah.format(auction.highest_bid)}</h5>
                  </div>
                  <input
                    type="text"
                    {...register("nominal_bid")}
                    className="p-2 col-md-8 mx-auto"
                    placeholder="Masukkan Harga"
                  />
                  <button
                    type="submit"
                    className="btn bg-primary text-white col-md-3 mx-auto"
                  >
                    Ajukan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          className="modal fade fontcustom"
          id="staticBackdrop2"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Beli Sekarang
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
                <div className="modal-body row">
                  <div className="text-center h2">{item.nama}</div>
                  <div className="text-center mb-5">
                    <img
                      src={url}
                      alt="Item Image"
                      className="border border-5 rounded-5"
                      style={{ maxHeight: "300px", maxWidth: "300px" }}
                    />{" "}
                    <br />
                    <h5>Asking Price: {Rupiah.format(auction.asking_price)}</h5>
                    <h3>BUY NOW?</h3>
                  </div>
                  <button
                    className="btn bg-primary text-white col-md-3 mx-auto"
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={buyNowClick}
                  >
                    Yes
                  </button>
                  <button
                    className="btn bg-danger text-white col-md-3 mx-auto"
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Cancel
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
