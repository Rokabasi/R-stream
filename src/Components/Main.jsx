import SideBar from "./SideBar"
import Content from "./Content"
import Header from "./Header"
import "../styles/main.css"
import { AccountInfosContext } from '../context/AccountContext'
import { useContext } from 'react'

export default function Main (){

    const {loginState} = useContext(AccountInfosContext)
    return(          
            <div className="main-app">
                <SideBar/>
                <Header/>
                <Content/>
            </div> 
    )
}