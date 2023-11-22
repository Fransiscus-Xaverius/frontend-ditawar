import { Link } from 'react-router-dom';
import client from './client.jsx';
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom';

function Login() {
    const {register, handleSubmit, reset} = useForm()
    const navigate = useNavigate();

    async function signIn(data){
        const url = '/login?username='+data.username+'&password='+data.pass
        const response = await client.post(url);
        if (response.msg === "Invalid credentials") {
            alert("User tidak ditemukan");
            return;
        }
        if (response.msg === "Please enter all fields") {
            alert("Semua input wajib diisi");
            return;
        }
        if (response.status === 500) {
            alert("Internal server error");
            return;
        }
        if(response.status === 200){
            alert("Selamat Datang, "+data.username+"!")
            navigate('/');
        }
    } 

    return(
        <>
            <div className="container">
                    <h1 className="mb-4 text-center">Hello, Welcome Back</h1>
                    <form onSubmit={handleSubmit(signIn)}>
                        <div className="row justify-content-center">
                            <div className="col-6 p-0">
                                <label><b>Email </b></label><br />
                                <input type="text" {...register("email")} placeholder="Email" className="mt-3 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "100%", height: "3rem"}}/> <br />

                                <label><b>Password </b></label><br />
                                <input type="text" {...register("pass")} placeholder="Password" className="mt-3 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "100%", height: "3rem"}}/> <br />

                                <button className="btn btn-primary mt-3 mb-3" type="submit" style={{width: '100%'}}><b>MASUK</b></button>
                                
                                <div>Lupa Password?</div>
                                <div>Belum punya akun?  <Link to={"/register"}>Daftar Sini</Link> </div>
                            </div>
                        </div>            
                    </form>
            </div>
            
        </>
    )
}

export default Login;
