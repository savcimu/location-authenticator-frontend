import { useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Verification=()=>{
    let navigate = useNavigate();
    const [verification, setVerification] = useState("")

    const [userId, setUserId] = useState('');
        useEffect(()=>{
            var userId = localStorage.getItem('user_id');
            setUserId(userId);
        },
    [])
    const [userIn, setUserIn] = useState('');
        useEffect(()=>{
            var userIn = localStorage.getItem('userName');
            setUserIn(userIn);
        },
    [])

    if(userIn){
        navigate('/Dashboard');
    }

    const handleChange=(e)=>{
        setVerification(e.target.value);
    }
    var config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }
    const submitForm=(e)=>{
        e.preventDefault();
        const sendData = {
            code:verification,
            user_id:userId
        }
        console.log(sendData);
        axios.post('http://localhost:8080/login-register-backend/verification.php', sendData, config)
        .then((result)=>{
            console.log(result)
            if(result.data.Status === "200"){
                window.localStorage.setItem('email', result.data.email);
                window.localStorage.setItem('userName', (result.data.first_name + ' ' + result.data.last_name));
                alert(result.data.message);
                navigate("/Dashboard");
            }
            else{
                alert(result.data.message);
            }
        })

    }

    return(
        <div className="main-box">
            <form onSubmit={submitForm}>
                <div className="row">
                    <div className="col-md-12 text-center">Verification Page</div>
                </div>
            
                <div className="row">
                <div className="col-md-6">Code:</div>
                    <div className="col-md-6">
                        <input type="text" name="verification" className="form-control"
                        onChange={handleChange} value={verification.code} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 text-center">
                        <input type="submit" name="submit" value="Confirm" className="btn btn-success"/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Verification;