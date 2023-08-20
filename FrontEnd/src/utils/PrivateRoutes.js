import { useContext } from 'react';
import { useLocation } from "react-router";
import { Outlet, Navigate} from 'react-router-dom';
import { UserContext } from "../App";

const useAuth = () => {
    const { user } = useContext(UserContext);
    return user && user.isLoggedIn;
}

const PrivateRoutes = () => {
    const location = useLocation();
    const isAuth = useAuth();
    return(
        isAuth ? (
            <Outlet />
        ) : ( 
            <Navigate to="/" replace state={{from: location}} />
        )
    );
}

export default PrivateRoutes;