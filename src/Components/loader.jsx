import loader from "../images/loader.gif"
import "../styles/loader.css"

export default function Loader (){

    return(
        <>
        <div className="loader">
            <img src={loader} alt="loader"/>
        </div>
        </>
    )
}