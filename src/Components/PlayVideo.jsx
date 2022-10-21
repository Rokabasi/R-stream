import { Link, useParams } from "react-router-dom"
import Header from "./Header";
import { useState,useEffect } from "react";
import "../styles/playvideo.css"
import NameApp from "./NameApp";
import photo from "../images/love.jpg"
import numeral from "numeral"
import moment from "moment/moment"

export default function PlayVideo(){
    const {id} = useParams()
    const [video, setVideo] = useState([])
    const [videoPlayedInfos, setVideoPlayedInfos] = useState([])
    const accessToken = sessionStorage.getItem('accessToken')
    useEffect(()=>{
        fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=16&key=AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU`,
        { method : 'GET',headers:new Headers({'Authorization': `Bearer ${accessToken}`})})     
        .then(res => res.json())
        .then(data => {
            setVideo(data.items)
            console.log(data.items);
        })
    },[id]);
    useEffect(()=>{
        fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU`,
        { method : 'GET',headers:new Headers({'Authorization': `Bearer ${accessToken}`})})     
        .then(res => res.json())
        .then(data => {
            setVideoPlayedInfos(data.items)
            console.log(data.items);
        })
    },[id]);
   
    return(
        <>
        <div className="play-video-content">
        <div className="card-main-play-video">
            <iframe 
                width="560" 
                height="315" 
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube video player"  
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
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
                                <div className="channel-infos">
                                    <h3>{video.snippet.channelTitle}</h3>
                                    <button>S'abonner</button>
                                </div>
                                <h4>{video.snippet.description}</h4>
                            </div>
                        )
                    })
                }
              
            </div>
        </div>
        <div className="related-video-main">
            {
                video.map((data,index)=>{
                    return(
                    <Link to={`/playvideo/${data.id.videoId}`}>
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
        </div>
        </>
    )
}