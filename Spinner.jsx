import React, {useState,useEffect}from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({path = "login"}) => {
    const [count , setCount] = useState(3)
    const navigate = useNavigate()
    const location =  useLocation()

    useEffect(()=> {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue)
        },1000)
        count === 0 && navigate(`/${path}`,{
        state: location.pathname});
        return () => clearInterval(interval)
        
    }, [count,navigate,location, path])
    return (
        <button type="button" class="items-center bg-indigo-500 ..." disabled>
            <h1 className="Text-center">Redirecting yo you in {count} second</h1>
            <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                !-- ... --
            </svg>
            Processing...
        </button>
    )
}

export default Spinner;