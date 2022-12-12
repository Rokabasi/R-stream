import "../styles/account.css";
import { useNavigate } from "react-router-dom";

export default function UserProfil({ userData, profilImage }) {
  const navigate = useNavigate();

  const updateUserdata = () => {
    navigate("/UpdateUser");
  };

  return (
    <>
      <div className="main-account">
        <div className="account-infos">
          <button className="btn-update" onClick={updateUserdata}>
            {" "}
            <i class="fa-solid fa-pen"></i> Update
          </button>
          <div>
            <img src={profilImage} alt="mon profil" />

            <h5>{userData.displayName}</h5>
            <h5>{userData.email}</h5>
            <div>
              <a href={userData.facebookLink} rel="noreferrer" target="_blank">
                <h4>
                  <i class="fa-brands fa fa-square-facebook"></i>
                  {userData.facebookLink
                    ? userData.facebookLinkText
                      ? userData.facebookLinkText
                      : userData.displayName
                    : "No link"}
                </h4>
              </a>
              <a href={userData.instagramLink} rel="noreferrer" target="_blank">
                <h4>
                  <i class="fa-brands fa fa-instagram"></i>
                  {userData.instagramLink
                    ? userData.instagramLinkText
                      ? userData.instagramLinkText
                      : userData.displayName
                    : "No link"}
                </h4>
              </a>
              <a href={userData.twitterLink} rel="noreferrer" target="_blank">
                <h4>
                  <i class="fa-brands fa fa-square-twitter"></i>
                  {userData.twitterLink
                    ? userData.twitterLinkText
                      ? userData.twitterLinkText
                      : userData.displayName
                    : "No link"}
                </h4>
              </a>
              <a href={userData.linkedInLink} rel="noreferrer" target="_blank">
                <h4>
                  <i class="fa-brands fa fa-linkedin"></i>{" "}
                  {userData.linkedInLink
                    ? userData.linkedInLinkText
                      ? userData.linkedInLinkText
                      : userData.displayName
                    : "No link"}
                </h4>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
