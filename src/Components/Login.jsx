import React from "react";
import { GoogleLogin } from "react-google-login";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AccountInfosContext } from "../context/AccountContext";
import "../styles/login.css"
import { render } from "@testing-library/react";

const Login = () => {
    const {setImgUrl,setLoginState,loginState,accessToken,setAccessToken} = useContext(AccountInfosContext)
    const clientId = '757010538260-arnh8a0826kpi72fdqcb08fsp7agceiq.apps.googleusercontent.com'   
    const onSuccess = (res)=>{
        console.log(res)
        setImgUrl(res.profileObj.imageUrl)
        console.log(res.profileObj.imageUrl);
        setLoginState(true)
        setAccessToken(res.accessToken)
    }
    const onFaillure = (res)=>{
        console.log(res);
    }
    
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
                            <button className="btn-login" onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="fa-brands fa-google"></i> Select your Google account for login</button>
                        )}
                        buttonText = 'Select Google account'
                        onSuccess={onSuccess}
                        onFailure={onFaillure}
                        scope="https://www.googleapis.com/auth/youtube.force-ssl"
                    />
                    </div>
                </div>
                {
                    (loginState)? <div>
                    <Link to='/main'>
                        <button className="validate-button">connect to R-Stream</button>
                        </Link>
                </div>: null
                }
                
            </div> 
            
        </>
    )
}

export default Login