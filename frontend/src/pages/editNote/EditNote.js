import React, { useEffect, useState } from 'react';
import { useJwt } from "react-jwt";

import { useNavigate, useParams } from "react-router-dom";
import { Header } from '../../components/Header';



export const EditNote = () => {
    let token = JSON.parse(localStorage.getItem('token'))
    const { decodedToken, isExpired } = useJwt(token);
    const navigate = useNavigate()

    const { id } = useParams();

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')


    useEffect(() => {
        getNote(id)
    }, [])
    const getNote = async (id) => {
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

            const res = await fetch(`http://localhost:3001/api/notes/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
            if (res.status === 400) {
                navigate('/')
            }
            if (res.status === 200) {
                const data = await res.json()
                setTitle(data.title)
                setContent(data.content)
            }

        } catch (err) {
            console.log(err)
        }



    }
    // UPDATE note
    const updateNote = async (id) => {
        try {

            const res = await fetch(`http://localhost:3001/api/notes/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    content,

                })

            })

            if (res.status === 200) {
                console.log(content)
                navigate('/')

            }
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
    return (
        <>
            <Header />

            <form className='flex [flex-direction:column] justify-center items-center gap-3' onSubmit={(e) => {
                e.preventDefault()
                updateNote(id)
            }}>
                <label className='text-blue-600 sm:w-1/2 w-4/5'>Title:
                    <input className=' outline-blue-600 border-2 border-blue-300  rounded-md text-gray-900 w-full p-4' type='text' value={title} onChange={e => setTitle(e.target.value)} /></label>
                <label className='text-blue-600 sm:w-1/2 w-4/5 '>Note: <textarea className='[resize:none] overflow-auto h-48 outline-blue-600 border-2 border-blue-300  rounded-md text-gray-900 w-full p-4' value={content} onChange={e => setContent(e.target.value)} /></label>
                <div className='sm:w-1/2 w-4/5 flex justify-around'>
                    <button className="bg-green-500 font-medium font-extrabold text-gray-50 w-2/5 px-4 py-3 rounded-md hover:bg-green-600" type='submit'>Update</button>
                    <button className="bg-red-500 font-medium font-extrabold text-gray-50 w-2/5 px-4 py-3 rounded-md hover:bg-red-600" type='submit' onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </>

    )
}

