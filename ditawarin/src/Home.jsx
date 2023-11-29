import Logo from './assets/logo.png'
import Jumbotron from './assets/jumbo.jpeg'
import Tanah from './assets/tanah.png'
import Rumah from './assets/rumah.png'
import Ruko from './assets/ruko.png'
import Pabrik from './assets/pabrik.png'
import Mobil from './assets/mobil.png'
import CardAuction from "./CardAuction";

function Home(){

    

    return (
        <>
            {/* NAVBAR */}
            
        
            <div className="container">
                {/* JUMBO */}
                <div className="jumbotron text-center mt-5">
                    <img src={Jumbotron} alt="jumbo" style={{width: "100%", height: "30rem"}}/>
                </div>

                {/* KATEGORI */}
                <h1 className='mt-3 mb-3'>KATEGORI PILIHAN</h1>
                <div className="d-flex justify-content-center">
                    <div className="kategori_1 text-center pe-5 ps-5 pt-3 pb-3 me-5 align-items-center" style={{border: "1px solid gray", borderRadius: "12px"}}>
                        <img src={Tanah} alt="" style={{width: "5rem", height: "5rem"}}/> <br />
                        <h5 className='mt-3 mb-0'>TANAH</h5>
                    </div>
                    <div className="kategori_2 text-center pe-5 ps-5 pt-3 pb-3 me-5 align-items-center" style={{border: "1px solid gray", borderRadius: "12px"}}>
                        <img src={Rumah} alt="" style={{width: "5rem", height: "5rem"}}/> <br />
                        <h5 className='mt-3 mb-0'>RUMAH</h5>
                    </div>
                    <div className="kategori_3 text-center pe-5 ps-5 pt-3 pb-3 me-5 align-items-center" style={{border: "1px solid gray", borderRadius: "12px"}}>
                        <img src={Pabrik} alt="" style={{width: "5rem", height: "5rem"}}/> <br />
                        <h5 className='mt-3 mb-0'>PABRIK</h5>
                    </div>
                    <div className="kategori_4 text-center pe-5 ps-5 pt-3 pb-3 me-5 align-items-center" style={{border: "1px solid gray", borderRadius: "12px"}}>
                        <img src={Ruko} alt="" style={{width: "5rem", height: "5rem"}}/> <br />
                        <h5 className='mt-3 mb-0'>RUKO</h5>
                    </div>
                    <div className="kategori_5 text-center pe-5 ps-5 pt-3 pb-3 align-items-center" style={{border: "1px solid gray", borderRadius: "12px"}}>
                        <img src={Mobil} alt="" style={{width: "5rem", height: "5rem"}}/> <br />
                        <h5 className='mt-3 mb-0'>MOBIL</h5>
                    </div>
                </div>

                {/* DEALS */}
                <div className='row'>
                    <div className="rounded-5 col-2" style={{width: "30rem", backgroundColor: "#06083D", padding: "4rem 2rem", marginTop: "50px"}}>
                        <h1 className="mb-2 text-light" style={{letterSpacing: "8px", lineHeight: "150%"}}>
                            DEALS <br />
                            FOR <br />
                            YOU
                        </h1>
                        <button type="button" className="btn btn-outline-light mt-3 " style={{width: "35%"}}>LIHAT</button>
                    </div>
                    <div className='col-10'>
                        
                    </div>
                </div>

                
            </div>
        </>
    )
}

export default Home;