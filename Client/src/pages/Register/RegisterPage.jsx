import { Button, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select } from "@mui/material"
import { DatePicker } from "antd"
import axios from "axios";
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const RegisterPage = (props) => {
    const [state, setState] = useState({});
    const navigate = useNavigate()
    const ref = useRef(null)


    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const id = target.id ?? target.name;

        setState({
            ...state,
            [id]: value
        });
    }

    const handleDateChange = (event) => {
        setState({
            ...state,
            year: event.$y,
            month: event.$M,
            day: event.$D
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const registerResponce = await fetch('https://localhost:44366/auth/register', {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(state),
            method: 'POST',
        })
        if (registerResponce.ok) {

            const formdata = new FormData()
            formdata.append('FormFile', ref.current.files[0])
            formdata.append('FileName', ref.current.files[0].name)
            const picresponce = await fetch(`https://localhost:44366/api/picture/${(await registerResponce.json()).id}`, {
                method: 'POST',
                body: formdata
            })

            if (props.notLogin)
                return

            if (picresponce.ok) {
                await axios.post('https://localhost:44366/auth/login', { email: state.email, password: state.password }, {
                    withCredentials: true
                })
                navigate('/exercises');
            }
            else {
                toast.error("Ошибка при загрузке аватара")
            }
        }
        else {
            toast.error((await registerResponce.json()).message)
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'grid', maxWidth: '50%', margin: '10px auto', height: '200vh' }}>
            <input style={{ visibility: 'hidden', width: 0 }} id='file' required type='file' placeholder="Выбор аватара" accept="image/*" ref={ref} />
            <Button><label htmlFor="file">Выберите аватар</label></Button>
            <FormControl>
                <InputLabel htmlFor="firstName">Имя</InputLabel>
                <Input required value={state.firstName} onChange={handleInputChange} id="firstName" aria-describedby="firstName-helper-text" />
                <FormHelperText id="firstName-helper-text">Ваше имя.</FormHelperText>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="lastName">Фамилия</InputLabel>
                <Input required value={state.lastName} onChange={handleInputChange} id="lastName" aria-describedby="lastName-helper-text" />
                <FormHelperText id="lastName-helper-text">Ваша фамилия.</FormHelperText>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input required value={state.email} onChange={handleInputChange} id="email" aria-describedby="email-helper-text" />
                <FormHelperText id="email-helper-text">Ваш email.</FormHelperText>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="interests">Интересы</InputLabel>
                <Input required value={state.interests} onChange={handleInputChange} id="interests" aria-describedby="interests-helper-text" />
                <FormHelperText id="interests-helper-text">Ваши интересы</FormHelperText>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="country">Страна</InputLabel>
                <Input required value={state.country} onChange={handleInputChange} id="country" aria-describedby="country-helper-text" />
                <FormHelperText id="country-helper-text">Ваша страна</FormHelperText>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="weight">Вес</InputLabel>
                <Input required value={state.weight} onChange={handleInputChange} type="number" id="weight" aria-describedby="weight-helper-text" />
                <FormHelperText id="weight-helper-text">Ваш вес.</FormHelperText>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="height">Рост</InputLabel>
                <Input required value={state.height} onChange={handleInputChange} type="number" id="height" aria-describedby="height-helper-text" />
                <FormHelperText id="height-helper-text">Ваш рост.</FormHelperText>
            </FormControl>
            <FormControl fullWidth>
                <label htmlFor="gender">Пол</label>
                <Select required value={state.gender} name="gender" id="gender" onChange={handleInputChange} aria-describedby="gender-helper-text">
                    <MenuItem value="Male">Мужской</MenuItem>
                    <MenuItem value="Female">Женский</MenuItem>
                </Select>
                <FormHelperText id="gender-helper-text">Ваш пол.</FormHelperText>
            </FormControl>
            <FormControl fullWidth>
                <label htmlFor="activity">Активность</label>
                <Select required value={state.activity} name="activity" id="activity" onChange={handleInputChange} aria-describedby="activity-helper-text">
                    <MenuItem value="Малоподвижный">Малоподвижный</MenuItem>
                    <MenuItem value="Тренировки 1-3 раза в неделю">Тренировки 1-3 раза в неделю</MenuItem>
                    <MenuItem value="Тренировки 3-5 раза в неделю">Тренировки 3-5 раза в неделю</MenuItem>
                    <MenuItem value="Высокие нагрузки каждый день">Высокие нагрузки каждый день</MenuItem>
                    <MenuItem value="Экстремальные нагрузки">Экстремальные нагрузки</MenuItem>
                </Select>
                <FormHelperText id="activity-helper-text">Ваша активность.</FormHelperText>
            </FormControl>
            <FormControl fullWidth>
                <label htmlFor="goal">Цель</label>
                <Select required value={state.goal} name='goal' id="goal" onChange={handleInputChange} aria-describedby="goal-helper-text">
                    <MenuItem value="Сбросить вес">Сбросить вес</MenuItem>
                    <MenuItem value="Набрать мышечную массу">Набрать мышечную массу</MenuItem>
                    <MenuItem value="Поддерживать вес">Поддерживать вес</MenuItem>
                </Select>
                <FormHelperText id="goal-helper-text">Ваша цель.</FormHelperText>
            </FormControl>
            <FormControl>
                <DatePicker onChange={handleDateChange} placeholder="Your birthday" type="date" id="birthday" aria-describedby="birthday-helper-text" />
                <FormHelperText id="birthday-helper-text">Ваша дата рождения.</FormHelperText>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="password" value={state.password}>Пароль</InputLabel>
                <Input required onChange={handleInputChange} type="password" id="password" aria-describedby="password-helper-text" />
                <FormHelperText id="password-helper-text">Ваш пароль.</FormHelperText>
            </FormControl>
            <Button type="submit">Зарегистрироваться</Button>
        </form>
    )
}