import { useLoaderData } from "react-router"
import client from "./client";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { required } from "joi";
export default function DetailsPage(){
    
    const data = useLoaderData();
    console.log(data)
    const purchase_data = data.purchase
    const auction_data = data.auction
    const buyer_data = data.buyer
    const seller_data = data.seller
    const item_data = data.item
    const role = data.role
    // console.log(purchase_data)
    // console.log(auction_data)
    // console.log(buyer_data)
    // console.log(seller_data)
    // console.log(item_data)

    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState:{errors}} = useForm();

    const userToken = localStorage.getItem("token");

    let url = import.meta.env.VITE_API_URL + "/static/" + item_data.images;

    const updatePurchase = async (data) => {
        console.log(data);
        const result = await client.post(`/purchase/update?id=${purchase_data._id}`, {
            token: userToken,
            update: data.update,
        });
        console.log(result.data);
        if(result.status == 201){
            alert("Update berhasil!")
            navigate(0)
        }
        else{
            alert("Terjadi kesalahan!")
        }
    }

    return (
        <>
            <h1>Purchase Details Page</h1>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4 m-3">
                        <div className="card mb-3 mt-4" style={{ minHeight: "75vh"}}>
                            <div className="row g-0">
                                <div className="col-md-10">
                                    <img src={url} className="img-fluid rounded-start" style={{ width: "75%" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">Item Data</h5>
                                        <p className="card-text" style={{fontSize:"30px"}}>{item_data.nama}</p>
                                        <p className="card-text">{item_data.deskripsi}</p>
                                        <p className="card-text"><small className="text-muted">{item_data.category}</small></p>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <h1>Transaction Details</h1>
                        <div className="scrollable-div" style={{ minHeight: "400px", maxHeight: "400px", overflowY: "scroll" }}>
                            {!purchase_data.history.length > 0 && <h1><p>Belum ada riwayat transaksi</p></h1>}
                            {purchase_data.history.length > 0 && purchase_data.history.map((item,index) => {
                                return (
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Test</h5>
                                            <p className="card-text">Test Deskripsi</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {role == "seller" && 
                            <form onSubmit={handleSubmit(updatePurchase)}>
                                Update: <br />
                                <textarea {...register("update", {required:{value:true, message:"Section Update wajib diisi"}})} placeholder="Update Transaksi*" className="mt-1 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "10rem"}}></textarea>
                                {errors.update && <p style={{color: "red"}}>{errors.update.message}</p>}
                                <br />
                                <input type="submit" className="btn btn-success" value="Update" />
                            </form>
                        }

                    </div>
                </div>
            </div>
        </>
    )     
    
}