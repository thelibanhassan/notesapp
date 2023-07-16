import { createContext, useEffect, useState } from "react";
import { useJwt } from "react-jwt";

export const AuthContext = createContext(null)

export default function AuthContextProvider({ children }) {
    let token = JSON.parse(localStorage.getItem('token')) || null
    const { decodedToken, isExpired } = useJwt(token);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState()


    useEffect(() => {
        const verifyToken = () => {
            if (decodedToken && !isExpired) {

                return setIsUserLoggedIn(true)
            }
            else {
                return setIsUserLoggedIn(false)
            }
        }
        verifyToken()
        console.log(isUserLoggedIn, ' from context')
    }, [isUserLoggedIn])

    return (
        <AuthContext.Provider value={{ isUserLoggedIn, token }}>
            {children}
        </AuthContext.Provider >
    )



}



// isUserLoggedIn ?
// { children }
// :
// <Navigate to="/login" />

