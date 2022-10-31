import { Link, useParams } from "react-router-dom"
import { useState,useEffect } from "react";
import "../styles/playvideo.css"
import numeral from "numeral"
import moment from "moment/moment"
import Loader from "./loader";

export default function PlayVideo(){
    const {id,channelId} = useParams()
    const [video, setVideo] = useState([])
    const [videoPlayedInfos, setVideoPlayedInfos] = useState([])
    const [videoPlayedChannelInfos,setVideoPlayedChannelInfos] = useState([])
    const accessToken = sessionStorage.getItem('accessToken')
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=16&key=AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU`,
        { method : 'GET',headers:new Headers({'Authorization': `Bearer ${accessToken}`})})     
        .then(res => res.json())
        .then(data => {
            setVideo(data.items)
            setLoading(false)
        })
    },[id]);
    useEffect(()=>{
        fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU`,
        { method : 'GET',headers:new Headers({'Authorization': `Bearer ${accessToken}`})})     
        .then(res => res.json())
        .then(data => {
            setVideoPlayedInfos(data.items)
            setLoading(false)
        })
    },[id]);
    useEffect(()=>{
        fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU`,
        { method : 'GET',headers:new Headers({'Authorization': `Bearer ${accessToken}`})})     
        .then(res => res.json())
        .then(data => { setVideoPlayedChannelInfos(data.items)
            setLoading(false)
        })  
    },[channelId])

   const handleclick = () =>{
            window.scroll(0,0)
   }
   
    return(
        <>
        {
            !loading ?  <div className="play-video-content">
            <div className="card-main-play-video">
                <iframe 
                    src={`https://www.youtube.com/embed/${id}`}
                    title="YouTube video player"  
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen = "allowfullscreen">
                </iframe>
                <div className="card-played-video-infos">
                    {
                        videoPlayedInfos.map((video, index) => {
                            return (
                                <div key={index}>  
                                    <h2>{video.snippet.title}</h2>
                                    <div className="played-video-statistics">
                                        <h5> { numeral(video.statistics.likeCount).format("O.a")} <i className="fa-solid fa-thumbs-up"></i></h5>
                                        <h5><i className="fa-solid fa-eye"></i> {numeral(video.statistics.viewCount).format("0.a")}  Vues</h5>
                                        <h5>{video.statistics.commentCount} <i className="fa-solid fa-comment"></i> Commentaires</h5>
                                    </div>
                                    
                                </div>
                            )})
                    }
                    {
                        videoPlayedChannelInfos.map((data,index)=> {
                            return(
                                <>
                                <div className="channel-infos">
                                    <img src={data.snippet.thumbnails.default.url} className="channel-infos-image" alt="channel logo"/>
                                    <div className="channel-infos-title">
                                        <h3>{data.snippet.title}</h3>
                                        <h5> { numeral(data.statistics.subscriberCount).format("O.a")} subscriber</h5>
                                    </div>   
                                    <button className="channel-infos-button">S'abonner</button>
                                </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
            <div className="related-video-main">
                <h1>Relared video</h1>
                {
                    video.map((data,index)=>{
                        return(
                        <Link onClick={handleclick} href="#top" to={`/playvideo/${data.id.videoId}/${data.snippet.channelId}`}>
                            <div key={index} className="related-video-card">
                                <div className="related-video-image">
                                    <img src={data.snippet.thumbnails.medium.url} className="related-video-profil" alt=""/>
                                </div>
                                <div className="related-video-channel-infos">
                                    <h3 className="title">{data.snippet.title}</h3>
                                    <h5 className="channel">{data.ChannelTitle}</h5>
                                    <h5 className="creation">{moment(data.snippet.publishedAt).fromNow()}</h5>
                                </div>
                            </div>  
                        </Link>
                    )
                    })
                }
            </div>
            </div> : (<Loader/>)
        }
       
        </>
    )
}