import { Link, NavLink } from 'react-router-dom'
import '../styles/sidebar.css'
import { GoogleLogout } from 'react-google-login'
import { useContext } from 'react'
import { AccountInfosContext } from '../context/AccountContext'
import { useState,useEffect } from 'react'


export default function SideBar(){

    const {loginState,setLoginState} = useContext(AccountInfosContext)
    const clientId = '757010538260-arnh8a0826kpi72fdqcb08fsp7agceiq.apps.googleusercontent.com'
    const {accessToken}  = useContext(AccountInfosContext)
    const [subscriptionChannel, setsubscriptionChannel] = useState([])
    useEffect(()=>{
        fetch('https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails%2CsubscriberSnippet&mine=true&key=AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU',
        { method : 'GET',headers:new Headers({'Authorization': `Bearer ${accessToken}`})})     
        .then(res => res.json())
        .then(data => {
            setsubscriptionChannel(data.items)
            console.log(data.items);
            })
    },[accessToken]);
    const onSuccess = () => {
        console.log('logout success');
        setLoginState(false)
        console.log(loginState);
    }
    return(
        <div className='side-bar'>
            <div className='side-bar-header'>
            <Link to="/main">
                <div><i className="fa-solid fa-play fa-2x"></i></div>
                <h1>R Stream</h1>    
            </Link>
            </div>
            <div>
                <ul id='myDIV'>
                <NavLink exact activeClassName="active" to="/main"><li><div><i className="fa-solid fa fa-house"></i></div><h4>Home</h4></li></NavLink>
                    <NavLink activeClassName="active" to='/subscription'><li><div><i className="fa-solid fa fa-film"></i></div><h4>Subscription</h4></li></NavLink>
                    <NavLink activeClassName="active" to='/like'><li><div><i className="fa-solid fa fa-thumbs-up"></i></div><h4>Like</h4></li></NavLink>
                    <NavLink activeClassName="active" to='/dislike'><li><div><i className="fa-solid fa fa-thumbs-down"></i></div><h4>Dislike</h4></li></NavLink>
                    <h6 className='abonnements'>Explorer</h6>
                    <NavLink activeClassName="active" to='/music'><li><div><i className="fa-solid fa fa-music"></i></div><h4>Music</h4></li></NavLink>
                    <NavLink activeClassName="active" to='/sports'><li><div><i className="fa-solid fa fa-passport"></i></div><h4>Sports</h4></li></NavLink>
                    <NavLink activeClassName="active" to='/gaming'><li><div><i className="fa-solid fa fa-gamepad"></i></div><h4>Gaming</h4></li></NavLink>
                    <NavLink activeClassName="active" to='/nba'><li><div><i className="fa-solid fa fa-basketball"></i></div><h4>NBA</h4></li></NavLink>
                    <NavLink activeClassName="active" to='/news'><li><div><i className="fa-solid fa fa-newspaper"></i></div><h4>News</h4></li></NavLink>
                    <h6 className='abonnements'>Abonnements</h6>

                    {
                        subscriptionChannel.map((channel, index) => {
                            return (
                                <div>
                                    <NavLink  to={`/subscriptionPlayList/${channel.snippet.channelId}`}>
                                        <li>
                                            <img src={channel.snippet.thumbnails.default.url} alt='' className='img-channel'/>
                                            <h5>{channel.snippet.title}</h5>
                                        </li>
                                    </NavLink>
                                </div>
                            )
                        })
                    }
                    
                </ul>
            </div>
            
        </div>
    )
}