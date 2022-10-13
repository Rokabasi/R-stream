import "../styles/login.css"
import "../styles/subscription.css"
import { Link } from "react-router-dom"
import { AccountInfosContext } from "../context/AccountContext"
import { useState } from "react"
import { GoogleLogin } from '@react-oauth/google';
import { GoogleLogout } from "react-google-login"
import jwtDecode from "jwt-decode"
import { useContext } from "react"



const clientId = '757010538260-arnh8a0826kpi72fdqcb08fsp7agceiq.apps.googleusercontent.com'
export default function Login (){

    const[connectBtn,setConnectBtn] = useState(false) 
    const {imgUrl, setImgUrl,setLoginState,LoginState} = useContext(AccountInfosContext)
    const onSuccess = (res) => {
        const decode = jwtDecode(res.credential)
        console.log(decode);
        setImgUrl(decode.picture)
        console.log(imgUrl);
        setConnectBtn(true)
    }
    // if(imgUrl){
    //     setLoginState(true)
    //     console.log(LoginState);
    // }
    
    console.log('rjjjk' , imgUrl);
    return(
        <>
            <div className="login-content">
                <h2>Connexion</h2>
                <h3>Accéder à R Stream grâce à ton Compte Google </h3>
                <div>
                    <div className="login-button">
                        <GoogleLogin
                            onSuccess={onSuccess}
                        />
                    </div>
                </div>
                {
                    (connectBtn)? <div>
                    <Link to='/main'><button className="validate-button">Clique</button></Link>
                </div>: null
                }
                
            </div>            
        </>
              
    )
}