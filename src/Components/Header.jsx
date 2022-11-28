import '../styles/header.css'
import {  useState,useEffect } from 'react'
import { GoogleLogout } from 'react-google-login'
import { Link,useNavigate } from 'react-router-dom'
import Axios from 'axios'

const clientId = '757010538260-arnh8a0826kpi72fdqcb08fsp7agceiq.apps.googleusercontent.com' 

export default function Header (){
    
    const [inputValue,setInputValue] = useState("")
    const profilImage =  (sessionStorage.getItem('profilImage'))
    const userEmail = sessionStorage.getItem('userEmail')
    const sendUserData = 'http://localhost:9000/users/user'
    const [userName, setUserName]= useState('')
    const navigate = useNavigate()
    const handleChange = (event) =>{
        setInputValue(event.target.value)
    }
    const onSuccess = () => {
        sessionStorage.setItem('login', false)
        navigate("/") 
        sessionStorage.clear()
    }
    const handleClick = (event)=>{
        event.preventDefault()
        if (inputValue.trim()){
            navigate("/search", {state : {inputValue : inputValue}})
        }
    }
    const handleAccountSetting = ()=>{
        navigate("/account")
    }

    const getOneUser =  () => {
        Axios.post(sendUserData,{
            email: userEmail
        })
        .then(res => {
            console.log(res.data.user.name);
            setUserName(res.data.user.name)  
        })
    }

    useEffect(()=>{
        getOneUser()
    })

    return (
        <header>
            <div className='header'>
                <Link to="/main">
                    <div><i className="fa-solid fa-play fa-2x"></i></div>
                    <h1>R Stream</h1>    
                </Link>
            </div>
            <form className='search-input' onSubmit={handleClick}>
                <input onChange={handleChange}  className='input-field' type="text" placeholder='Search' required/>
           
                <button  className='button-search' type="submit">
                    <i className="fa fa-search"></i>
                </button>
            </form>
            <div className='my-icons'>
                <h3>{userName}</h3>
                <i className="fa-solid fa-bell"></i>
                <div><img src={profilImage} alt='profil' onClick={handleAccountSetting} className="count-img"/></div>
            <Link to="/">
            <GoogleLogout
                clientId={clientId}
                render = { renderProps => (
                    <button className='btn-logout' onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="fa-solid fa-right-from-bracket"></i></button>
                    )}
                    onLogoutSuccess = {onSuccess}  
                    />
            </Link>
            </div>     
        </header>
    )
}