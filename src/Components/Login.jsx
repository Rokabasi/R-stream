import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { render } from "@testing-library/react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Axios from "axios";


const Login = () => {
    
    const navigate = useNavigate()
    const clientId = '757010538260-arnh8a0826kpi72fdqcb08fsp7agceiq.apps.googleusercontent.com'  
    const [userData, setUserData] = useState([])
    const sendUserUrl = 'http://localhost:9000/users/auth'

    const onSubmitUser = (name,email) => {
        
        Axios.post(sendUserUrl,{
            name : name,
            email: email
        })
        .then(res => {console.log(res.data.user)
            sessionStorage.setItem('userid',res.data.user._id)
        })
        
    }
    const onSuccess = (res)=>{
        console.log(res);
        const userImage =res.profileObj.imageUrl;
        sessionStorage.setItem('accessToken', res.accessToken)
        sessionStorage.setItem('login', true)
        sessionStorage.setItem('profilImage',userImage)
        sessionStorage.setItem('user', res.profileObj.email)
        navigate('/main')
       
       onSubmitUser(res.profileObj.givenName,res.profileObj.email)
    }
    const onFaillure = (res)=>{
        navigate('/')
    }
    const accessToken = sessionStorage.getItem('accessToken')


    // useEffect(()=>{
    //     if(!accessToken){
    //         navigate('/')
    //     }
    // })
    
    return(
        <>
            <div className="login-content">
                <h2>Connexion</h2>
                <h3>Accéder à R Stream grâce à ton Compte Google </h3>
                <div>
                    <div className="login-button">
                    <GoogleLogin
                        clientId = {clientId}
                        render = { renderProps => (
                            <button className="btn-login" onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="fa-brands fa-google fa-2x"></i> <span>Select your Google account for login</span></button>
                        )}
                        buttonText = 'Select Google account'
                        onSuccess={onSuccess}
                        onFailure={onFaillure}
                        scope="https://www.googleapis.com/auth/youtube.force-ssl"
                    />
                    </div>
                </div>
            </div> 
            
        </>
    )
}

export default Login