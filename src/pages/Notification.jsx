import "../styles/notification.css";
import profil from "../images/profil.jpg";
import moment from "moment";
import { HashLink } from "react-router-hash-link";
function Notification({ notifications, profilImage }) {
  return (
    <div className="notification-main">
      <h2>Notifications</h2>
      {notifications?.map((notification, index) => {
        return (
          <HashLink className="notification-content" key={index}
            to={`/playvideo/${notification.videoId}/${notification.channelId}/#${notification.commentId}`}
          smooth>
           
              <div className="notification-profil">
                <img src={profilImage} alt="" />
              </div>
              <div className="notification-infos">
                <div className="notification-description">
                  <span>{notification.userName}</span>
                  <p>{notification.description}</p>
                </div>
                <div className="notification-time">
                  <span>{moment(notification.createdAt).fromNow()}</span>
                </div>
              </div>
           
          </HashLink>
        );
      })}

      <div className="notification-content">
        <div className="notification-profil">
          <img src={profil} alt="" />
        </div>
        <div className="notification-infos">
          <div className="notification-description">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur
              temporibus eum qui dolor. Praesentium, dolorum error quos nostrum
              atque hic, aliquam deserunt exercitationem, obcaecati soluta qui
              placeat a tempore perferendis.
            </p>
          </div>
          <div className="notification-time">30 minutes ago</div>
        </div>
      </div>
      <div className="notification-content">
        <div className="notification-profil">
          <img src={profil} alt="" />
        </div>
        <div className="notification-infos">
          <div className="notification-description">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur
              temporibus eum qui dolor. Praesentium, dolorum error quos nostrum
              atque hic, aliquam deserunt exercitationem, obcaecati soluta qui
              placeat a tempore perferendis.
            </p>
          </div>
          <div id="page">cdin</div>
          <div className="notification-time">30 minutes ago</div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
