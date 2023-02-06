import "../styles/account.css";
import profilImage from "../images/profil.jpg";
import { useState, useEffect, useContext } from "react";
import UserProfil from "../pages/UserProfil";
import {  Context } from "../context/context";

export default function Account() {
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
  const userEmail = sessionStorage.getItem("userEmail");
  const { socket } = useContext(Context);
  useEffect(() => {
    socket.emit("getOneUser", userEmail);
    socket.on("receiveOneUser", (user) => {
      setUserData(user);
    });
  }, [socket,userEmail]);
 

  return (
    <>
      <UserProfil userData={userData} profilImage={profilImage} />
    </>
  );
}
