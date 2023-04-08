import React from 'react'
import { FaStickyNote } from 'react-icons/fa'
import { useNavigate } from 'react-router'
export const Header = () => {
    const navigate = useNavigate()
    return (
        <div className='text-blue-700 font-monospace font-extrabold font-xl align-left p-6  cursor-pointer' onClick={() => navigate('/')}><FaStickyNote className='inline mx-3 ' />MyNotes</div >
    )
}
