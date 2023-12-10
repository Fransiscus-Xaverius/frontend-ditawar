export default function PurchasePageItem(props) {
    console.log(props);
    const url = import.meta.env.VITE_API_URL + "/static/" + props.item.images || "";
    return (
        <div className="card mb-3 mt-4" style={{ minHeight: "30vh", width: "60vw" }}>
            <div className="row g-0">
                <div className="col-md-4 text-center pt-5">
                    <img src={url} className="img-fluid rounded-start" style={{ height: "30vh" }} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <p className="card-title" style={{ fontSize: "35px" }}>{props.item.nama}</p>
                        <div className="row mb-3">
                            <div className="col-6">
                                <p className="card-text" style={{ fontSize: "20px" }}>Buy at : aaa</p>
                            </div>
                            <div className="col-6">
                                <img src={location} alt="" style={{ width: "20px" }} className="ms-2" />aaa
                            </div>
                        </div>
                        <p className="card-text overflow-y-auto" style={{ fontSize: "15px", maxHeight: "80px" }}>aaa</p>
                        <button className="d-flex btn text-light mt-3 mb-3" type="submit" style={{ backgroundColor: "#06083D" }}>
                            <div className="d-flex align-items-center">
                                <b>Jam Pengajuan :</b>
                                <p className="ms-2 mb-0 text-bold">01:00:00</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}