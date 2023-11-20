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
            alert("User not found");
            return;
        }
        if (response.msg === "Please enter all fields") {
            alert("All field required");
            return;
        }
        if (response.status === 500) {
            alert("Internal server error");
            return;
        }
        if(response.status === 200){
            alert("Welcome back, "+data.username+"!")
            navigate('/');
        }
    } 

    return(
        <>
            <div className="container">
                <h1 className="mb-4">Hello, Welcome Back</h1>
                <form onSubmit={handleSubmit(signIn)}>
                    <label>Email </label><br />
                    <input type="text" placeholder="Email" {...register("email")} className="mb-3"/> <br />
                    <label>Password </label><br />
                    <input type="text" placeholder="Password" {...register("pass")} className="mb-3"/> <br />
                    <button type='submit'>Masuk</button>                    
                </form>
                <div>Lupa Password?</div>
                <div>Belum punya akun?  <Link to={"/register"}>Daftar Sini</Link> </div>
            </div>
            
        </>
    )
}

export default Login;
