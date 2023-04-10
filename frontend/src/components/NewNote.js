import React, { useState } from 'react';
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { Header } from './Header';



const NewNote = () => {
    let token = JSON.parse(localStorage.getItem('token'))
    const { decodedToken, isExpired } = useJwt(token);

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')


    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            title,
            content,

        })
    };

    const createNote = async (e) => {
        e.preventDefault()
        try {
            if (isExpired) {
                navigate('/login')
                console.log('token is expird')
                throw new Error()
            }
            if (!token) {
                navigate('/login')
                console.log('no token')
                throw new Error()
            }
            const res = await fetch('http://localhost:3001/api/notes/', requestOptions)
            if (res.status === 200) {
                const data = res.json()
                navigate('/')

            }
        } catch (err) {
            console.log('failed to create a note', err)
        }
    }



    return (
        <>
            <Header />
            <form className=' py-8 flex flex-col justify-center items-center gap-2 mx-auto' onSubmit={createNote}>
                <input className="h-16 sm:w-1/2 w-4/5 rounded-md border border-blue-500 border-2 indent-3 outline-0" type='text' onChange={e => setTitle(e.target.value)} placeholder='Title' required />
                <textarea className="h-48 sm:w-1/2 w-4/5 rounded-md border border-blue-500 border-2 indent-3 outline-0" onChange={e => setContent(e.target.value)} placeholder='New Note' required />
                <div className='sm:w-1/2 w-4/5 flex justify-around'>
                    <button className="bg-green-500 font-medium font-extrabold text-gray-50 w-2/5 px-4 py-3 rounded-md hover:bg-green-600" type='submit'>Save</button>
                    <button className="bg-red-500 font-medium font-extrabold text-gray-50 w-2/5 px-4 py-3 rounded-md hover:bg-red-600" type='submit' onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </>
    )
}

export default NewNote;

