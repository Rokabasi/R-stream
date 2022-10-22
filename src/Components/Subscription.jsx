import { useEffect, useState } from "react"
import "../styles/subscription.css"
import { Link } from "react-router-dom"

export default function Subscription () {
    
    const accessToken = sessionStorage.getItem('accessToken')
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
                    {/* <div key={index}>   
                        <img src={data.snippet.thumbnails.default.url} alt="" className="card-image"/>
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
                    </div> */}
                                </Link>
                        )
                    } )
                }
                
            </main>
            
        </>
    )
}