import plus from "./assets/plus.png"
import location from "./assets/loc.png"
import { useNavigate } from "react-router-dom"

function CardAuction (props) {

    const navigate = useNavigate();


    const moveToAuction = () => {
        navigate('/listing/'+props._id);
    }

    console.log(props)
    let Rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    });
    let url =import.meta.env.VITE_API_URL+'/static/'+props.item.images || "";
    return (
        <>
            <div className="card mt-4" style={{width: "300px", borderRadius: "10px"}} onClick={()=>{moveToAuction()}}>
                <img src={url} alt="" className="card-img-top" style={{width: "100%", height: "50%"}}/>
                <div className="card-body">
                    <p className="card-title tex"><h4><b>{props.item.nama}</b></h4></p>
                    <p className="card-text text-center"><b>{Rupiah.format(props.starting_price)}</b></p>
                    <p className="footer text-center text-body-secondary">
                        <img src={location} alt="" style={{width: "20px"}} className="me-2"/> {props.kecamatan}, {props.kota_kabupaten}, {props.provinsi}, {props.item.negara}   
                    </p>
                </div>
            </div>
        </>
    )
}

export default CardAuction