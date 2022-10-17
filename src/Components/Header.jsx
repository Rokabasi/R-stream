import '../styles/header.css'
import { AccountInfosContext } from '../context/AccountContext'
import { useContext } from 'react'
import { GoogleLogout } from 'react-google-login'
import { Link } from 'react-router-dom'

const clientId = '757010538260-arnh8a0826kpi72fdqcb08fsp7agceiq.apps.googleusercontent.com' 

export default function Header (){
    const {imgUrl} = useContext(AccountInfosContext)
    console.log(imgUrl);
    sessionStorage.setItem('item', imgUrl)
    const itemImg = (localStorage.getItem('item'))
    console.log(itemImg);
    // console.log(itemImg);
    const onSuccess = () => {
        console.log('logout success');
    }
   
   
    return (
        <header>
            <h1>R Stream</h1>
            <div className='search-input'>
                <input className='input-field' type="text" placeholder='Search'/>
                <button className='button-search' type="submit"><i className="fa fa-search"></i></button>
            </div>
            <div className='my-icons'>
                <i className="fa-sharp fa-regular fa-moon "></i>
                <i className="fa-regular fa-bell "></i>
               
                <div><img src={itemImg} alt='profil' className="count-img"/></div>
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