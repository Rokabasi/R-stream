import { useEffect, useState } from "react"
import "../styles/main.css"
import { Link } from "react-router-dom"
import numeral from "numeral"
import moment from "moment/moment"
import Loader from "./loader"

export default function Like () {

    const accessToken = sessionStorage.getItem('accessToken')
    const [videoLiked, setVideoLiked] = useState([])
    const [loading, setLoading] = useState(true)
    const fetchVideo = () => {

        fetch('https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&myRating=like&maxResults=16&key=AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU',
        { method : 'GET',headers:new Headers({'Authorization': `Bearer ${accessToken}`})})     
        .then(res => res.json())
        .then(data => {
            setVideoLiked(data.items)
            setLoading(false)
            })
    }
    useEffect(()=>{
        fetchVideo()
    },[accessToken]);
    
    return(
        <>
       
            {
                !loading ? <main className="card-main">
                {
                    videoLiked.map((data, index) =>{
                        return (
                            <Link to={`/playvideo/${data.id}/${data.snippet.channelId}`} className='link'>
                            <div key={index}>   
                                <img src={data.snippet.thumbnails.medium.url} alt="" className="card-image"/>
                                <div className="video-details">
                                    <h3>{data.snippet.title}</h3>
                                    <div className="chanel-info-details">
                                        <div className="chanel-info-details-more">
                                            <h5> { numeral(data.statistics.likeCount).format("O.a")} <i className="fa-solid fa-thumbs-up"></i></h5>
                                            <h5>{numeral(data.statistics.viewCount).format("0.a")} <i className="fa-solid fa-eye"></i> </h5>
                                            <h5>{data.statistics.commentCount} <i className="fa-solid fa-comment"></i></h5>                           
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