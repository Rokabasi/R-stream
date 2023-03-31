import { useEffect, useState } from "react"
import "../styles/like.css"
import moment from "moment/moment"
import { Link } from "react-router-dom"
import Loader from "./loader"

export default function Sports () {

    const accessToken = sessionStorage.getItem('accessToken')
    const [loading,setLoading] = useState(true)
    const [sportsVideo, setSportsVideo] = useState([])
    useEffect(()=>{
        fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&q=sports&key=AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU',
        { method : 'GET',headers:new Headers({'Authorization': `Bearer ${accessToken}`})})     
        .then(res => res.json())
        .then(data => {
            setSportsVideo(data.items)
            setLoading(false)
            })
    },[accessToken]);

    return(
        <>
        {
            !loading ?  <main className="card-main">
            {
                sportsVideo.map((data, index) =>{
                    return (
                        <Link to={`/playvideo/${data.id.videoId}/${data.snippet.channelId}`} className='link'>
                        <div key={index}>   
                            <img src={data.snippet.thumbnails.medium.url} alt="" className="card-image"/>
                            <div className="video-details">
                            <h3>{data.snippet.title}</h3>
                            <div className="chanel-info-details">
                                <div className="chanel-info-details-more">
                                
                               
                            </div>
                            <h5>{moment(data.snippet.publishedAt).fromNow()}</h5>
                            <h4>{data.snippet.channelTitle}</h4>
                            </div>  
                            </div> 
                        </div>
                        </Link>
                    )
                } )
            }
            
        </main> : (<Loader/>)
        }
           
        </>
    )
}