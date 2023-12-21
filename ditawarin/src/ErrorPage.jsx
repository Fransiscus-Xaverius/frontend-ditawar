import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function ErrorPage() {
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 text-center w-full h-screen items-center gap-y-4" style={{marginTop: "20vh"}}>
                        <p style={{fontSize: "100px"}}><b>Oops!</b></p>
                        <p style={{color: "gray"}}><b>The page you are looking for might be removed or temporarily unavailable</b></p>
                        <button type="button" className="btn" style={{backgroundColor: "#06083D", color: "white", borderRadius: "20px", width: "120px"}}
                        onClick={
                            ()=>{
                                window.location.href = "/"
                            }
                        }
                        >Kembali</button>
                    </div>
                </div>
            </div>
           
        </>
    );
}

export default ErrorPage