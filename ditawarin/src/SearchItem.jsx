import plus from "./assets/plus.png"
import location from './assets/loc.png'
export default function SearchItem(props){
    return (
        <>
        <div className="container">
            <div className="card mb-3 mt-4" style={{height: "80vh", width: "70vw"}}>
                <div className="row g-0">
                    <div className="col-md-4 text-center">
                        <img src={plus} className="img-fluid rounded-start" style={{height: "80vh"}}/>
                    </div>
                    <div className="col-md-8">
                    <div className="card-body">
                        <p className="card-title" style={{fontSize: "35px"}}>Apartemen Gunawangsa</p>
                        <div className="row mb-3">
                            <div className="col-6">
                                <p className="card-text" style={{fontSize: "20px"}}>
                                    IDR
                                </p>
                            </div>
                            <div className="col-6">
                                <img src={location} alt="" style={{width: "20px"}} className="ms-2"/>
                            </div>
                        </div>
                        <p className="card-text" style={{fontSize: "15px"}}>
                            Description
                        </p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}