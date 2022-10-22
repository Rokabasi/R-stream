import "../styles/videocritere.css"

export default function videoCritere (){

    return(
        <div className="video-critere">
            <button className="all-video" type="button">Toutes</button>
            <button className="other-critere" type="button">Informatique</button>
            <button className="other-critere" type="button">NBA</button>
            <button className="other-critere" type="button">Barcelona</button>
            <button className="other-critere" type="button">Base de données</button>
            <button className="other-critere" type="button">Arsenal</button>
            <button className="other-critere" type="button">SQL</button>
        </div>
    )
}