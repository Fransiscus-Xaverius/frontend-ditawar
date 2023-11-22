import { Link } from 'react-router-dom';
import client from './client.jsx';
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom';

function Login() {
    const {register, handleSubmit, reset, formState:{errors}} = useForm()
    const navigate = useNavigate();

    async function signIn(data){
        const url = '/login?email='+data.email+'&password='+data.pass
        try {
            const response = await client.post(url);

            if(response.status === 200){
                console.log(response.data);   
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', response.data.user);
                alert(`Selamat datang, ${response.data.user.nama}`)
                
                navigate('/');
                return
            }
        } catch (error) {
            console.log(error);
            alert('kontol');
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
                                <input type="text" {...register("email", {required:{value:true, message:"Email wajib diisi!"}})} placeholder="Email" className="mt-3 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "100%", height: "3rem"}}/> <br />
                                {errors.email && <p style={{color: "red"}}>{errors.email.message}</p>}
                                <label><b>Password </b></label><br />
                                <input type="password" {...register("pass", {required:{value:true, message:"Password wajib diisi!"}})} placeholder="Password" className="mt-3 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "100%", height: "3rem"}}/> <br />
                                {errors.pass && <p style={{color: "red"}}>{errors.pass.message}</p>}
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
