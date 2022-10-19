import { useParams } from "react-router-dom"
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
        </div>
        <div className="related-video-main">
            {
                video.map((data,index)=>{
                    return(
                    <div key={index} className="related-video-card">
                    <div className="related-video-image">
                        <img src={data.snippet.thumbnails.medium.url} className="related-video-profil" alt=""/>
                    </div>
                    <div className="related-video-channel-infos">
                        <h3 className="title">titre de la video</h3>
                        <h5 className="channel">Channel</h5>
                        <h5 className="see">45 <i className="fa-solid fa-eye"></i></h5>
                        <h5 className="creation">il y asddfez</h5>
                    </div>
    
                </div>  )
                })
            }
            <div className="related-video-card">
                <div className="related-video-image">
                    <img src={photo} className="related-video-profil" alt=""/>
                </div>
                <div className="related-video-channel-infos">
                    <h3 className="title">titre de la video</h3>
                    <h5 className="channel">Channel</h5>
                    <h5 className="see">45 <i className="fa-solid fa-eye"></i></h5>
                    <h5 className="creation">il y asddfez</h5>
                </div>

            </div>       
        </div>
        </div>
        </>
    )
}