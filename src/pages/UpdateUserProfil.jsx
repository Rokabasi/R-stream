import "../styles/update-profil.css";
import profil from "../images/profil.jpg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
const socket = io.connect("http://localhost:9001");

export default function UserProfil() {
  const [userData, setUserData] = useState({
    displayName: "",
    facebookLink: "",
    twitterLink: "",
    instagramLink: "",
    linkedInLink: "",
    facebookLinkText: "",
    twitterLinkText: "",
    instagramLinkText: "",
    linkedInLinkText: "",
  });
  const userEmail = sessionStorage.getItem("userEmail");
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("getOneUser", userEmail);
    socket.on("receiveOneUser", (user) => {
      setUserData(user);
    });
  }, []);
  const handleChange = (e) => {
    const newData = { ...userData };
    newData[e.target.name] = e.target.value;
    setUserData(newData);
  };

  const submitUpdateUserData = () => {
    socket.emit("updateOneUser", userData);
    navigate("/account");
  };

  return (
    <>
      <div className="main-account">
        <div className="account-infos">
          <h2>Update Profil</h2>
          <div>
            <img src={profil} alt="mon profil" />
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
          </div>
          <button onClick={submitUpdateUserData} className="btn-save">
            Save
          </button>
        </div>
      </div>
    </>
  );
}
