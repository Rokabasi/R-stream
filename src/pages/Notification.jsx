import "../styles/notification.css";
import moment from "moment";
import { HashLink } from "react-router-hash-link";
function Notification({ notifications }) {
 console.log(notifications);
  return (
    <div className="notification-main">
      <h2>Notifications</h2>
      {notifications?.map((notification, index) => {
        return (
          <HashLink className="notification-content" key={index}
            to={`/playvideo/${notification.videoId}/${notification.channelId}/#${notification.commentId}`}
          smooth>
           
              <div className="notification-profil">
                <img src={notification.userImage} alt="" />
              </div>
              <div className="notification-infos">
                <div className="notification-description">
                  <span>{notification.userName}</span>
                  <p>{notification.description } {}</p>
                </div>
                <div className="notification-time">
                  <span>{moment(notification.createdAt).fromNow()}</span>
                </div>
              </div>
           
          </HashLink>
        );
      })}

      
    </div>
  );
}

export default Notification;
