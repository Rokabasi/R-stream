import { useState, useEffect } from "react";
import Notification from "../pages/Notification";
import { Context } from "../context/context";
import { useContext } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const { socket } = useContext(Context);
  const userId = sessionStorage.getItem("userId");
  useEffect(() => {
    socket.emit("getNotifications", userId);
    socket.on("receiveAllNotifications", (notifications) => {
      setNotifications(notifications);
    });
  }, [userId,socket]);

  return (
    <>
      <Notification notifications={notifications}  />
    </>
  );
}

export default Notifications;
