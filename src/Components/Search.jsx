import { useEffect, useState } from "react"
import "../styles/like.css"
import SideBar from "./SideBar"
import Header from "./Header"
import { AccountInfosContext } from '../context/AccountContext'
import { useContext } from 'react'
import { Link,useParams } from "react-router-dom"
import moment from "moment/moment"

export default function Content () {

    const {id} = useParams()
    console.log(id);
    const accessToken = sessionStorage.getItem('accessToken')
    const [videoLinked, setVideoLinked] = useState([])
    useEffect(()=>{
        fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${id}&key=AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU`,
        { method : 'GET',headers:new Headers({'Authorization': `Bearer ${accessToken}`})})     
        .then(res => res.json())
        .then(data => {
            setVideoLinked(data.items)
            })
    },[id]);
       
    console.log(videoLinked);

    return(
        <>
          
            <main className="card-main">
                {
                    videoLinked.map((data, index) =>{
                        return (
                        <Link to={`/playvideo/${data.id.videoId}/${data.snippet.channelId}`} className='link'>
                    <div key={index}>
                            <img src={data.snippet.thumbnails.medium.url} alt="" className="card-image"/>
                        <div className="video-details">
                            <h3>{data.snippet.title}</h3>
                            <div className="chanel-info"> 
                                <div className="chanel-info-details">
                                    <div className="chanel-info-details-more">
                                    </div>
                                     <h5>{moment(data.snippet.publishedAt).fromNow()}</h5>
                                    <h4>{data.snippet.channelTitle}</h4>
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