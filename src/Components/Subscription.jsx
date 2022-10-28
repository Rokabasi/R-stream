import { useEffect, useState } from "react"
import "../styles/subscription.css"
import { Link } from "react-router-dom"
import Loader from "./loader"

export default function Subscription () {
    
    const accessToken = sessionStorage.getItem('accessToken')
    const [loading,setLoading] = useState(true)
    const [videoLinked, setVideoLinked] = useState([])
    useEffect(()=>{
        fetch('https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails%2CsubscriberSnippet%2CsubscriberSnippet&maxResults=16&mine=true&key=AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU',
        { method : 'GET',headers:new Headers({'Authorization': `Bearer ${accessToken}`})})     
        .then(res => res.json())
        .then(data => {
            setVideoLinked(data.items)
            })
    },[accessToken]);
       
    console.log(videoLinked);

    return(
        <>      
        <main className="card-main">
                {
                    videoLinked.map((data, index) =>{
                        return (
                            <Link to={`/subscriptionPlayList/${data.snippet.resourceId.channelId}`} className='subscription-like'>
                            
                    <div key={index} className="card">
                        <img src={data.snippet.thumbnails.default.url} alt="" className="card-image"/>
                        <h4>{data.snippet.title}</h4>
                        <h4>{(data.snippet.publishedAt)}</h4>
                        <div className="chanel-info">
                            <div className="chanel-info-details">
                                <div className="chanel-info-details-more">
                                   
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