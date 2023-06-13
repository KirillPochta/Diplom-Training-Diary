import { FormControl, FormHelperText, InputLabel, Input, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const LoginPage = () => {
    const [state, setState] = useState({});
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await axios.post('https://localhost:44366/auth/login', { ...state }, {
                withCredentials: true
            })
            navigate('/exercises');
        } catch {
            toast.error("Неверный логин или пароль")
        }
    }


    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const id = target.id;

        setState({
            ...state,
            [id]: value
        });
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'grid', maxWidth: '50%', margin: '35vh auto 35vh auto' }}>
            <FormControl>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input onChange={handleInputChange} id="email" aria-describedby="email-helper-text" />
                <FormHelperText id="email-helper-text">Ваш email.</FormHelperText>
            </FormControl>
            <FormControl style={{marginTop:"10px"}}>
                <InputLabel htmlFor="password">Пароль</InputLabel>
                <Input onChange={handleInputChange} type="password" id="password" aria-describedby="password-helper-text" />
                <FormHelperText id="password-helper-text">Ваш пароль.</FormHelperText>
            </FormControl>
            <Button type="submit">Логин</Button>
        </form>
    )
}