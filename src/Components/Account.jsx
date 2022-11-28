import '../styles/account.css'
import profil from "../images/profil.jpg"
import Axios from "axios"
import { useState, useEffect } from "react"

export default function Account (){

    const [userData,setUserData]= useState({
        name : "",
        facebook : "",
        twitter : "",
        instagram : ""
    })
    const [userInfos,setUserInfos] = useState([])
    const [updateUser,setUpdateUser] = useState(true)
    const userEmail = sessionStorage.getItem('userEmail')
    const userId = sessionStorage.getItem('userId')
    const sendUserData = 'http://localhost:9000/users/user'
    const updateUserData = 'http://localhost:9000/users/update'

    const handleChange = (e) =>{
        const newData = {...userData}
        newData[e.target.name] = e.target.value
        setUserData(newData)
    }

    const onSubmitUserData = () =>{
        Axios.put(updateUserData,{
            name: userData.name,
            facebook : userData.facebook,
            instagram : userData.instagram,
            twitter : userData.twitter,
            _id : userId
        })
        .then((res)=>{console.log(res.data)})
        setUpdateUser(!updateUser)


    }

    const getOneUser =  () => {
        Axios.post(sendUserData,{
            email: userEmail
        })
        .then(res => {console.log(res.data)
                        setUserData(res.data.user)  
                        setUserInfos(res.data.user)          
        })
    }
    
    const updateOne = () => {
        Axios.put(updateUserData,{
            // name,facebook,twitter,instagram,
        })
    }
    useEffect(()=>{
        getOneUser()
    },[])

    return(
        <>
            <div className="main-account">
                <div className="account-infos">
                    <img src={profil} alt="mon profil"/>
                        <h5>{userInfos.name}</h5>
                        <h5>{userInfos.email}</h5>
                        <h4><i className="fa-solid fa fa-bell"></i> Notifications  11</h4>
                        <h4><i class="fa-brands fa fa-square-facebook"></i>{userInfos.facebook}</h4>
                        <h4><i class="fa-brands fa fa-instagram"></i>{userInfos.instagram}</h4>
                        <h4><i class="fa-brands fa fa-square-twitter"></i>{userInfos.twitter}</h4>
                </div>
                <div className="account-seting">
                        <h3>Account Setting</h3>
                        <form>
                        <div className='form-group'>
                            <label htmlFor="displayname">Displayname</label>
                            <input type="text" name="displayname" id="displayname" value={userData.name} onChange={((e)=>handleChange(e))} placeholder='Enter your display name'/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="facebook"> <i class="fa-brands fa-square-facebook"></i> Facebook</label>
                            <input type="text" name="facebook" id="facebook" value={userData.facebook} onChange={((e)=>handleChange(e))} placeholder='Enter your Facebook account'/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="instagram"><i class="fa-brands  fa-instagram"></i> Instagram</label>
                            <input type="text" name="instagram" id="instagram" value={userData.instagram} onChange={((e)=>handleChange(e))} placeholder='Enter your Instagram account'/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="twitter"><i class="fa-brands fa-square-twitter"></i> Twitter</label>
                            <input type="text" name="twitter" id="twitter" value={userData.twitter} onChange={((e)=>handleChange(e))} placeholder='Enter your twitter account'/>
                        </div>
                        <button onClick={onSubmitUserData} type="submit">Update</button>
                        </form>
                </div>
            </div>
        </>
    )
}