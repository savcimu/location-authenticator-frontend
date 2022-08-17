import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Home=()=>{
    let navigate = useNavigate();
    const [userIn, setUserIn] = useState('');
        useEffect(()=>{
            var userIn = localStorage.getItem('userName');
            setUserIn(userIn);
        },
    [])
    if(userIn){
        navigate('/Dashboard');
    }
    return(
        <div>
            Home Page
        </div>
    )
}

export default Home;