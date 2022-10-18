import { useEffect, useState } from "react"
import "../styles/like.css"
import SideBar from "./SideBar"
import Header from "./Header"
import { AccountInfosContext } from '../context/AccountContext'
import { useContext } from 'react'
import { Link } from "react-router-dom"


export default function Content () {

    const accessToken = sessionStorage.getItem('accessToken')
    const [videoLinked, setVideoLinked] = useState([])
    useEffect(()=>{
        fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=music&key=AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU',
        { method : 'GET',headers:new Headers({'Authorization': `Bearer ${accessToken}`})})     
        .then(res => res.json())
        .then(data => {
            setVideoLinked(data.items)
            })
    },[accessToken]);
       
    console.log(videoLinked);

    return(
        <>            
            <main className="card-main">
                {
                    videoLinked.map((data, index) =>{
                        return (
                        <Link to={`/playvideo/${data.id}`} className='like'>
                    <div key={index}>
                            <img src={data.snippet.thumbnails.medium.url} alt="" className="card-image"/>
                        
                            <h3>{data.snippet.title}</h3>
                            <div className="chanel-info">
                                <i className="fa-solid fa-circle-user fa-2x"></i>
                                <div className="chanel-info-details">
                                    <h4>{data.snippet.channelTitle}</h4>
                                    <div className="chanel-info-details-more">
                                       <h5>{data.snippet.publishedAt}</h5>
                                    </div>
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