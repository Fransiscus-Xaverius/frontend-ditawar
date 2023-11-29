import plus from "./assets/plus.png"
import location from "./assets/loc.png"


function CardAuction () {
    return (
        <>
            <div className="card mt-4" style={{width: "300px", borderRadius: "10px"}}>
                <img src={plus} alt="" className="card-img-top" style={{width: "50%", height: "50%"}}/>
                <div className="card-body">
                    <p className="card-title">Apartemen Gunawangsa Gubeng Surabaya</p>
                    <p className="card-text text-center"><b>IDR 300.000</b></p>
                    <p className="footer text-center text-body-secondary">
                        <img src={location} alt="" style={{width: "20px"}} className="me-2"/> Jakarta Selatan
                    </p>
                </div>
            </div>
        </>
    )
}

export default CardAuction