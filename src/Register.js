import { useState, useEffect } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import GeoLocation from "./location";

const Register=(props)=>{
   
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
    const [data, setData] = useState({
        first_name:"",
        last_name:"",
        email:"",
        password:"",
        lat:"",
        lng:""
    })

    const handleChange=(e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }

    var config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }

    const submitForm=(e)=>{
        e.preventDefault();
        const sendData = {
            first_name:data.first_name,
            last_name:data.last_name,
            email:data.email,
            password:data.password,
            lat:location.coordinates.lat,
            lng:location.coordinates.lng
        }

        console.log(sendData);
        axios.post('http://localhost:8080/login-register-backend/addUser.php', sendData, config)
        .then((result)=>{
            if(result.data.Status === 'Invalid'){
                alert(result.data.message);
            }else{
                window.localStorage.setItem('email', data.email);
                window.localStorage.setItem('userName', (data.first_name + ' ' + data.last_name));
                alert(result.data.message);
                navigate('/Dashboard');
            }
        })
    }

    return( 
        <div className="main-box">
            <form onSubmit={submitForm}>
            <div className="row">
                <div className="col-md-12 text-center"><h1>Register</h1></div>
            </div>
            <div className="row">
                <div className="col-md-6">First Name</div>
                <div className="col-md-6">
                    <input type="text" name="first_name" className="form-control"
                        onChange={handleChange} value={data.first_name}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">Last Name</div>
                <div className="col-md-6">
                    <input type="text" name="last_name" className="form-control"
                        onChange={handleChange} value={data.last_name}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">Email</div>
                <div className="col-md-6">
                    <input type="email" name="email" className="form-control"
                        onChange={handleChange} value={data.email}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">Password</div>
                <div className="col-md-6">
                    <input type="password" name="password" className="form-control"
                        onChange={handleChange} value={data.password}
                    />
                </div>
            </div>
            
            <div className="row">
                <div className="col-md-12 text-center">
                    <input type="submit" name="submit" value="Register" className="btn btn-success"/>
                </div>
            </div>
            </form>
           {
            location.loaded ? JSON.stringify(location.coordinates.lat + " " + location.coordinates.lng) : "Location data not avaibiliy yet "
           }
        </div>
    )
}

export default Register;