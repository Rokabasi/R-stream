import "../styles/header.css";
import { useState, useEffect } from "react";
import { GoogleLogout } from "react-google-login";
import { Link, useNavigate } from "react-router-dom";
import {HashLink} from "react-router-hash-link"
import IconButton from "@mui/material/Button";
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { StyledBadge } from "./StyledBadge";
import io from "socket.io-client";
const socket = io.connect("http://localhost:9001");

const clientId =
  "757010538260-arnh8a0826kpi72fdqcb08fsp7agceiq.apps.googleusercontent.com";

export default function Header() {
  const [inputValue, setInputValue] = useState("");
  const profilImage = sessionStorage.getItem("profilImage");
  const userEmail = sessionStorage.getItem("userEmail");
  const userId = sessionStorage.getItem("userId");
  const userName = sessionStorage.getItem("userName");
  const [notifications, setNotifications] = useState([]);

  const newNotifications = notifications.filter((notification)=>notification.mention === null)
  
  useEffect(() => {
    socket.emit("getNotifications", userId);
    socket.on("receiveAllNotifications", (notifications) => {
      setNotifications(notifications);
    });
  }, []);


  const navigate = useNavigate();
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const onSuccess = () => {
    sessionStorage.setItem("login", false);
    navigate("/");
    sessionStorage.clear();
  };
  const handleClick = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      navigate("/search", { state: { inputValue: inputValue } });
    }
  };
  const handleAccountSetting = () => {
    navigate("/account");
  };
  const getNotifications = () => {
    socket.emit("UpdateNotifications", userId);
    navigate('/notification')
  };



  return (
    <header>
      <div className="header">
        <Link to="/main">
          <div>
            <i className="fa-solid fa-play fa-2x"></i>
          </div>
          <h1>R Stream</h1>
        </Link>
      </div>
      <form className="search-input" onSubmit={handleClick}>
        <input
          onChange={handleChange}
          className="input-field"
          type="text"
          placeholder="Search"
          required
        />

        <button className="button-search" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </form>
      <div className="my-icons">
        <HashLink to="/notification#page" smooth><h3>{userName}</h3></HashLink>
        
        <IconButton onClick={getNotifications}>
          <Badge badgeContent={newNotifications.length} color="secondary">
           
              <NotificationsIcon color="primary" />
       
          </Badge>
        </IconButton>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <div>
            <img
              src={profilImage}
              alt="profil"
              onClick={handleAccountSetting}
              className="count-img"
            />
          </div>
        </StyledBadge>
        <Link to="/">
          <GoogleLogout
            clientId={clientId}
            render={(renderProps) => (
              <button
                className="btn-logout"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            )}
            onLogoutSuccess={onSuccess}
          />
        </Link>
      </div>
    </header>
  );
}
