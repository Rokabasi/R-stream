import { useEffect, useState } from "react"
import "../styles/main.css"
import "../styles/dislike.css"
import SideBar from "./SideBar"
import Header from "./Header"
import { AccountInfosContext } from '../context/AccountContext'
import { useContext } from 'react'
import { Link } from "react-router-dom"


export default function Content () {

    let newKey = 'AIzaSyBDohBOVS3nWevO-W-YcAKYJOrsmqJZ19k'
    const ApiKey = 'AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU'
    const {accessToken}  = useContext(AccountInfosContext)
    // const [makeVideoCard, setmakeVideoCard] = useState('') 
    // const  channel_http = "https://www.googleapis.com/youtube/v3/channels?";
    const [videoLiked, setVideoLiked] = useState([])
    useEffect(()=>{
        fetch('https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&myRating=dislike&key=AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU',
        { method : 'GET',headers:new Headers({'Authorization': `Bearer ${accessToken}`})})     
        .then(res => res.json())
        .then(data => {
            setVideoLiked(data.items)
            })
    },[accessToken]);
    // const getChannelIcon = (videoLinked) => {
    //     fetch(channel_http + new URLSearchParams({
    //         key: ApiKey,
    //         part: 'snippet',
    //         id: videoLinked.snippet.channelId
    //     }))
    //     .then(res => res.json())
    //     .then(data => {
    //         // video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
    //         // setmakeVideoCard(video_data);
    //         setmakeVideoCard(data);
    //     })
    // }
    // console.log(makeVideoCard); 
    console.log(videoLiked);
    
    return(
        <>
        
        <div className="main">
            <SideBar/>
            <Header/>
            <main className="card-main">
                {
                    videoLiked.map((data, index) =>{
                        return (
                            <Link to={`/playvideo/${data.id}`} className='like'>
                    <div key={index} className="">
                        <img src={data.snippet.thumbnails.medium.url} alt="" className="card-image"/>
                        
                        <h3>{data.snippet.title}</h3>
                        <div className="chanel-info">
                            <i className="fa-solid fa-circle-user fa-2x"></i>
                            <div className="chanel-info-details">
                                <h4>{data.snippet.channelTitle}</h4>
                                <div className="chanel-info-details-more">
                                    <h5>{data.statistics.viewCount}</h5><span> - </span><h5>{data.snippet.publishedAt}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                            </Link>
                        )
                    } )
                }
                
            </main>
            
        </div>
        </>
    )
}