import { useEffect, useState } from "react"
import "../styles/subscription.css"
import { Link } from "react-router-dom"
import Loader from "./loader"

export default function Content () {

    const accessToken = sessionStorage.getItem('accessToken')
    const [channel, setChannel] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchChannel = () => {
        
        fetch('https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails%2CsubscriberSnippet%2CsubscriberSnippet&maxResults=16&mine=true&key=AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU',
        {   method : 'GET',
            headers:  new Headers({'Authorization': `Bearer ${accessToken}`})})     
        .then(res => res.json())
        .then(data => {
            setChannel(data.items)
            setLoading(false)
            })
    }
    useEffect(()=>{
       fetchChannel()
    },[accessToken]);
       
    return(
        <>

        {
            !loading ? 
                <main className="card-main card-main-channel">
                {
                    channel.map((data, index) =>{
                        return (
                            <Link to={`/subscriptionPlayList/${data.snippet.resourceId.channelId}`} className='link link-subscription'>
                            <div key={index}>  
                                 
                                <img src={data.snippet.thumbnails.medium.url} alt="" className="card-profil"/>
                                <div className="video-detail">
                                <h3>{data.snippet.title}</h3>
                                <div>
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