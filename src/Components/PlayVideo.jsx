import { Link, useParams } from "react-router-dom"
import { useState,useEffect, Component } from "react";
import "../styles/playvideo.css"
import numeral from "numeral"
import moment from "moment/moment"
import Loader from "./loader";
import Axios from 'axios'

export default function PlayVideo(){
    const {id,channelId} = useParams()
    const profilImage =  (sessionStorage.getItem('profilImage'))
    const [video, setVideo] = useState([])
    const [videoPlayedInfos, setVideoPlayedInfos] = useState([])
    const [videoPlayedChannelInfos,setVideoPlayedChannelInfos] = useState([])
    const accessToken = sessionStorage.getItem('accessToken')
    const userId = sessionStorage.getItem('userId')
    console.log(userId);
    const [loading,setLoading] = useState(true)
    const [commentsData, setCommentsData] = useState([])
    const [videoComments, setVideoComments] = useState([])
    const [sousComments, setSousComments] = useState([])
    const [commentsLike, setCommentsLike] = useState([])
    const [commentsDislike, setCommentsDislike] = useState([]) 
    const [userComment, setUserComment] = useState("")
    const [sousComment, setSousComment] = useState("")
    const [newComment,setNewComment] = useState(true)
    const [newSousComment, setNewSousComment] = useState(true)
    const [newCommentLike, setNewCommentLike] = useState(true)
    const [newCommentDislike, setNewCommentDislike] = useState(true)
    const [sortState, setSortState] = useState(true)
    const url = 'http://localhost:9000/comments'
    const sendCommentUrl = 'http://localhost:9000/comments/add'
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
                    setCommentsData(data)
                console.log(data)})                        
    }
    const getSousComments = () => {
        fetch(getSousCommentsUrl,{method : 'GET'})
            .then(res => res.json())
            .then(data => {
                    setSousComments(data)
                    setNewSousComment(!newSousComment)})
    }
    const getCommentsLike = () => {
        fetch(getCommentsLikeUrl,{method : 'GET'})
            .then(res => res.json())
            .then(data => {
                setCommentsLike(data)
            console.log(data)})
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
       
    },[newComment])

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
        const elems = document.getElementsByClassName('comment-reply-contain');
            for (var i=0;i<elems.length;i+=1){
                elems[i].style.display = 'block';
            }
    }    
    const handleChangeComment = (event) =>{
        setUserComment(event.target.value)
    }

    const handleChangeSousComment = (event) =>{
        setSousComment(event.target.value)
        }
    
    const submit = (e)=>{
        e.preventDefault()
        if(userComment.trim()){
            Axios.post(sendCommentUrl,{
                description: userComment,
                video : id,
                userid : userId,
            })
            .then(res => {
                setUserComment("")
            })

            setNewComment(!newComment)
             
        }

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
                <div className="comment-main">
                    <div className="comment-header">
                        <h2>{ commentsData.filter((comments) => comments.video.includes(id)).length} Comments</h2>
                        <button><i class="fa-solid fa-arrow-up-wide-short"></i> Filter</button>
                    </div>
                    <div className="add-comment">
                        <div className="user-picture">
                            <img src={profilImage}  alt="mon profil"/>
                        </div>
                        <form onSubmit={((e)=>submit(e))}>
                            <input type="text" name="comment" id="comment" value={userComment} placeholder="Add a comment" onChange={handleChangeComment} required/>
                            <button>Post</button>
                        </form>    
                    </div>
                   
                        
                        {
                            (commentsData.filter((comments) => comments.video.includes(id))).sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                            .map((comments,index)=>{
                                return(
                                    <>
                                    <div className="comment-contain" key={index}>
                                        <div className="user-picture">
                                            <img src={profilImage}  alt="mon profil"/>
                                        </div>
                                        <div className="comment-infos">
                                            <h3>Romain kabasi</h3>
                                            <h5>{moment(comments.createdAt).fromNow()}</h5>
                                            <p>{comments.description}</p>
                                            <div className="comment-details">
                                                <div className="comment-detail-infos">
                                                    <h4 onClick={handleReply}>Reply 2</h4>
                                                    <h4 onClick={onSubmitCommentLike(comments._id)}><i className="fa-solid fa-thumbs-up"></i> {(commentsLike.filter((like) => like.idComment.includes(comments._id))).length}</h4>
                                                    <h4 onClick={onSubmitCommentDislike(comments._id)}><i className="fa-solid  fa-thumbs-down"></i> {(commentsDislike.filter((dislike) => dislike.idComment.includes(comments._id))).length}</h4>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="comment-reply-contain">
                                                    <input type="text" name="reply-comment" id="reply-comment" value={sousComment} onChange={handleChangeSousComment} placeholder="repost to this comment"/>
                                                    <button onClick={onSubSousComment(comments._id)}>Post</button>
                                                </div>
                                                <div className="comment-reply">
                                                    <div className="user-picture">
                                                        <img src={profilImage} alt="" />
                                                    </div>
                                                    <div className="comment-reply-detail">
                                                        <h4>Romain</h4>
                                                        <h5>le 22 novembre</h5>
                                                        <h5>Premier sous commentaire</h5>
                                                        <div className="comment-reply-detail-infos">
                                                            <h4 onClick={handleReply}>Reply 2</h4>
                                                            <h4 onClick={onSubmitCommentLike(comments._id)}><i className="fa-solid fa-thumbs-up"></i> {(commentsLike.filter((like) => like.idComment.includes(comments._id))).length}</h4>
                                                            <h4 onClick={onSubmitCommentDislike(comments._id)}><i className="fa-solid  fa-thumbs-down"></i> {(commentsDislike.filter((dislike) => dislike.idComment.includes(comments._id))).length}</h4>
                                                        </div>
                                                    </div>
                                                </div>   
                                            </div>
                                                                                       
                                        </div>
                                    </div>
                                    
                                    </>
                                )
                            })
                        }
                        
                

                </div>
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