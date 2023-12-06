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
                style={{ height: "30vh" }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <p className="card-title" style={{ fontSize: "35px" }}>
                  {props.item.nama}
                </p>
                <div className="row mb-3">
                  <div className="col-6">
                    <p className="card-text" style={{ fontSize: "20px" }}>
                      Starting at :{" "}
                      {Rupiah.format(props.auction.starting_price)}
                    </p>
                    <p className="card-text" style={{ fontSize: "20px" }}>
                      Buy it now : {Rupiah.format(props.auction.asking_price)}
                    </p>
                  </div>
                  <div className="col-6">
                    <img
                      src={location}
                      alt=""
                      style={{ width: "20px" }}
                      className="ms-2"
                    />
                    {props.auction.kecamatan},{props.auction.kota_kabupaten},
                    {props.auction.provinsi}
                  </div>
                </div>
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
