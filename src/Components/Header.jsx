import '../styles/header.css'
import { AccountInfosContext } from '../context/AccountContext'
import { useContext, useState } from 'react'
import { GoogleLogout } from 'react-google-login'
import { Link,Navigate,useNavigate } from 'react-router-dom'

const clientId = '757010538260-arnh8a0826kpi72fdqcb08fsp7agceiq.apps.googleusercontent.com' 

export default function Header (){
    
    const [inputValue,setInputValue] = useState("")
    const accessToken = sessionStorage.getItem('accessToken')
    const profilImage = sessionStorage.getItem('profilImage')
    console.log(profilImage);
    const itemImg = (localStorage.getItem('item'))
    console.log(itemImg);
    // console.log(itemImg);
    const handleChange = event =>{
        setInputValue(event.target.value)
    }
    console.log(inputValue);
    const onSuccess = () => {
        console.log('logout success');
        sessionStorage.setItem('login', false)
        const login = JSON.parse(sessionStorage.getItem('login'))
        Navigate("/") 
        console.log(login);
    }
   
   
    return (
        <header>
            <h1>R Stream</h1>
            <div className='search-input'>
                <input onChange={handleChange}  className='input-field' type="text" placeholder='Search'/>
            <Link to={`/search/${inputValue}`}> <button  className='button-search' type="submit"><i className="fa fa-search"></i></button></Link>   
            </div>
            <div className='my-icons'>
                <i className="fa-sharp fa-regular fa-moon "></i>
                <i className="fa-regular fa-bell "></i>
               
                <div><img src={profilImage} alt='profil' className="count-img"/></div>
            <Link to="/">
            <GoogleLogout
                clientId={clientId}
                render = { renderProps => (
                    <button className='btn-logout' onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="fa-solid fa-right-from-bracket "></i></button>
                    )}
                    onLogoutSuccess = {onSuccess}  
                    />
            </Link>
            </div>     
        </header>
    )
}