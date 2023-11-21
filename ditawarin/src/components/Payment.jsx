import MasterCard from "../assets/mastercard.png";
import Paypal from "../assets/paypal.png";
import COD from "../assets/cod.png";
import Jumbotron from "../assets/jumbo.jpeg";

function Payment() {
	return (
		<>
			<div className="container">
				<h3 className="mt-3 mb-3">Pembayaran</h3>
				<hr />
				<form action="">
					<div className="row">
						<div className="col-6">
							<button
								className="bg-transparent border-1 rounded my-1 px-5"
								style={{ width: "300px", height: "70px" }}
							>
								<img
									src={MasterCard}
									className="float-start"
									style={{ width: "20%" }}
								/>
								<span className="fw-bold fs-4">Master Card</span>
							</button>
							<br />
							<button
								className="bg-transparent border-1 rounded my-1 px-5"
								style={{ width: "300px", height: "70px" }}
							>
								<img
									src={Paypal}
									className="float-start"
									style={{ width: "20%" }}
								/>
								<span className="fw-bold fs-4">Paypal</span>
							</button>
							<br />
							<button
								className="bg-transparent border-1 rounded my-1 px-5"
								style={{ width: "300px", height: "70px" }}
							>
								<img
									src={COD}
									className="float-start"
									style={{ width: "20%" }}
								/>
								<span className="fw-bold fs-4">C O D</span>
							</button>
							<br />
							<input type="checkbox" />
							<label className="ms-2">
								Saya setuju dengan S & K yang berlaku
							</label>
						</div>
						<div className="col-6">
							<img
								src={Jumbotron}
								alt=""
								style={{ width: "150px" }}
								className="mt-3"
							/>
							<p>
								PT Bank BNI (Persero) Tbk : T/B rumah LT 197 m2 SHM No
								366/Klampisngasem - Surabaya
							</p>
							<b>IDR 300.000.000</b>
						</div>

						<br />
					</div>
					<button className="mt-3 rounded-2 bg-primary" style={{ width: "100px", marginRight: "200px" }}>
						Bayar
					</button>
				</form>
			</div>
		</>
	);
}

export default Payment;
