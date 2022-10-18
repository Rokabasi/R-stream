import Login from './Components/Login';
import "./styles/App.css"
import {  Route,Routes, Navigate} from 'react-router-dom'
import { AccountInfosContext} from './context/AccountContext';
import Main from './Components/Main';
import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import Like from './Components/Like'
import PlayVideo from './Components/PlayVideo';
import Dislike from './Components/Dislike'
import Subscription from './Components/Subscription'
import SubscriptionPlayList from './Components/SubscriptionPlayList'
import Music from './Components/Music'
import Gaming from './Components/Gaming'
import Nba from './Components/Nba'
import Sports from './Components/Sports'
import News from './Components/News'
import  Search  from './Components/Search';

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
  return (
    <div className="App">
      <AccountInfosContext.Provider value={{imgUrl, setImgUrl, accessToken,setAccessToken}}>
        <Routes>
        <Route path='/'element={ !login ? <Login/> : <Navigate replace to="/main" />} />
        <Route path='/main' element={<Main/>}/>
        <Route path='/like' element={<Like/>}/>
        <Route path='/dislike' element={<Dislike/>}/>
        <Route path='/playvideo/:id' element={<PlayVideo/>}/>
        <Route path='/subscription' element={<Subscription/>}/>
        <Route path='/subscriptionPlayList/:id' element={<SubscriptionPlayList/>}/>
        <Route path='/gaming' element ={<Gaming/>}/>
        <Route path='/nba' element ={<Nba/>}/>
        <Route path='/music' element ={<Music/>}/>
        <Route path='/sports' element ={<Sports/>}/>
        <Route path='/news' element={<News/>}/>
        <Route path='/search/:id' element={<Search/>}/>
      </Routes>
    </AccountInfosContext.Provider>
    </div>
  );
}

export default App;
