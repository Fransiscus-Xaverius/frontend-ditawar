import { useForm } from 'react-hook-form'
import flag from './assets/flag.svg'
import { Link, NavLink } from 'react-router-dom'
import client from './client.jsx'
import { useNavigate } from 'react-router-dom'
import Logo from './assets/logo.png'
import Footer from './components/Footer.jsx'

function Register() {

    const {register, handleSubmit, reset, formState:{errors}} = useForm()
    const navigate = useNavigate();

    async function signUp(data){
        if (data.pass != data.confpass) {
            errors.password.message = "password dan konfirmasi password harus sama";
            errors.confirm.message = "password dan konfirmasi password harus sama";
            return
        }
        const url = '/register?name='+data.namalengkap+'&phone='+data.nohp+'&password='+data.pass+'&email='+data.email+'&city='+data.kota+'&province='+data.provinsi+'&address='+data.alamat;
        try {
            const response = await client.post(url);
            if(response.status === 200){
                alert("Berhasil mendaftar!")
                //todo: buat redirect ke login
                navigate('/login');
                return
            }
        } catch (error) {
            if(error.response.status === 400){
                alert("Semua input wajib diisi")
                return
            }
            if(error.response.status === 409){
                alert("Email/Nomor HP tersebut sudah terdaftar")
                return
            }
            else if(error.response.status === 500){
                alert("Internal server error")
                return
            }
        }
    }

    return(
        <>
            <nav className="p-0" style={{borderBottom: "1px solid gray"}}>
                <div className="container-fluid"  style={{ backgroundColor: "#06083D" }}>
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to="/"><img src={Logo} alt="" style={{width: "15%", height: "15%"}}/></Link>
                        <div className="d-flex align-items-center">
                        <NavLink type="button" className="btn btn-outline-light me-3" to="/login">Masuk</NavLink>
                        <NavLink type="button" className="btn btn-outline-light" to="/register">Daftar</NavLink>
                    </div>
                 </div>
                </div>
            </nav>
            <div className="container-sm">
                <div className="row justify-content-center">
                    <h1 className="mt-4 mb-4 text-center" style={{color: "#06083D"}}><b>Registration</b></h1>
                    <form onSubmit={handleSubmit(signUp)}>
                        <div className="row justify-content-center">
                            <div className="col-4">
                                <label><b>Nama Lengkap </b></label><br />
                                <input type="text" {...register("namalengkap", {required:{value:true, message:"Nama Lengkap wajib diisi"}})} placeholder="Nama Lengkap" className="mt-3 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/> <br />
                                {errors.namalengkap && <p style={{color: "red"}}>{errors.namalengkap.message}</p>}
                                <label><b>Email </b></label><br />
                                <input type="text" {...register("email", {required:{value:true, message:"Email wajib diisi"}})} placeholder="Email" className="mt-3 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/> <br />
                                {errors.email && <p style={{color: "red"}}>{errors.email.message}</p>}
                                <label><b>No. Handphone </b></label><br />
                                <div className="d-flex align-items-center">
                                    <input type="image" src={flag} alt="" style={{width: "10%", height: "10%"}} className='me-2'/>

                                    <input type="text" {...register("nohp", {required:{value:true, message:"Nomor HP wajib diisi"}})} placeholder="No. Handphone" className="mt-3 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "78%", height: "3rem"}}/> <br />
                                </div>
                                {errors.nohp && <p style={{color: "red"}}>{errors.nohp.message}</p>}
                                <label><b>Password </b></label><br />
                                <input type="password" {...register("pass", {required:{value:true, message:"Password wajib diisi"}})} placeholder="Password" className="mt-3 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/> <br />
                                {errors.pass && <p style={{color: "red"}}>{errors.pass.message}</p>}
                            </div>
                            <div className="col-4">
                                <label><b>Alamat </b></label><br />
                                <input type="text" {...register("alamat", {required:{value:true, message:"Kota wajib diisi"}})} placeholder="Kota" className="mt-3 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/> <br />
                                {errors.alamat && <p style={{color: "red"}}>{errors.alamat.message}</p>}
                                <label><b>Kota </b></label><br />
                                <input type="text" {...register("kota", {required:{value:true, message:"Kota wajib diisi"}})} placeholder="Kota" className="mt-3 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/> <br />
                                {errors.kota && <p style={{color: "red"}}>{errors.kota.message}</p>}
                                <label><b>Provinsi </b></label><br />
                                <input type="text" {...register("provinsi", {required:{value:true, message:"Kota wajib diisi"}})} placeholder="Kota" className="mt-3 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/> <br />
                                {errors.provinsi && <p style={{color: "red"}}>{errors.provinsi.message}</p>}
                                <label><b>Konfirmasi Password </b></label><br />
                                <input type="password" {...register("confpass", {required:{value:true, message:"Konfirmasi Password wajib diisi"}})} placeholder="Konfirmasi Password" className="mt-3 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/>
                                {errors.confpass && <p style={{color: "red"}}>{errors.confpass.message}</p>}
                            </div>
                            <button className="btn text-light mt-3" type="submit" style={{width: '65%', backgroundColor: "#06083D"}}><b>DAFTAR</b></button>
                        </div>
                    </form>
                    <div className='text-center'>Sudah punya akun?  <Link to={"/login"}>LOGIN</Link> </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Register
