import React, { useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const UserLogout = ({ id }) => {
    const navigate = useNavigate()
    const [showLogout, setShowLogout] = useState(false)
    const [name, setName] = useState('')
    console.log(id)




    const logout = () => {
        localStorage.clear()
        navigate('/login')

    }
    return (
        <div className='relative mr-10 p-5 '>
            <FaUserAlt onClick={() => setShowLogout(!showLogout)} className='cursor-pointer text-blue-600' />
            {showLogout && <div className='absolute buttom-0 bg-blue-100 text-blue-700 p-2 mt-2 rounded border'>

                <button onClick={logout} className='hover:text-red-600'>Logout</button>
            </div>
            }
        </div>
    )
}

export default UserLogout