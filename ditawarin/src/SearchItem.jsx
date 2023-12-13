import location from "./assets/loc.png";
import { useNavigate } from "react-router-dom";
export default function SearchItem(props) {
  console.log(props);

  const navigate = useNavigate();

  let Rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const moveToAuction = () => {
    navigate("/listing/" + props.auction._id);
  };

  const url =
    import.meta.env.VITE_API_URL + "/static/" + props.item.images || "";

  return (
    <>
      <div
        className="container"
        onClick={() => {
          moveToAuction();
        }}
      >
        <div
          className="card mb-3 mt-4"
          style={{ minHeight: "30vh", width: "60vw" }}
        >
          <div className="row g-0">
            <div className="col-md-4 text-center">
              <img
                src={url}
                className="img-fluid rounded-start"
                style={{ height: "30vh"}}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <p className="card-title" style={{ fontSize: "35px" }}>
                  {props.item.nama}
                  </p>
                  <div className="d-flex align-items-center">
                    <img
                      src={location}
                      alt=""
                      style={{ width: "20px" , height: '20px'}}
                      className="me-2"
                    />
                    <p className="text-secondary mb-0">{props.auction.kecamatan}, {props.auction.kota_kabupaten}, {props.auction.provinsi}</p>
                  </div>                  
                </div>
                <p className="card-text mb-0" style={{ fontSize: "20px" }}>
                  Start :{" "}
                  {Rupiah.format(props.auction.starting_price)}
                </p>
                <p className="card-text" style={{ fontSize: "20px" }}>
                  Buy Now : {Rupiah.format(props.auction.asking_price)}
                </p>
                <p
                  className="card-text overflow-y-auto"
                  style={{ fontSize: "15px", maxHeight: "80px" }}
                >
                  {props.item.deskripsi}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
