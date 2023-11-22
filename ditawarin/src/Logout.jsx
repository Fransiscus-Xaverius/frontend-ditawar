import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Logout(){
    
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    useEffect(() => {
        logout()
        navigate("/login");
    }, []);

    return (
        <>
        </>
    )
}