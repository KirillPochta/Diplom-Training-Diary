import { FolderDeleteRounded } from "@mui/icons-material"
import { Typography, Link, Box, FormControl, InputLabel, Input, Button, MenuItem, Select, List, ListItem, ListItemAvatar, Avatar } from "@mui/material"
import axios from "axios"
import React, { useEffect, useRef } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { audioLists } from "../../data/audioLists";
import ReactJkMusicPlayer from "react-jinke-music-player";

export const CabinetPage = () => {
    const [user, setUser] = useState(null)
    const [trainings, setTrainings] = useState([])
    const [proportions, setProportions] = useState({})
    const navigate = useNavigate()
    const ref = useRef(null)
    const [playIndex, setPlayIndex] = useState(0)

    const play = (x) => {
        const index = musics.indexOf(x)
        setPlayIndex(index)
    }
    useEffect(() => {
        async function fetchUser() {
            try {
                if (!user) {
                    const resp = await axios.get('https://localhost:44366/auth/user', { withCredentials: true })
                    setUser(resp.data)
                    console.log(resp.data)
                    const resp2 = await axios.get(`https://localhost:44366/training/GetUserTrainings/${resp.data.id}`, { withCredentials: true })
                    setTrainings(resp2.data)
                    const resp3 = await axios.get(`https://localhost:44366/user/GetUserBodyProporties/${resp.data.id}`)
                    setProportions(resp3.data)
                    console.log(resp3.data)
                }
            } catch {
                navigate('/login')
            }
        }
        fetchUser()
    }, [user, navigate])


    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const id = target.id ?? target.name;

        setProportions({
            ...proportions,
            [id]: value
        });
    }

    const handleInputChange2 = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const id = target.id ?? target.name;

        setUser({
            ...user,
            [id]: value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await axios.put('https://localhost:44366/user/UpdateBodyProportions', proportions)

        const resp3 = await axios.get(`https://localhost:44366/user/GetUserBodyProporties/${user.id}`)
        setProportions(resp3.data)
    }

    const handleSubmit3 = async (event) => {
        event.preventDefault()
        await axios.put('https://localhost:44366/user/UpdateUser', user)

        const resp = await axios.get('https://localhost:44366/auth/user', { withCredentials: true })
        setUser(resp.data)
    }

    const handleSubmit2 = async (event) => {
        const formdata = new FormData()
        formdata.append('FormFile', ref.current.files[0])
        formdata.append('FileName', ref.current.files[0].name)
        await fetch(`https://localhost:44366/api/picture/${user.id}`, {
            method: 'POST',
            body: formdata
        })
        setUser({ ...user, image: ref.current.files[0].name })
    }
    const [musics, setMusics] = useState(null)

    useEffect(() => {
        axios.get('https://localhost:44366/api/music/GetAudioTapes')
            .then(response => {
                setMusics(response.data);
                console.log(response.data)
            })
            .catch(error => console.log(error));
    }, [])
    return (
        <Box minHeight='90vh'>
            <Typography variant="h3" gutterBottom style={{ textAlign: 'center', paddingTop: '10px' }}>
                Личный кабинет
            </Typography>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', justifyItems: 'center', gap: '20px', borderBottom: '1px solid #DEDEDE' }}>
                <div style={{ borderRight: '1px solid #DEDEDE', paddingRight: '20px' }}>
                    <img style={{ width: "250px", borderRadius: "50%" }} alt={user?.name} src={`https://localhost:44366/api/picture/${user?.image}`}></img>
                    <form>
                        <input onChange={handleSubmit2} style={{ visibility: 'hidden', width: 0 }} id='file' required type='file' placeholder="Выбор аватара" accept="image/*" ref={ref} />
                        <Button><label htmlFor="file" class="MuiButton-root">Поменять аватар</label></Button>
                    </form>
                    <Typography>
                        <b>День рождения</b>: {new Date(user?.birth).toDateString()}
                    </Typography>
                    <Typography>
                        <b>Дата регистрации</b>: {new Date(user?.joined).toDateString()}
                    </Typography>
                    <Typography>
                        <b>У вас</b>: {proportions?.userFatness}
                    </Typography>
                    <Typography>
                        <b>Норма калорий по Миффлину— Сан Жеоре</b>: {proportions?.dailyNormalCaloriesMiffanSanJeora}
                    </Typography>
                </div>
                <form style={{ display: 'flex', flexDirection: 'column', width: '-webkit-fill-available', borderRight: '1px solid #DEDEDE', paddingRight: '50px' }}
                    onSubmit={handleSubmit3}>
                    <FormControl>
                        <label htmlFor="firstName">Имя</label>
                        <Input required value={user?.firstName} onChange={handleInputChange2} id="firstName" />
                    </FormControl>
                    <FormControl style={{ marginTop: '15px' }}>
                        <label htmlFor="lastName">Фамилия</label>
                        <Input required value={user?.lastName} onChange={handleInputChange2} id="lastName" />
                    </FormControl>
                    <FormControl style={{ marginTop: '15px' }}>
                        <label htmlFor="country">Страна</label>
                        <Input required value={user?.country} onChange={handleInputChange2} id="country" />
                    </FormControl>
                    <FormControl style={{ marginTop: '15px' }}>
                        <label htmlFor="countinterestsry">Интересы</label>
                        <Input required value={user?.interests} onChange={handleInputChange2} id="interests" />
                    </FormControl>
                    <FormControl style={{ marginTop: '15px' }}>
                        <label htmlFor="email">Email</label>
                        <Input required type="email" value={user?.email} onChange={handleInputChange2} id="email" />
                    </FormControl>
                    <Button type="submit">Изменить</Button>
                </form>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '-webkit-fill-available', paddingRight: '50px' }}>
                    <FormControl>
                        <label htmlFor="activity">Активность</label>
                        <Select required value={proportions.activity ?? "Малоподвижный"} name="activity" id="activity" onChange={handleInputChange} aria-describedby="activity-helper-text">
                            <MenuItem value="Малоподвижный">Малоподвижный</MenuItem>
                            <MenuItem value="Тренировки 1-3 раза в неделю">Тренировки 1-3 раза в неделю</MenuItem>
                            <MenuItem value="Тренировки 3-5 раза в неделю">Тренировки 3-5 раза в неделю</MenuItem>
                            <MenuItem value="Высокие нагрузки каждый день">Высокие нагрузки каждый день</MenuItem>
                            <MenuItem value="Экстремальные нагрузки">Экстремальные нагрузки</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ marginTop: '15px' }}>
                        <label htmlFor="goal">Цель</label>
                        <Select required value={proportions.goal ?? "Сбросить вес"} name='goal' id="goal" onChange={handleInputChange} aria-describedby="goal-helper-text">
                            <MenuItem value="Сбросить вес">Сбросить вес</MenuItem>
                            <MenuItem value="Набрать мышечную массу">Набрать мышечную массу</MenuItem>
                            <MenuItem value="Поддерживать вес">Поддерживать вес</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ marginTop: '15px' }}>
                        <label htmlFor="weight">Вес</label>
                        <Input required value={proportions.weight} onChange={handleInputChange} id="weight" />
                    </FormControl>
                    <FormControl style={{ marginTop: '15px' }}>
                        <label htmlFor="height">Рост</label>
                        <Input required value={proportions.height} onChange={handleInputChange} id="height" />
                    </FormControl>
                    <FormControl style={{ marginTop: '15px' }}>
                        <label htmlFor="waist">Обхват талии</label>
                        <Input required value={proportions.waist} onChange={handleInputChange} id="waist" />
                    </FormControl>
                    <FormControl style={{ marginTop: '15px' }}>
                        <label htmlFor="chest">Обхват груди</label>
                        <Input required value={proportions.chest} onChange={handleInputChange} id="chest" />
                    </FormControl>
                    <Button type="submit">Изменить</Button>
                </form>
            </div>
            <div style={{ padding: '30px' }}>
                <Typography variant="h4" gutterBottom style={{ paddingTop: '30px' }}>
                    История упражнений:
                </Typography>
                <List>
                    {trainings.map(x =>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <FitnessCenterIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <Typography>
                                <Link href={`/exercise/${x.id}`}>{x.name}</Link>
                            </Typography>
                        </ListItem>
                    )}
                </List>
                {musics ? <ReactJkMusicPlayer
                    playIndex={playIndex}
                    mode="mini"
                    audioLists={musics}
                    showMediaSession
                    autoPlay={false}
                /> : <></>}
            </div>
        </Box>
    )
}