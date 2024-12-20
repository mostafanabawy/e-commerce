import { useContext, useEffect } from "react"
import { UserContext } from './../../Context/UserContext/User.context';
import { Navigate } from "react-router-dom";
import Loader from "../Loader/Loader";

function GuestRoute({ children }) {
    const { isVerified } = useContext(UserContext);

    if (isVerified === null) {
        // Loading state while verification is in progress
        return <Loader/>;
    }

    if (!isVerified === true) {
        // Render protected content
        return <>{children}</>;
    } else {
        return <Navigate to="/" />;
    }
}

export default GuestRoute
