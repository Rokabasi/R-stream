import SideBar from './Components/SideBar';
import Main from './Components/Content';
import Header from './Components/Header';
import Subscription from './Components/Subscription';
import Login from './Components/Login';
import {  Routes,Route, Link } from 'react-router-dom';
import "./styles/App.css"

function Myroute() {
  return (
    <div className="App">
      <SideBar/>
      <Header/>
      <Routes>
        <Route path='/'element={<Main/>}/>
        <Route path='/subscription' element={<Subscription/>}/>
        <Route path='/main' element={<Main/>}/>
      </Routes>
    </div>
  );
}

export default Myroute;
