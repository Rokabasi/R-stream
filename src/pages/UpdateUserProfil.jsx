import "../styles/update-profil.css";
import { useState, useEffect, useRef,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context, userPicture } from "../context/context";
import axios from "axios"

export default function UserProfil() {
  const [userData, setUserData] = useState({
    displayName: "",
    userImage : "",
    facebookLink: "",
    twitterLink: "",
    instagramLink: "",
    linkedInLink: "",
    facebookLinkText: "",
    twitterLinkText: "",
    instagramLinkText: "",
    linkedInLinkText: "",
  });
  const userImage = useContext(userPicture)
  const userAvatar = userImage.state.userImage
  const [fileInputState,setFileInputState] = useState('')
  const [previewSource,setPreviewSource] = useState('')
  const [picture,setPicture] = useState('')
  const { socket } = useContext(Context);
  const hiddenFileInput = useRef(null);
  const userEmail = sessionStorage.getItem("userEmail");
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("getOneUser", userEmail);
    socket.on("receiveOneUser", (user) => {
      setUserData(user);
      console.log(user);
    });
  }, [socket,userEmail]);
  const handleChange = (e) => {
    const newData = { ...userData };
    newData[e.target.name] = e.target.value;
    setUserData(newData);
  
  };

  const handleChangeImage = (event) => {
    event.preventDefault()
    hiddenFileInput.current.click();
  };


  const submitUpdateUserData = (e) => {
    e.preventDefault()
    handleSubmitFile() 
    navigate("/account");
  
  };
  const handleFIleInputChange = (e) => {
    const file = e.target.files[0]
    previewFile(file)
    setPicture(file)
  };

  const previewFile = (file)=>{
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = ()=>{
        setPreviewSource(reader.result)
      }
  }

  const handleSubmitFile = async()=>{
   
    if(!previewSource) return
   uploadImage(picture)
    
  }

  const uploadImage = async(file)=>{
    console.log(file, "file");
    const formdata = new FormData()
    formdata.append("file",file)
    formdata.append("upload_preset","romainkabasi")
    
    let link = ""
    await axios.post(
      "https://api.cloudinary.com/v1_1/dqhpuopc7/upload",
      formdata).then((res)=>{
        console.log(res.data["secure_url"]);
        userData.userImage =  res.data["secure_url"]
        socket.emit("updateOneUser", userData);
        userImage.dispatch({type:"update",payload:res.data["secure_url"]})
      })
  }
  return (
    <>
      <div className="main-account">
        <div className="account-infos">
          <h2>Update Profil</h2>
          <form onSubmit={submitUpdateUserData}>
            <div className="display-img">
              <img src={previewSource ? previewSource : userData.userImage} alt="mon profil" />
            </div>
            
            <button class="input-file-image" onClick={(event)=> handleChangeImage(event)}>
              +
            </button>
            <input
              ref={hiddenFileInput}
              type="file"
              className="input-select"
              onChange={handleFIleInputChange}
              value={fileInputState}
              style={{display:'none'}}
            ></input>
            <div className="form-group">
              <label htmlFor="displayname">Displayname</label>
              <input
                type="text"
                id="displayname"
                name="displayName"
                value={userData.displayName}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group-link-text">
              <i class="fa-brands fa-linkedin"></i>
              <div className="link-group">
                <label htmlFor="linkedin-link">Link</label>
                <input
                  type="text"
                  id="linkedin-link"
                  name="linkedInLink"
                  value={userData.linkedInLink}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="text-group">
                <label htmlFor="linkedin-text">Text</label>
                <input
                  type="text"
                  id="linkedin-text"
                  value={userData.linkedInLinkText}
                  name="linkedInLinkText"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="form-group-link-text">
              <i class="fa-brands fa-square-facebook"></i>
              <div className="link-group">
                <label htmlFor="facebook-link">Link</label>
                <input
                  type="text"
                  id="facebook-link"
                  value={userData.facebookLink}
                  name="facebookLink"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="text-group">
                <label htmlFor="facebook-text">Text</label>
                <input
                  type="text"
                  id="facebook-text"
                  value={userData.facebookLinkText}
                  name="facebookLinkText"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="form-group-link-text">
              <i class="fa-brands fa-instagram"></i>
              <div className="link-group">
                <label htmlFor="instagram-link">Link</label>
                <input
                  type="text"
                  id="instagram-link"
                  value={userData.instagramLink}
                  name="instagramLink"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="text-group">
                <label htmlFor="instagram-text">Text</label>
                <input
                  type="text"
                  id="instagram-text"
                  name="instagramLinkText"
                  value={userData.instagramLinkText}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="form-group-link-text">
              <i class="fa-brands fa-twitter"></i>
              <div className="link-group">
                <label htmlFor="twitter-link">Link</label>
                <input
                  type="text"
                  id="twitter-link"
                  value={userData.twitterLink}
                  name="twitterLink"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="text-group">
                <label htmlFor="twitter-text">Text</label>
                <input
                  type="text"
                  id="twitter-text"
                  name="twitterLinkText"
                  value={userData.twitterLinkText}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
          <button type="submit" className="btn-save">
            Save
          </button>
          </form>
        </div>
      </div>
    </>
  );
}
