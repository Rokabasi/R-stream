import { useEffect, useState } from "react"
import "../styles/subscription.css"
import SideBar from "./SideBar"
import Header from "./Header"
import { AccountInfosContext } from '../context/AccountContext'
import { useContext } from 'react'
import { Link } from "react-router-dom"
import numeral from "numeral"
import moment from "moment/moment"


export default function Content () {

    const accessToken = sessionStorage.getItem('accessToken')
    const [videoLinked, setVideoLinked] = useState([])
    useEffect(()=>{
        fetch('https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails%2CsubscriberSnippet%2CsubscriberSnippet&mine=true&key=AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU',
        { method : 'GET',headers:new Headers({'Authorization': `Bearer ${accessToken}`})})     
        .then(res => res.json())
        .then(data => {
            setVideoLinked(data.items)
            })
    },[]);
       
    console.log(videoLinked);

    return(
        <>
       
            
            <main className="card-main">
                {
                    videoLinked.map((data, index) =>{
                        return (
                            <Link to={`/subscriptionPlayList/${data.snippet.resourceId.channelId}`} className='link'>
                            <div key={index}>   
                                <img src={data.snippet.thumbnails.default.url} alt="" className="card-profil"/>
                                <div className="video-detail">
                                <h3>{data.snippet.title}</h3>
                                <h5>{data.snippet.description}</h5>
                                <div>
                                </div>  
                                </div> 
                            </div>
                            </Link>
                        )
                    } )
                }
                
            </main>
            
      
        </>
    )
}