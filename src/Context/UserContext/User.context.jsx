import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export let UserContext = createContext(null);

export default function UserProvider({ children }) {
    let [token, setToken] = useState(localStorage.getItem('token'));
    let [isVerified, setIsVerified] = useState(null);

    function logout() {
        setToken(null);
        setIsVerified(false);
        localStorage.removeItem("token");
    }
    async function verifyToken(token) {
        try {
            let options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
                method: "GET",
                headers: {
                    token
                }
            }
            let { data } = await axios.request(options);
            if (data.message === "verified") {
                console.log("Token verified");
                setIsVerified(true);
                return true;
            } else {
                console.log("Token not verified");
                setIsVerified(false);
                return false;
            }
        } catch (error) {
            console.log(error.message);
            setIsVerified(false);
            return false;
        }
    }
    useEffect(() => {
        if (token) {
            verifyToken(token);
        } else {
            setIsVerified(false);
        }
    }, [token]);
    return <UserContext.Provider value={{ token, setToken, logout, isVerified }}>
        {children}
    </UserContext.Provider>
}
