import { useParams } from "react-router-dom"
import Header from "./Header";
import "../styles/playvideo.css"
import NameApp from "./NameApp";

export default function PlayVideo(){
    const {id} = useParams()
    console.log(id);
    return(
        
        <div className="card-main">
            <iframe 
                width="560" 
                height="315" 
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube video player"  
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
                {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/cetR8PMSK0c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
        </div>
    )
}