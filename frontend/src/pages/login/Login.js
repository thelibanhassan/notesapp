import React, { useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [wrongCred, setWrongCred] = useState(false)

    const loginUser = async e => {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                email,
                password
            })
        };
        try {
            const res = await fetch('http://localhost:3001/api/notes/login', requestOptions)

            if (res.status === 400) {
                setWrongCred(true)
                return setTimeout(() => {
                    setWrongCred(false)
                }, 2000)
            }
            const data = await res.json()
            console.log(res.status)
            console.log("succesfully logged in")
            localStorage.setItem("token", JSON.stringify(data.token))
            navigate("/")
            console.log(data.token)
        }
        catch (err) {
            // setWrongCred(true)
            console.log(err)
        }
    }
    return (
        <>
            <Header />
            <div className="text-center my-auto">
                <div className="text-4xl text-blue-800 font-bold py-8 font-sans flex justify-center gap-2">
                    <FaRegUser />
                    <h1>Login</h1>
                </div>
                <form onSubmit={loginUser} className='bg-gray-100 py-8   mx-auto	'>

                    <div className="w-75 my-4 flex-1">
                        <input className="h-10 w-80 rounded-md border border-blue-500 border-2 indent-3 outline-0" type="email" value={email} onChange={e => { setEmail(e.target.value) }} placeholder="Email" required />
                    </div>
                    <div className="w-75 my-4 flex-1">
                        <input className="h-10 w-80 rounded-md border border-blue-500 border-2 indent-3 outline-0" type="password" value={password} onChange={e => { setPassword(e.target.value) }} placeholder="Password" required />
                    </div>
                    <div className="w-75 my-4 flex-1">
                        <button className="bg-blue-500 font-medium font-extrabold text-gray-50 w-80 px-4 py-3 rounded-md" type="submit">Login</button>
                    </div>
                    {wrongCred && <p className='text-red-500 opacity-80'>Incorrect Email or Password !</p>}
                </form>
                <p>You don't have an account, just register <Link to='/register' className="text-blue-600 font-medium underline">here</Link></p>
            </div>
        </>
    )
}

export default Login