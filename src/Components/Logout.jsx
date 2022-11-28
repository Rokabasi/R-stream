import React from "react";
import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";

const clientId = '757010538260-arnh8a0826kpi72fdqcb08fsp7agceiq.apps.googleusercontent.com' 

const Logout = () => {
    
    const onSuccess = () => {
        console.log('logout success');
        sessionStorage.setItem('login', false)
        sessionStorage.clear()
    }

    return(
        <>
            <GoogleLogout
                clientId={clientId}
                render = { renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Select your Google compte for login</button>
                )}
                onLogoutSuccess = {onSuccess}  
            />
        </>
    )
}
export  default Logout