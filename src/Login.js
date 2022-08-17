import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import GeoLocation from "./location";

const Login=(props)=>{

    const location = GeoLocation();
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

    const [user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    var config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }

    const submitForm=(e)=>{
        e.preventDefault();
        const sendData = {
            email:user.email,
            password:user.password,
            lat:location.coordinates.lat,
            lng:location.coordinates.lng
        }

        console.log(sendData);
        axios.post('http://localhost:8080/login-register-backend/login.php', sendData, config)
        .then((result)=>{
            console.log(result)
            if(result.data.Status === "200"){
                window.localStorage.setItem('email', result.data.email);
                window.localStorage.setItem('userName', (result.data.first_name + ' ' + result.data.last_name));
                //window.localStorage.setItem('location', (result.data.lat + ' ' + result.data.lng));
                navigate("/Dashboard");
            }
            else if (result.data.Status === "201"){
                window.localStorage.setItem('user_id', result.data.user_id);
                navigate("/Verification");
            }else{
                alert(result.data.message);
            }
        })
    }

    return(
       
        <div className="main-box">
            <form onSubmit={submitForm}>
                <div className="row">
                    <div className="col-md-12 text-center">Login Page</div>
                </div>
            
                <div className="row">
                <div className="col-md-6">Email:</div>
                    <div className="col-md-6">
                        <input type="email" name="email" className="form-control"
                        onChange={handleChange} value={user.email}
                        />
                    </div>
                </div>

                <div className="row">
                <div className="col-md-6">Password:</div>
                    <div className="col-md-6">
                        <input type="password" name="password" className="form-control"
                        onChange={handleChange} value={user.password}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 text-center">
                        <input type="submit" name="submit" value="Login" className="btn btn-success"/>
                    </div>
                </div>
            </form>
        </div>
        
    )
}

export default Login;