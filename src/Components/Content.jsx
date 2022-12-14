import { useEffect, useState } from "react"
import "../styles/videocritere.css"
import { Link, Navigate } from "react-router-dom"
import numeral from "numeral"
import moment from "moment/moment"
import Loader from "./loader"
import { useNavigate } from "react-router-dom"

export default function Content () {
    
    const [video, setVideo] = useState([])
    const [tagValue, setTagValue] = useState("")
    const [loading, setLoading] = useState(true)
    const accessToken = sessionStorage.getItem('accessToken')
    const fetchData = ()=> {
        fetch('https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=36&&region&Code=US&key=AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU',
                        {   method : 'GET',
                            headers: new Headers({'Authorization': `Bearer ${accessToken}`})})     
                        .then(res => res.json())
                        .then(data => {
                            setVideo(data.items)
                            setLoading(false)
                    })}
    useEffect(()=>{
        fetchData()
    },[accessToken]);

    const navigate = useNavigate()

    // const handleChange = (event) =>{
    //     setTagValue(event.target.value)
    // }

    const handleTag = (event) => {
        event.preventDefault()
        setTagValue(event.target.value)
        navigate("/search", {state : {tagValue : tagValue}})
    }

    const buttonText = [
        "All","Foot","Music","NBA","SQL","react","Lakers","Africa","Ninho","Fally","Html","css"
    ] 

    return(
            <div>
            {
                !loading ? 
                <div>
                    <div className="video-critere">
                        {buttonText.map((value, i) => {
                            return(
                                <Link to={`/search/${value}`} className="link-video-critere"> <button key={i} className="all-video" type="button" onClick={handleTag}>{value}</button></Link>  
                            )})
                        }
                    </div>

                    <main className="main-card">
                        {
                            (video.map((data, index) =>{
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
                            </Link>)})) 
                        }
                    </main>
                </div>
                
                : (<Loader/>)
            } 
            </div>
    )
}