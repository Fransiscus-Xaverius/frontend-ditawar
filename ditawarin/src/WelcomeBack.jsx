import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function WelcomeBack(){
    
    const navigate = useNavigate('/');

    const [time, setTime] = useState(0);

    setInterval(
        ()=>{setTime(time+1)}, 1000
    )

    useEffect(()=>{
        if(time===5){
            navigate('/');
        }
    },[time])
    
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center">
            <h1>Welcome back!</h1>
        </div>
    )
}