import React from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
export const Footer = () => {
    return (
        <div className=' flex justify-center items-center py-4 bg-gray-50  shadow font-monospace text-blue-900 font-xl font-bold  gap-3 fixed bottom-0   w-screen align-center'>
            <p>By Liban Hassan </p>
            <a href="https://github.com/thelibanhsn" target="_blank"><FaGithub /></a>
            <a href='https://www.linkedin.com/in/thelibanhsn/' target="_blank"><FaLinkedin /></a>
            <a href='https://twitter.com/TheLibanHsn' target="_blank"><FaTwitter /></a>
        </div>
    )
}
