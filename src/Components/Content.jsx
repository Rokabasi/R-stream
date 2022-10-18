import { useEffect, useState } from "react"
import Header from "./Header"
import VideoCritere from "./VideoCritere"
import { AccountInfosContext } from '../context/AccountContext'
import { useContext } from 'react'
import { Link } from "react-router-dom"
import numeral from "numeral"


export default function Content () {
    
   
    const [video, setVideo] = useState([])
    const accessToken = sessionStorage.getItem('accessToken')
    console.log(accessToken);
    useEffect(()=>{
        fetch('https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=32&key=AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU',
        { method : 'GET',headers:new Headers({'Authorization': `Bearer ${accessToken}`})})     
        .then(res => res.json())
        .then(data => {
            setVideo(data.items)
            console.log(video)
        })
    },[]);

    return(
        <>
        <div>
        <div className="video-critere">
            <button  className="all-video" type="button">Toutes</button>
            <button className="other-critere" type="button">Foot</button>
            <button className="other-critere" type="button">Music</button>
            <button className="other-critere" type="button">NBA</button>
            <button className="other-critere" type="button">SQl</button>
            <button className="other-critere" type="button">React</button>
            <button className="other-critere" type="button">Music</button>
        </div>

            <main className="main-card">
                {
                    video.map((data, index) =>{
                        return (
                            
                    <Link to={`/playvideo/${data.id}`} className='link'>
                    <div key={index}>   
                        <img src={data.snippet.thumbnails.medium.url} alt="" className="card-image"/>
                        <h3>{data.snippet.title}</h3>
                        <div className="chanel-info-details">
                            <div className="chanel-info-details-more">
                            <h5><i className="fa-solid fa-thumbs-up"></i> { numeral(data.statistics.likeCount).format("O.a")}</h5>
                            <h5>{numeral(data.statistics.viewCount).format("0.a")} Vues</h5>
                            <h5><i className="fa-solid fa-comment"></i> {data.statistics.commentCount}</h5>
                            <h5>{data.snippet.publishedAt}</h5>
                        </div>
                            <h4>{data.snippet.channelTitle}</h4>
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