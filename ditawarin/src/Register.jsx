import { useForm } from 'react-hook-form'
import flag from './assets/flag.svg'
import { Link } from 'react-router-dom'
import client from './client.jsx'
import { useNavigate } from 'react-router-dom'

function Register() {

    const {register, handleSubmit, reset} = useForm()
    const navigate = useNavigate();

    async function signUp(data){
        if (data.pass != data.confpass) {
            alert("password dan confirm password tidak sama")
            return
        }
        const url = '/register?username='+data.username+'&name='+data.namalengkap+'&phone='+data.nohp+'&password='+data.pass+'&email='+data.email+'&city='+data.kota
        const response = await client.post(url);
        if(response.status === 200){
            alert("Berhasil mendaftar!")
            //todo: buat redirect ke login
            navigate('/login');
            return
        }
        if(response.status === 500){
            alert("Internal server error")
            return
        }
        if (response.msg === "Please enter all fields") {
            alert("Semua input wajib diisi")
        }
        if(response.msg === "User already exists"){
            alert("username tersebut sudah terdaftar!")
            return;
        }
    }

    return(
        <>
            <div className="container-sm">
                <div className="row justify-content-center">
                    <h1 className="mb-4 text-center" style={{color: "#1551C5"}}>Registration</h1>
                    <form onSubmit={handleSubmit(signUp)}>
                        <div className="row justify-content-center">
                            <div className="col-4">
                                <label><b>Nama Lengkap </b></label><br />
                                <input type="text" {...register("namalengkap")} placeholder="Nama Lengkap" className="mt-3 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/> <br />

                                <label><b>No. Handphone </b></label><br />
                                <div className="d-flex align-items-center">
                                    <input type="image" src={flag} alt="" style={{width: "10%", height: "10%"}} className='me-2'/>

                                    <input type="text" {...register("nohp")} placeholder="No. Handphone" className="mt-3 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "78%", height: "3rem"}}/> <br />
                                </div>

                                <label><b>Password </b></label><br />
                                <input type="text" {...register("pass")} placeholder="Password" className="mt-3 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/> <br />
                            </div>
                            <div className="col-4">
                                <label><b>Email </b></label><br />
                                <input type="text" {...register("email")} placeholder="Email" className="mt-3 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/> <br />

                                <label><b>Kota </b></label><br />
                                <input type="text" {...register("kota")} placeholder="Kota" className="mt-3 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/> <br />

                                <label><b>Konfirmasi Password </b></label><br />
                                <input type="text" {...register("confpass")} placeholder="Konfirmasi Password" className="mt-3 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "90%", height: "3rem"}}/>
                            </div>
                        </div>
                        
                    </form>
                    
                    <button className="btn btn-primary mt-3" type="submit" style={{width: '65%'}}><b>DAFTAR</b></button>
                    <div className='text-center'>Sudah punya akun?  <Link to={"/login"}>LOGIN</Link> </div>
                </div>
            </div>
        </>
    )
}

export default Register
