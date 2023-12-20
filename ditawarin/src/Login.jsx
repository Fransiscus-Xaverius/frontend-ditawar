import client from './client.jsx';
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import Logo from './assets/logo.png';
import { Link, NavLink } from "react-router-dom";
import Footer from './components/Footer.jsx';

function Login() {
    const {register, handleSubmit, formState:{errors}} = useForm()
    const navigate = useNavigate();

    async function signIn(data){
        if(data.email === "adminditawarin@gmail.com" && data.pass === "adminditawarin"){
            localStorage.setItem('token', "admin")
            navigate('/admin');
        }
        else{
            const url = '/login?email='+data.email+'&password='+data.pass
            try {
                const response = await client.post(url);
    
                if(response.status === 200){
                    console.log(response.data);  
                    
                    if(response.data.user.role == "unverified"){
                        localStorage.setItem("timer", 30)
                        localStorage.setItem("email", data.email);
                        localStorage.setItem("id_user", response.data.user._id)
                        navigate('/verification');

                    }else if(response.data.user.role == "banned"){
                        alert("Akun anda telah dibanned!")
                        
                    }else{

                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('user', response.data.user);
                        alert(`Selamat datang, ${response.data.user.nama}`)
                        navigate('/');
                    }

                    return
                }
            } catch (error) {
                
                console.log(error);
                alert('User belum terdaftar!');
            }
        }
    } 

    return(
        <>
            <nav className="p-0 fontcustom" style={{borderBottom: "1px solid gray"}}>
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
            <div className="container fontcustom">
                    <form onSubmit={handleSubmit(signIn)}>
                        <div className="row justify-content-center">
                            <div className="col-6 p-0">
                                <h1 className="mb-4 mt-4" style={{color: "#06083D"}}><b>Hello,<br /> Welcome Back</b></h1>
                                <label><b>Email </b></label><br />
                                <input type="text" {...register("email", {required:{value:true, message:"Email wajib diisi!"}})} placeholder="Email" className="mt-3 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "100%", height: "3rem"}}/> <br />
                                {errors.email && <p style={{color: "red"}}>{errors.email.message}</p>}
                                <label><b>Password </b></label><br />
                                <input type="password" {...register("pass", {required:{value:true, message:"Password wajib diisi!"}})} placeholder="Password" className="mt-3 mb-3 ps-3 border border-secondary-subtle" style={{borderRadius: "10px", width: "100%", height: "3rem"}}/> <br />
                                {errors.pass && <p style={{color: "red"}}>{errors.pass.message}</p>}
                                <button className="btn text-light mt-3 mb-3" type="submit" style={{width: '100%', backgroundColor: "#06083D"}}><b>MASUK</b></button>
                                
                                <div>Lupa Password?</div>
                                <div>Belum punya akun?  <Link to={"/register"}>Daftar Sini</Link> </div>
                            </div>
                        </div>            
                    </form>
            </div>
            <Footer />
        </>
    )
}

export default Login;
