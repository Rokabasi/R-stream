import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { render } from "@testing-library/react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { Context,userPicture } from "../context/context";
import { useContext } from "react";

const Login = () => {
  const navigate = useNavigate();
  const userImage = useContext(userPicture)
  const clientId =
    "757010538260-arnh8a0826kpi72fdqcb08fsp7agceiq.apps.googleusercontent.com";
  const [userData, setUserData] = useState([]);
  const { socket } = useContext(Context);
  

  const onSubmitUser = (displayName, email, userImage) => {
    const user = {
      displayName: displayName,
      email: email,
      userImage: userImage,
    };
    socket.emit("sendUser", user);
  };
  socket.on("receiveUser", (user) => {
    setUserData(user);
    sessionStorage.setItem("userId", user._id);
    sessionStorage.setItem("userName", user.displayName);
    userImage.dispatch({type:"update",payload:user.userImage})
    sessionStorage.setItem("profilImage", user.userImage);
    sessionStorage.setItem("userEmail", user.email);
  });
  const onSuccess = (res) => {
    const userImage = res.profileObj.imageUrl;
    sessionStorage.setItem("accessToken", res.accessToken);
    sessionStorage.setItem("login", true);
    navigate("/main");
    onSubmitUser(res.profileObj.givenName, res.profileObj.email, userImage);
  };
  const onFaillure = (res) => {
    navigate("/");
  };

  return (
    <>
      <div className="login-content">
        <h2>Connexion</h2>
        <h3>Accéder à R Stream grâce à ton Compte Google </h3>
        <div>
          <div className="login-button">
            <GoogleLogin
              clientId={clientId}
              render={(renderProps) => (
                <button
                  className="btn-login"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <i className="fa-brands fa-google fa-2x"></i>{" "}
                  <span>Select your Google account for login</span>
                </button>
              )}
              buttonText="Select Google account"
              onSuccess={onSuccess}
              onFailure={onFaillure}
              scope="https://www.googleapis.com/auth/youtube.force-ssl"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
