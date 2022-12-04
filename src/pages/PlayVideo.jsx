import { Link, useParams } from "react-router-dom"
import { useState,useEffect } from "react";
import "../styles/playvideo.css"
import numeral from "numeral"
import moment from "moment/moment"
import Loader from "../Components/loader";
import Axios from 'axios'
import CommentForm from "../comments/CommentForm";
import Comments from "../comments/Comment"

export default function PlayVideo(){
    const {id,channelId} = useParams()
    const videoId = id
   
    const profilImage =  (sessionStorage.getItem('profilImage'))
    const [video, setVideo] = useState([])
    const [videoPlayedInfos, setVideoPlayedInfos] = useState([])
    const [videoPlayedChannelInfos,setVideoPlayedChannelInfos] = useState([])
    const accessToken = sessionStorage.getItem('accessToken')
    const userId = sessionStorage.getItem('userId')
    const [loading,setLoading] = useState(true)
    const [commentsData, setCommentsData] = useState([])
    const [videoComments, setVideoComments] = useState([])
    const [sousComments, setSousComments] = useState([])
    const [commentsLike, setCommentsLike] = useState([])
    const [commentsDislike, setCommentsDislike] = useState([]) 
    const [sousComment, setSousComment] = useState("")
  
    const [newSousComment, setNewSousComment] = useState(true)
    const [newCommentLike, setNewCommentLike] = useState(true)
    const [newCommentDislike, setNewCommentDislike] = useState(true)
    const [sortState, setSortState] = useState(true)
    const url = 'http://localhost:9000/comments'
   
    const sendSousCommentUrl = 'http://localhost:9000/souscomment/add'
    const getSousCommentsUrl = 'http://localhost:9000/souscomment'
    const getCommentsLikeUrl = 'http://localhost:9000/like'
    const sendCommentLikeUrl = 'http://localhost:9000/like/add'
    const getCommentsDislikeUrl = 'http://localhost:9000/dislike'
    const sendCommentDislikeUrl = 'http://localhost:9000/dislike/add'
   
    // useEffect(()=>{
    //     fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=16&key=AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU`,
    //     { method : 'GET',headers:new Headers({'Authorization': `Bearer ${accessToken}`})})     
    //     .then(res => res.json())
    //     .then(data => {
    //         setVideo(data.items)
    //         setLoading(false)
    //     })
    // },[id]);
    useEffect(()=>{
        fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU`,
        { method : 'GET',headers:new Headers({'Authorization': `Bearer ${accessToken}`})})     
        .then(res => res.json())
        .then(data => {
            setVideoPlayedInfos(data.items)
            setLoading(false)
        })
    },[id]);
    useEffect(()=>{
        fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=AIzaSyAWhMB1MsRJRjw4FkGU2OfZfSlW9YzcTHU`,
        { method : 'GET',headers:new Headers({'Authorization': `Bearer ${accessToken}`})})     
        .then(res => res.json())
        .then(data => { setVideoPlayedChannelInfos(data.items)
            setLoading(false)
        })  
    },[channelId])

   const handleclick = () =>{
            window.scroll(0,0)
   }
    const postVideoId = () => {
        Axios.post()
    }
    const getComments = () => {
        fetch(url,{ method : 'GET'})
            .then(res => res.json())
            .then(data => {
                    setCommentsData(data)})                        
    }
    const getSousComments = () => {
        fetch(getSousCommentsUrl,{method : 'GET'})
            .then(res => res.json())
            .then(data => {
                    setSousComments(data)
                    console.log(data)
                    setNewSousComment(!newSousComment)})
    }
    const getCommentsLike = () => {
        fetch(getCommentsLikeUrl,{method : 'GET'})
            .then(res => res.json())
            .then(data => {
                setCommentsLike(data)})
    }
    const getCommentsDislike = () => {
        fetch(getCommentsDislikeUrl,{method : 'GET'})
            .then(res => res.json())
            .then(data => {
                setCommentsDislike(data)
            })
    }
  
    useEffect( () => {
        getComments()
       
    },[])

    useEffect( () => {
        getCommentsLike()
    },[newCommentLike,newCommentDislike])

    useEffect( () => {
        getCommentsDislike()
    },[newCommentDislike,newCommentLike])

    useEffect( () => {
        getSousComments()
    },[])

    // useEffect( () => {
    //     setCommentsData(commentsData.sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))
    //     console.log(commentsData);
    // },[sortState])
  
    const handleReply = () =>{
        const elems = document.getElementsByClassName('reply-comment');
            for (var i=0;i<elems.length;i+=1){
                elems[i].style.display = 'block';
            }
    }    
  

    const handleChangeSousComment = (event) =>{
        setSousComment(event.target.value)
        }
    
  
    const onSubSousComment = (commentid) => ()=> {
        if(sousComment.trim()){
            Axios.post(sendSousCommentUrl,{
                description: sousComment,
                commentId : commentid
            })
            .then(res => {
                console.log(res.data)
                setSousComment("")})
        }
    }
    const onSubmitCommentLike = (commentid) => ()=> {
        Axios.post(sendCommentLikeUrl,{
            commentId : commentid,
            userId: userId
        })
        .then(res => { console.log(res.data)
            setNewCommentLike(!newCommentLike) })
    }
    const onSubmitCommentDislike = (commentid) => ()=> {
        Axios.post(sendCommentDislikeUrl,{
            commentId : commentid,
            userId: userId
        })
        .then(res => { console.log(res.data)
            setNewCommentDislike(!newCommentDislike) })
    }
   
    return(
        <>
        {
            !loading ?  <div className="play-video-content">
            <div className="card-main-play-video">
                <iframe 
                    src={`https://www.youtube.com/embed/${id}`}
                    title="YouTube video player"  
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen = "allowfullscreen">
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
                                    
                                </div>
                            )})
                    }
                    {
                        videoPlayedChannelInfos.map((data,index)=> {
                            return(
                                <>
                                    <div className="channel-infos" key={index}>
                                        <img src={data.snippet.thumbnails.default.url} className="channel-infos-image" alt="channel logo"/>
                                        <div className="channel-infos-title">
                                            <h3>{data.snippet.title}</h3>
                                            <h5> { numeral(data.statistics.subscriberCount).format("O.a")} subscriber</h5>
                                        </div>   
                                        <button className="channel-infos-button">S'abonner</button>
                                    </div>
                                </>
                            )
                        })
                        
                    }
                </div>
                 <Comments videoId={videoId}/>   
            </div>
            <div className="related-video-main">
                <h1>Relared video</h1>
                {/* {
                    video.map((data,index)=>{
                        return(
                        <Link onClick={handleclick} href="#top" to={`/playvideo/${data.id.videoId}/${data.snippet.channelId}`}>
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
                } */}
            </div>
            </div> : (<Loader/>)
        }
       
        </>
    )
}