function Login() {
    return(
        <>
            <div className="container">
                <h1 className="mb-4">Hello, Welcome Back</h1>
                <form>
                    <label>Email </label><br />
                    <input type="text" name="email" placeholder="Email" className="mb-3"/> <br />

                    <label>Password </label><br />
                    <input type="text" name="pass" placeholder="Password" className="mb-3"/> <br />

                    <p>Lupa Password? <br />
                    Belum punya akun? Daftar Sini</p>
                    
                    <button>Masuk</button>
                </form>
            </div>
            
        </>
    )
}

export default Login;