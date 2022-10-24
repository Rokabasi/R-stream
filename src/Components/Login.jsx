import React from "react";
import { GoogleLogin } from "react-google-login";
import { render } from "@testing-library/react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Login = () => {
    
    const navigate = useNavigate()
    const clientId = '757010538260-arnh8a0826kpi72fdqcb08fsp7agceiq.apps.googleusercontent.com'  
    const onSuccess = (res)=>{
        console.log(res)
        console.log(res.profileObj.imageUrl);
        sessionStorage.setItem('accessToken', res.accessToken)
        sessionStorage.setItem('login', true)
        sessionStorage.setItem('profilImage',JSON.stringify(res.profileObj.imageUrl))
        const profilImage = sessionStorage.getItem('profilImage')
        console.log(profilImage);
        navigate('/main')

    }
    const onFaillure = (res)=>{
        console.log(res);
    }
    const accessToken = sessionStorage.getItem('accessToken')
    useEffect(()=>{
        if(!accessToken){
            navigate('/')
        }
    })
    
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