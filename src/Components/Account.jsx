import '../styles/account.css'
import profil from "../images/profil.jpg"

export default function Account (){

    return(
        <>
            <div className="main-account">
                <div className="account-infos">
                    <img src={profil} alt="mon profil"/>
                        <h5>Romain</h5>
                        <h5>00243 819 600 518</h5>
                        <h5>kabasiromain@gmail.com</h5>
                        <h4><i className="fa-solid fa fa-bell"></i> Notifications  11</h4>
                        <h4><i class="fa-brands fa fa-square-facebook"></i> Romain Kabashi</h4>
                        <h4><i class="fa-brands fa fa-instagram"></i> Romain Kabashi</h4>
                        <h4><i class="fa-brands fa fa-square-twitter"></i> Romain Kabashi11</h4>
                </div>
                <div className="account-seting">
                    <form>
                        <h3>Account Setting</h3>
                        <div className='form-group'>
                            <label htmlFor="displayname">Displayname</label>
                            <input type="text" name="displayname" id="displayname" placeholder='Enter your display name'/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="phone">Phonenumber</label>
                            <input type="text" name="phone" id="phone" placeholder='Enter your phone number'/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="facebook"> <i class="fa-brands fa-square-facebook"></i> Facebook</label>
                            <input type="text" name="facebook" id="facebook" placeholder='Enter your Facebook account'/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="instagram"><i class="fa-brands  fa-instagram"></i> Instagram</label>
                            <input type="text" name="instagram" id="instagram" placeholder='Enter your Instagram account'/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="twitter"><i class="fa-brands fa-square-twitter"></i> Twitter</label>
                            <input type="text" name="twitter" id="twitter" placeholder='Enter your twitter account'/>
                        </div>
                        <button type="submit">Update</button>
                    </form>
                </div>
            </div>
        </>
    )
}