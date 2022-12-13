import { useState, useEffect } from "react";
import profilImage from "../images/profil.jpg";
import Notification from "../pages/Notification";
import io from "socket.io-client";
const socket = io.connect("http://localhost:9001");

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const userId = sessionStorage.getItem("userId");
  useEffect(() => {
    socket.emit("getNotifications", userId);
    socket.on("receiveAllNotifications", (notifications) => {
      setNotifications(notifications);
    });

  }, []);
  return (
    <Notification notifications={notifications} profilImage={profilImage} />
  );
}

export default Notifications;
