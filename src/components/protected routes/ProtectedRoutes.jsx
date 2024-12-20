import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from './../../Context/UserContext/User.context';
import Loader from "../Loader/Loader";

function ProtectedRoutes({ children }) {
    const { isVerified } = useContext(UserContext);


    if (isVerified === null) {
        // Loading state while verification is in progress
        return <Loader/>;
    }

    if (isVerified === true) {
        // Render protected content
        return <>{children}</>;
    } else {
        // Redirect to login if verification fails
        return <Navigate to="/login" />;
    }
}

export default ProtectedRoutes;
