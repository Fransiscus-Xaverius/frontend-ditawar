import Logo from "./assets/logo.png";
import Jumbotron from "./assets/jumbo.jpg";
import Tanah from "./assets/tanah.png";
import Rumah from "./assets/rumah.png";
import Ruko from "./assets/ruko.png";
import Pabrik from "./assets/pabrik.png";
import Mobil from "./assets/mobil.png";
import CardAuction from "./CardAuction";
import SearchItem from "./SearchItem";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import location from "./assets/loc.png"
import { Scrollbars } from "react-custom-scrollbars-2"

function Home() {
  const data = useLoaderData();
  console.log(data);
  const [datalihat, setDatalihat] = useState([])
  const [datatampil, setDatatampil] = useState([])

  const navigate = useNavigate();

  let Rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  });

  const moveToAuction = (id) => {
    navigate('/listing/'+id);
  }

  useEffect(()=>{
    let datalook = []
    let datasee = []
    if (data.length == 1) {
      setDatalihat(data)
      setDatatampil(data)
    }else{
      for (let i = 0; i < Math.ceil(data.length/2); i++) {
        datasee.push(data[i])
      }
      for (let i = Math.ceil(data.length/2); i < data.length; i++) {
        datalook.push(data[i])
      }
      console.log(datasee)
      console.log(datalook)
      setDatatampil(datasee)
      setDatalihat(datalook)
    }
  },[])

  useEffect(()=>{
    console.log(datalihat)
  },[datalihat])

  useEffect(()=>{
    console.log(datatampil.length)
  },[datatampil])

  const [lihat, setLihat] = useState(false)
  function look(){
    if (lihat == true) {
      setLihat(false)
    }else{
      setLihat(true)
    }
  }

  function expandDiv(){
    let divi = document.getElementById('lihat')
    if (lihat == false) {
      divi.style.width = "0px"
      // divi.style.overflowX = "hidden"
    }else{
      divi.style.width = "100%"
      // divi.style.overflowX = "auto"
    }
  }

  useEffect(()=>{
    expandDiv()
  },[lihat])

  return (
    <>
      {/* NAVBAR */}

      <div className="container">
        {/* JUMBO */}
        <div className="row justify-content-center">
          <div className="col-12 mt-5">
              <div className="card" style={{ width: "100%", height: "35rem",backgroundImage: `url(${Jumbotron})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", filter: `brightness(60%)`}}>
                <div className="card-img-overlay" style={{padding: "28rem 5rem"}}>
                  <h1 className="card-title text-light"><b>SELAMAT DATANG,</b></h1>
                  <p className="card-text text-light"><b>Ditawarin fokus pada lelang berbasis online dimana siapapun bisa mengikuti lelang yang ada.</b></p>
                </div>
              </div>
          </div>
        </div>
        

        {/* KATEGORI */}
        <h1 className="mt-5 mb-3"><b>Popular Categories</b></h1>
        <div className="d-flex justify-content-between">
          <div
            className="kategori_1 text-center pe-5 ps-5 pt-3 pb-3 me-5 mt-3 align-items-center"
            style={{ border: "1px solid gray", borderRadius: "12px" }}
          >
            <img src={Tanah} alt="" style={{ width: "5rem", height: "5rem" }} />{" "}
            <br />
            <h5 className="mt-3 mb-0">TANAH</h5>
          </div>
          <div
            className="kategori_2 text-center pe-5 ps-5 pt-3 pb-3 me-5 align-items-center"
            style={{ border: "1px solid gray", borderRadius: "12px" }}
          >
            <img src={Rumah} alt="" style={{ width: "5rem", height: "5rem" }} />{" "}
            <br />
            <h5 className="mt-3 mb-0">RUMAH</h5>
          </div>
          <div
            className="kategori_3 text-center pe-5 ps-5 pt-3 pb-3 me-5 align-items-center"
            style={{ border: "1px solid gray", borderRadius: "12px" }}
          >
            <img
              src={Pabrik}
              alt=""
              style={{ width: "5rem", height: "5rem" }}
            />{" "}
            <br />
            <h5 className="mt-3 mb-0">PABRIK</h5>
          </div>
          <div
            className="kategori_4 text-center pe-5 ps-5 pt-3 pb-3 me-5 align-items-center"
            style={{ border: "1px solid gray", borderRadius: "12px" }}
          >
            <img src={Ruko} alt="" style={{ width: "5rem", height: "5rem" }} />{" "}
            <br />
            <h5 className="mt-3 mb-0">RUKO</h5>
          </div>
          <div
            className="kategori_5 text-center pe-5 ps-5 pt-3 pb-3 align-items-center"
            style={{ border: "1px solid gray", borderRadius: "12px" }}
          >
            <img src={Mobil} alt="" style={{ width: "5rem", height: "5rem" }} />{" "}
            <br />
            <h5 className="mt-3 mb-0">MOBIL</h5>
          </div>
        </div>

        {/* DEALS */}
        <div className="row mt-5">
          <div className="col-2">
            <div
              className="rounded-5"
              style={{
                width: "30rem",
                backgroundColor: "#06083D",
                padding: "4rem 2rem",
              }}
            >
              <h1
                className="mb-2 text-light"
                style={{ letterSpacing: "8px", lineHeight: "150%" }}
              >
                DEALS <br />
                FOR <br />
                YOU
              </h1>
              <button
                type="button"
                className="btn btn-outline-light mt-3 "
                style={{ width: "35%" }}
                onClick={() => look()}
              >
                LIHAT
              </button>
            </div>   
          </div>
          <div className="col-10 container-fluid" style={{display:"flex"}}>
            <Scrollbars id="lihat" className="" autoHide autoHideTimeout={1000} autoHideDuration={200} thumbMinSize={30} universal={true} style={{ height:"90%", transitionDuration:"0.4s", alignSelf:"center"}}>
              <div className="d-flex flex-nowrap ps-5" style={{height: "100%"}}>
                {
                  datalihat.map((auction, idx) => (
                      <div className="card me-3" style={{minWidth: "250px", maxWidth:"250px", height:"100%", borderRadius: "10px"}} onClick={()=>{moveToAuction(auction._id)}}>
                          <img src={import.meta.env.VITE_API_URL+'/static/'+auction.item.images || ""} alt="" className="card-img-top mx-auto" style={{width: "100%", height:"50%"}}/>
                          <div className="card-body">
                              <p className="card-title text-center"><h4><b>{auction.item.nama}</b></h4></p>
                              <p className="card-text text-center"><b>{Rupiah.format(auction.starting_price)}</b></p>
                              <p className="footer text-center text-body-secondary">
                                  <img src={location} alt="" style={{width: "20px"}} className="me-2"/> {auction.kecamatan}, {auction.kota_kabupaten}, {auction.provinsi}, {auction.item.negara}   
                              </p>
                          </div>
                      </div>
                  ))
                }        
              </div>      
            </Scrollbars>
          </div>
        </div>
        <div className="row">
          {
            datatampil.length == 0 ?
            <div></div>
            :
            datatampil.map((auction, idx) => (
              <div className="col-4" key={idx}>
                <CardAuction {...auction} />
              </div>
            ))
          }
        </div>
        {/* {chunked.map((chunk, idx) => (
          <div className="row" key={idx}>
            {chunk.map((auction, i) => (
              <div className="col-4" key={i}>
                <CardAuction {...auction} />
              </div>
            ))}
          </div>
        ))} */}
      </div>
    </>
  );
}

export default Home;
