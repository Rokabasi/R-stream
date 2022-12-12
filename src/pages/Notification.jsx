import "../styles/notification.css";
import profil from "../images/profil.jpg"
function Notification() {
  return (
    <div className="notification-main">
      <h2>Notifications</h2>
      <div className="notification-content">
        <div className="notification-profil">
          <img src={profil} alt="" />
        </div>
        <div className="notification-infos">
          <div className="notification-description">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur temporibus eum qui dolor. Praesentium, dolorum error quos nostrum atque hic, aliquam deserunt exercitationem, obcaecati soluta qui placeat a tempore perferendis.</p>
          </div>
          <div className="notification-time">
            30 minutes ago
          </div>
        </div>
        
      </div>
      <div className="notification-content">
        <div className="notification-profil">
          <img src={profil} alt="" />
        </div>
        <div className="notification-infos">
          <div className="notification-description">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur temporibus eum qui dolor. Praesentium, dolorum error quos nostrum atque hic, aliquam deserunt exercitationem, obcaecati soluta qui placeat a tempore perferendis.</p>
          </div>
          <div className="notification-time">
            30 minutes ago
          </div>
        </div>
        
      </div>
      <div className="notification-content">
        <div className="notification-profil">
          <img src={profil} alt="" />
        </div>
        <div className="notification-infos">
          <div className="notification-description">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur temporibus eum qui dolor. Praesentium, dolorum error quos nostrum atque hic, aliquam deserunt exercitationem, obcaecati soluta qui placeat a tempore perferendis.</p>
          </div>
          <div className="notification-time">
            30 minutes ago
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Notification;
