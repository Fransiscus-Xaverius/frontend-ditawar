import Logo from "./assets/logo.png";
import Jumbotron from "./assets/jumbo.jpg";
import Deal from "./assets/deal.png"
import New from "./assets/new.png";
import Disc from "./assets/discount.png";
import Popular from "./assets/popular.png";
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
    }else{
      divi.style.width = "100%"
    }
  }

  useEffect(()=>{
    expandDiv()
  },[lihat])

  return (
    <>
      {/* NAVBAR */}
      <div className="fontcustom">
      <div className="container">
        {/* JUMBO */}
        <div className="row mt-5 align-items-center">
          <div className="col-6 ">
            <h3><b>SELAMAT DATANG <br /> </b></h3>
            <p style={{fontSize: "25px"}}>Ditawarin fokus pada lelang berbasis online dimana siapapun bisa mengikuti lelang yang ada.</p>
          </div>
          <div className="col-6 text-center">
            <img src={Jumbotron} alt="" />
          </div>
        </div>
        

        {/* KATEGORI */}
        <h1 className="mb-4" style={{marginTop: "100px"}}><b>Categories</b></h1>
        <div className="d-flex justify-content-between">
          <div
            className="kategori_2 text-center pe-5 ps-5 pt-3 pb-3 me-5 align-items-center"
          >
            <img src={Deal} alt="" style={{ width: "5rem", height: "5rem" }} />{" "}
            <br />
            <h5 className="mt-3 mb-0">DEALS</h5>
          </div>
          <div
            className="kategori_2 text-center pe-5 ps-5 pt-3 pb-3 me-5 align-items-center"
          >
            <img src={New} alt="" style={{ width: "5rem", height: "5rem" }} />{" "}
            <br />
            <h5 className="mt-3 mb-0">NEW COLLECTIONS</h5>
          </div>
          <div
            className="kategori_3 text-center pe-5 ps-5 pt-3 pb-3 me-5 align-items-center"
          >
            <img
              src={Disc}
              alt=""
              style={{ width: "5rem", height: "5rem" }}
            />{" "}
            <br />
            <h5 className="mt-3 mb-0">PROMO</h5>
          </div>
          <div
            className="kategori_2 text-center pe-5 ps-5 pt-3 pb-3 me-5 align-items-center"
          >
            <img src={Popular} alt="" style={{ width: "5rem", height: "5rem" }} />{" "}
            <br />
            <h5 className="mt-3 mb-0">POPULAR COLLECTIONS</h5>
          </div>
        </div>
      </div>

        {/* DEALS */}
      <div className="container-fluid">
        <div className="row mt-5" style={{
                backgroundColor: "#06083D",              
              }}>
          <div className="col-2 ps-5">
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
          <div className="col-10 pe-5" style={{display:"flex"}}>
            
            <Scrollbars id="lihat" className="" color="white" autoHide autoHideTimeout={1000} autoHideDuration={200} thumbMinSize={30} universal={true} renderThumbHorizontal={({style, ...props}) =><div {...props} style={{...style, width: '3px', borderRadius: '4px', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.16)', backgroundColor: '#ffffff'}}/>} style={{ overflowY:"hidden", height:"90%", transitionDuration:"0.4s", alignSelf:"center"}}>
              <div className="d-flex flex-nowrap mb-0" style={{height: "99%"}}>
                {
                  datalihat.map((auction, idx) => (
                      <div className="card me-3" style={{minWidth: "250px", maxWidth:"250px", height:"98%", borderRadius: "10px"}} onClick={()=>{moveToAuction(auction._id)}}>
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
      </div>
      <div className="container">
        <h2 className="text-center mb-4"  style={{marginTop: "100px"}}>SHOP OUR COLLECTION</h2>
        <div className="row">
          {
            datatampil.length == 0 ?
            <div></div>
            :
            datatampil.map((auction, idx) => (
              <>
                
                <div className="col-4 px-4" key={idx}>
                  <CardAuction {...auction} />
                </div>
              </>
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
    </div>
    </>
  );
}

export default Home;
