import "../styles/account.css";
import profilImage from "../images/profil.jpg";
import { useState, useEffect } from "react";
import UserProfil from "../pages/UserProfil";
import io from "socket.io-client";
const socket = io.connect("http://localhost:9001");

export default function Account() {
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

  useEffect(() => {
    socket.emit("getOneUser", userEmail);
    socket.on("receiveOneUser", (user) => {
      setUserData(user);
    });
  }, []);
 

  return (
    <>
      <UserProfil userData={userData} profilImage={profilImage} />
    </>
  );
}
