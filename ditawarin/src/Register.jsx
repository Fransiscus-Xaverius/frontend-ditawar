import { useForm } from 'react-hook-form'
import flag from './assets/flag.svg'
import { Link } from 'react-router-dom'

function Register() {

    const {register, handleSubmit, reset} = useForm()

    async function signUp(data){
        
    }

    return(
        <>
            <div className="container">
                <h1 className="mb-4 text-center">Registration</h1>
                <form onSubmit={handleSubmit(signUp)}>
                    <div className="row">
                        <div className="col-6">
                            <label>Nama Lengkap </label><br />
                            <input type="text" {...register("namalengkap")} placeholder="Nama Lengkap" className="mb-3"/> <br />

                            <label>No. Handphone </label><br />
                            <input type="image" src={flag} alt="" style={{width: "10%", height: "10%"}}/>
                            <input type="text" {...register("nohp")} placeholder="No. Handphone" className="mb-3"/> <br />

                            <label>Password </label><br />
                            <input type="text" {...register("pass")} placeholder="Password" className="mb-3"/> <br />
                        </div>
                        <div className="col-6">
                            <label>Email </label><br />
                            <input type="text" {...register("email")} placeholder="Email" className="mb-3"/> <br />

                            <label>Kota </label><br />
                            <input type="text" {...register("kota")} placeholder="Kota" className="mb-3"/> <br />

                            <label>Konfirmasi Password </label><br />
                            <input type="text" {...register("confpass")} placeholder="confpass" className="mb-3"/>
                        </div>
                    </div>
                    <button type='submit'>Daftar</button>
                </form>
                <div>Sudah punya akun?  <Link to={"/login"}>Masuk Sini</Link> </div>
            </div>
        </>
    )
}

export default Register
