import React, { useState } from "react";
import { FaUserPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from "../../components/Header";

function Register() {

    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [userExists, setUserExists] = useState(false)
    const [comparePass, setComparePass] = useState(false)

    const registerUser = async e => {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                password

            })
        };
        if (password !== passwordConfirm) {
            console.log("passwords didn't match")

            setComparePass(true)
            return setTimeout(() => {
                setComparePass(false)
            }, 2000)

        }
        try {

            const res = await fetch('http://localhost:3001/api/notes/register', requestOptions)
            if (res.status === 201) {
                const data = res.json()
                navigate('/login')
                console.log("succesfully created")
            }
            if (res.status === 400) {
                setUserExists(true)
                setTimeout(() => {
                    setUserExists(false)
                }, 3000)
            }

        } catch (err) {
            console.log('Error')
            console.log(err.message)
        }
    }

    return (
        <>
            <Header />
            <div className="text-center my-auto">
                <div className="text-4xl text-blue-800 font-bold py-8 font-sans flex justify-center items-baseline gap-2">
                    <FaUserPlus />
                    <h1 >Register</h1>
                </div>

                <form onSubmit={registerUser} className='bg-gray-100 py-8   mx-auto	'>
                    <div className="w-50 my-4 flex-1	">
                        <input className="h-10 w-80 rounded-md border border-blue-500 border-2 indent-3 outline-0" type='name' value={name} onChange={e => { setName(e.target.value) }} placeholder="Write Your Name" required />
                    </div>
                    <div className="w-50 my-4 flex-1	">
                        <input className="h-10 w-80 rounded-md border border-blue-500 border-2 indent-3 outline-0" type='email' value={email} onChange={e => { setEmail(e.target.value) }} placeholder="Email" required />
                    </div>
                    <div className="w-50 my-4 flex-1">
                        <input className="h-10 w-80 rounded-md border border-blue-500 border-2 indent-3 outline-0" type='password' value={password} onChange={e => { setPassword(e.target.value) }} placeholder="Password" required />
                    </div>
                    <div className="w-50 my-4 flex-1">
                        <input className="h-10 w-80 rounded-md border border-blue-500 border-2 indent-3 outline-0" type='password' value={passwordConfirm} onChange={e => { setPasswordConfirm(e.target.value) }} placeholder="Confirm Password" required />
                    </div>
                    <div className="w-50 my-4 flex-1">
                        <button className="bg-blue-500 font-medium font-extrabold text-gray-50 w-80 px-4 py-3 rounded-md hover:bg-blue-600" type="submit">Register</button>
                    </div>
                    {userExists && <p className="text-red-500">Email Already Exists</p>}
                    {comparePass && <p className="text-red-500">Passwords didn't match</p>}
                </form>
                <p>If you already have account, just Sign in <Link to='/login' className="text-blue-600 font-medium underline">here</Link></p>

            </div>
        </>
    )
}

export default Register;