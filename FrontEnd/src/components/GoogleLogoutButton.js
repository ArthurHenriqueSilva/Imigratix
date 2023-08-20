import { GoogleLogout } from 'react-google-login';

const clientId = "396440993080-c1jfpn4l4gqtijk14h4u449euvimt8u4.apps.googleusercontent.com";

function Logout() {
    return(
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout;