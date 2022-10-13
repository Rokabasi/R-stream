import { useEffect, useState } from "react"
import Header from "./Header"
import VideoCritere from "./VideoCritere"
import { AccountInfosContext } from '../context/AccountContext'
import { useContext } from 'react'
import { Link } from "react-router-dom"


export default function Content () {
    
    const {accessToken}  = useContext(AccountInfosContext)
    const [video, setVideo] = useState([])
    const [title, setTitle] = useState("")
    const [searchVideo, setSearchVideo] = useState([])
    const [channelId, setchannelId] = useState([])
    const [playLists, setPlayLists] = useState([])
    const itemImg = JSON.parse(localStorage.getItem('itemImg'))
    
    let myUrl = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=8&regionCode=FR&key=AIzaSyAHHejPb4CHZYQCDhyb4dWDG4q7n1ZT-_E' 
    
    

    useEffect(()=>{
        fetch('https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=32&key=AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU',
        { method : 'GET',headers:new Headers({'Authorization': `Bearer ${accessToken}`})})     
        .then(res => res.json())
        .then(data => {
            setVideo(data.items)
            setTitle(data.items[0].id)
            console.log(data.items.id)
        })
    },[accessToken]);

    // const search = (title) =>{
    //     fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=22&q=${title}&key=AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU`,
    //     { method : 'GET',headers:new Headers({'Authorization': `Bearer ${accessToken}`})})     
    //     .then(res => res.json())
    //     .then(data => {
    //         setVideo(data.items)
    //         console.log(data.items)
    //     })
    // }
    // useEffect( search , [])
    
    if (channelId) {
     ( fetch('https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=UCBFYkrVI8OfHm9PzbAGFqlA&key=AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU',
    { method : 'GET',headers:new Headers({'Authorization': `Bearer ${accessToken}`})})     
    .then(res => res.json())
    .then(data =>  console.log(data) ) ) } 
        
    // const response = await fetch('&key=AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU')

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
                        <div className="chanel-info">
                            <div><img src={itemImg} className="chanel-logo" alt=""/></div>
                            <div className="chanel-info-details">
                                <h4>{data.snippet.channelTitle}</h4>
                                <div className="chanel-info-details-more">
                                    {/* <h5>{data.statistics.viewCount} Vues</h5><h5>{data.snippet.publishedAt}</h5> */}
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