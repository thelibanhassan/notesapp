import React, { useState } from 'react'
import { FaSignOutAlt, FaUserAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
    const navigate = useNavigate()
    const [showLogout, setShowLogout] = useState(false)



    // logout func and clears the localStorage from the token
    const logout = () => {
        localStorage.clear()
        navigate('/login')

    }
    return (
        <div onMouseEnter={() => setShowLogout(true)} onMouseLeave={() => setShowLogout(false)} className='relative mr-20 p-5 '>
            <FaUserAlt className='cursor-pointer text-blue-600 ' />
            {showLogout &&

                <button onClick={logout} className='absolute [bottom:-2.5rem] bg-gray-50 border text-blue-700 px-4 py-3 mt-2 rounded border hover:text-red-600 flex items-center gap-1 font-extrabold'><FaSignOutAlt />Logout</button>

            }
        </div>
    )
}

export default UserLogout