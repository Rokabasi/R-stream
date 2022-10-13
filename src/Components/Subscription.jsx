import { useEffect, useState } from "react"
import "../styles/subscription.css"
import SideBar from "./SideBar"
import Header from "./Header"
import { AccountInfosContext } from '../context/AccountContext'
import { useContext } from 'react'


export default function Content () {

    let newKey = 'AIzaSyBDohBOVS3nWevO-W-YcAKYJOrsmqJZ19k'
    
    const {accessToken}  = useContext(AccountInfosContext)
    const [videoLinked, setVideoLinked] = useState([])
    useEffect(()=>{
        fetch('https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&mine=true&key=AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU',
        { method : 'GET',headers:new Headers({'Authorization': `Bearer ${accessToken}`})})     
        .then(res => res.json())
        .then(data => {
            setVideoLinked(data.items)
            })
    },[accessToken]);
       
    console.log(videoLinked);

    return(
        <>
        <div className="main">
            <SideBar/>
            <Header/>
            <main className="card-main">
                {
                    videoLinked.map((data, index) =>{
                        return (
                    <div key={index} className="card">
                        <img src={data.snippet.thumbnails.default.url} alt="" className="card-image"/>
                        <h4>{data.snippet.title}</h4>
                        
                        <div className="chanel-info">
                            {/* <i className="fa-solid fa-circle-user fa-2x"></i> */}
                            <div className="chanel-info-details">
                                
                                <h3>{data.snippet.description}</h3>
                                <div className="chanel-info-details-more">
                                    {/* <h5>{data.statistics.viewCount}</h5><span> - </span><h5>{data.snippet.publishedAt}</h5> */}
                                </div>
                            </div>
                        </div>
                    </div>
                        )
                    } )
                }
                
            </main>
            
        </div>
        </>
    )
}