import { useEffect, useState } from "react"
import "../styles/like.css"
import { Link,useParams } from "react-router-dom"
import moment from "moment/moment"
import Loader from "./loader"

export default function Content () {

    const {id} = useParams()
    const accessToken = sessionStorage.getItem('accessToken')
    const [searchVideo, setSearchVideo] = useState([])
    const [loading,setLoading] = useState(true)
    const fecthData = ()=> {
        fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${id}&key=AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU`,
        { method : 'GET',headers:new Headers({'Authorization': `Bearer ${accessToken}`})})     
        .then(res => res.json())
        .then(data => {
            setSearchVideo(data.items)
            setLoading(false)
            })
    }
    useEffect( () => {
        fecthData()  
    },[id, accessToken] );

    return(
        <>
        {
            !loading ?  <main className="card-main">
            {
                searchVideo.map((data, index) =>{
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
        </main> : (<Loader/>)
        }  
           
        </>
    )
}