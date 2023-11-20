import flag from './assets/flag.svg'

function Register() {
    return(
        <>
            <div className="container">
                <h1 className="mb-4 text-center">Registration</h1>
                <form>
                    <div className="row">
                        <div className="col-6">
                            <label>Nama Lengkap </label><br />
                            <input type="text" name="namalengkap" placeholder="Nama Lengkap" className="mb-3"/> <br />

                            <label>No. Handphone </label><br />
                            <input type="image" src={flag} alt="" style={{width: "10%", height: "10%"}}/>
                            <input type="text" name="nohp" placeholder="No. Handphone" className="mb-3"/> <br />

                            <label>Password </label><br />
                            <input type="text" name="pass" placeholder="Password" className="mb-3"/> <br />
                        </div>
                        <div className="col-6">
                            <label>Email </label><br />
                            <input type="text" name="email" placeholder="Email" className="mb-3"/> <br />

                            <label>Kota </label><br />
                            <input type="text" name="kota" placeholder="Kota" className="mb-3"/> <br />

                            <label>Konfirmasi Password </label><br />
                            <input type="text" name="confpass" placeholder="confpass" className="mb-3"/>
                        </div>
                    </div>

                    
                    
                    <button>Daftar</button>
                </form>
            </div>
        </>
    )
}

export default Register