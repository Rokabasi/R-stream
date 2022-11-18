import Login from './Components/Login';
import "./styles/App.css"
import {  Route,Routes} from 'react-router-dom'
import { AccountInfosContext} from './context/AccountContext';
import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import Like from './Components/Like'
import PlayVideo from './Components/PlayVideo';
import Dislike from './Components/Dislike'
import SubscriptionPlayList from './Components/SubscriptionPlayList'
import Music from './Components/Music'
import Gaming from './Components/Gaming'
import Nba from './Components/Nba'
import Sports from './Components/Sports'
import News from './Components/News'
import  Search  from './Components/Search';
import Header from './Components/Header';
import SideBar from './Components/SideBar';
import Content from './Components/Content';
import Channels from './Components/Channels';
import Account from './Components/Account';

const clientId = '757010538260-arnh8a0826kpi72fdqcb08fsp7agceiq.apps.googleusercontent.com' 
function App() {
        const [imgUrl, setImgUrl] = useState ()
        const [accessToken, setAccessToken] = useState()
        const login = JSON.parse(sessionStorage.getItem('login'))
        console.log(login);
        useEffect(() => {
          function start() {
             gapi.client.init({
                clientId: clientId,
                scope: ''
             })
          }
          gapi.load('client: auth2', start)
       })

       const Layout = ({children}) => {
        return (
              <div className='content'>
                <Header/>
                <div className='main-content-app'>
                  <SideBar/>
                  <container className='content-app-main'>
                    {children}
                  </container>
                </div>
              </div>
                )
       }
  return (
    <div className="App">
      <AccountInfosContext.Provider value={{imgUrl, setImgUrl, accessToken,setAccessToken}}>
        <Routes>
        <Route path='/'element={<Login/>}/>
        <Route path='/main' element={ <Layout> <Content/></Layout> }/>
        <Route path='/like' element={<Layout><Like/></Layout>}/>
        <Route path='/dislike' element={<Layout><Dislike/></Layout>}/>
        <Route path='/playvideo/:id/:channelId' element={<Layout><PlayVideo/></Layout>}/>
        <Route path='/subscription' element={<Layout><Channels/></Layout>}/>
        <Route path='/subscriptionPlayList/:id' element={<Layout><SubscriptionPlayList/></Layout>}/>
        <Route path='/gaming' element ={<Layout><Gaming/></Layout>}/>
        <Route path='/nba' element ={<Layout><Nba/></Layout>}/>
        <Route path='/music' element ={<Layout><Music/></Layout>}/>
        <Route path='/sports' element ={<Layout><Sports/></Layout>}/>
        <Route path='/news' element={<Layout><News/></Layout>}/>
        <Route path="/search" element={<Layout><Search/></Layout>}/>
        <Route path='/account' element={<Layout><Account/></Layout>}/>
      </Routes>
    </AccountInfosContext.Provider>
    </div>
  );
}

export default App;
