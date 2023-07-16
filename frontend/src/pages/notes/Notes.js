import React, { useContext, useEffect, useState } from 'react';
import { FaPlus, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../components/AuthContext';
import { deleteNote } from '../../components/DeleteNote';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import UserLogout from '../../components/UserLogout';


function Notes() {
    const { isUserLoggedIn, token } = useContext(AuthContext)
    const { decodedToken, isExpired } = useJwt(token);

    const navigate = useNavigate()
    const [notes, setNotes] = useState([])


    const getNotes = async () => {
        console.log(isUserLoggedIn, 'from notes')
        console.log(decodedToken, 'decoded token')
        console.log(isExpired, 'is expired')

        try {


            const res = await fetch('http://localhost:3001/api/notes/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
            if (res.status === 200) {


                const data = await res.json()
                setNotes(data)
            }




        }



        catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getNotes()

    }, [])



    return (
        <>
            <div className='flex items-center shadow  w-98  '>
                <Header />
                <FaPlus className='text-blue-800 text-2xl ml-auto mr-8 cursor-pointer hover:text-blue-500' onClick={() => navigate('/newnote')} />
                <UserLogout />
            </div>
            <div className='mb-16 border-box '>

                {
                    notes ?
                        notes.map((note) => {
                            return (
                                <div key={note._id} className='bg-gray-200 shadow sm:w-2/3 md:w-1/2 w-4/5 p-6 my-6 mx-auto min-w-8 border-2 border-red rounded-lg  '>
                                    <div className='flex justify-between'>
                                        <p className='font-bold text-md bg-gray-200'>{note.title}</p>
                                        <div className='flex gap-3'>
                                            <FaRegEdit className='text-blue-700 hover:text-xl cursor-pointer' onClick={(e) => {
                                                navigate(`/${note._id}`)
                                            }} />
                                            <FaRegTrashAlt className='text-red-700 hover:text-xl cursor-pointer'
                                                onClick={() => {
                                                    deleteNote(note._id)
                                                    alert('you deleted a note')
                                                    navigate('/')
                                                }}
                                            />

                                        </div>
                                    </div>


                                    <p className='bg-gray-200 w-full' >{note.content}</p>
                                    <div className='flex justify-between'>
                                        <p className='text-gray-500 mt-4'>Created at : {note.createdAt}</p>
                                        <p className='text-gray-500 mt-4'>Updated at : {note.
                                            updatedAt}</p>
                                    </div>
                                </div>

                            )
                        })
                        : < h2 > no notes here </ h2>

                }
            </div >

            <Footer />

        </>


    )
}

export default Notes


// add update note feature
// add Delete note feature  => done

//Get updated notes after create, update or delete