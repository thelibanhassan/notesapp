import React, { useContext } from 'react'
import { Navigate } from 'react-router'
import { AuthContext } from './AuthContext'

export const ProtectedRoute = ({ children }) => {
    const { isUserLoggedIn } = useContext(AuthContext)

    if (!isUserLoggedIn) {
        return (<Navigate to='/login' />)
    }

    return (
        children
    )
}
