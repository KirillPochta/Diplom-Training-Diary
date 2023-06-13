import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

export const Logout = () => {

    const navigate = useNavigate()
    useEffect(() => {
        async function a() {
            await axios.post('https://localhost:44366/auth/logout', {}, { withCredentials: true })
            navigate('/')
        }
        a()
    })
    return null
}