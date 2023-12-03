import { useLoaderData } from "react-router-dom"

export default function WalletPage(){
    
    const data = useLoaderData();

    console.log(data);

    const Rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    });

    return (
        <>
            <h1>Detail Saldo</h1>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                            <p>Saldo Aktif</p>
                            <h1 style={{fontWeight:"bold"}}>{Rupiah.format(data.wallet.result.saldo)}</h1>
                            <p>Saldo Tertahan: {Rupiah.format(data.wallet.result.saldo_tertahan)}</p>
                    </div>
                </div>
            </div>
        </>
    )
}