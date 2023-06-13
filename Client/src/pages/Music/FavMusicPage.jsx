import { Box, Button } from "@mui/material";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'; import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReactJkMusicPlayer from "react-jinke-music-player"
import "react-jinke-music-player/assets/index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import locale from 'antd/es/date-picker/locale/ru_RU';
import { DatePicker } from "antd";
import { toast } from "react-toastify";
import { createEventMusic } from '../../features/event/eventSlice';
import { formatDate } from "../../utils/date";
import BgImg from '../../assets/bgImg.jpg'


export const FavMusicPage = () => {
    const [user, setUser] = useState(null)
     const navigate = useNavigate()
    const dispatch = useDispatch();
    const [event, setEvent] = useState({ date: '', info: 'Избранная музыка' });

    const handlePlan = async () => {
        let today = new Date();
        today.setHours(0, 0, 0, 0)
        if (new Date(event.date).getTime() < today.getTime()) {
            toast.error("Вы не можете запланировать упражнение на прошлое")
            return
        }

        dispatch(createEventMusic({ ...event, userId: user.id }));
    }

    const onChange = (date, dateString) => {
        if (date) setEvent({ ...event, date: formatDate(date?.toDate()) });
    };

    useEffect(() => {
        async function fetchUser() {
            try {
                if (!user) {
                    const resp = await axios.get('https://localhost:44366/auth/user', { withCredentials: true })
                    setUser(resp.data)
                }
            } catch {
                navigate('/music')
            }
        }
        fetchUser()
    }, [user])
    const [musics, setMusics] = useState(null)

    useEffect(() => {
        axios.get('https://localhost:44366/api/music/GetAudioTapes')
            .then(response => {
                setMusics(response.data);
                console.log(response.data)
            })
            .catch(error => console.log(error));
    }, [])
    const handleFavChange = async (IsAdd, index) => {
        if (IsAdd) {
            const newUser = {
                ...user,
                favMusic: (user.favMusic ?? ',') + `${index},`
            }
            setUser(newUser)
            await axios.put('https://localhost:44366/user/UpdateUser', newUser)
        }
        else {
            const newUser = {
                ...user,
                favMusic: user.favMusic.replace(`,${index},`, ',')
            }
            setUser(newUser)
            await axios.put('https://localhost:44366/user/UpdateUser', newUser)
        }
    }

    const [playIndex, setPlayIndex] = useState(0)

    const play = (x) => {
        const index = musics.indexOf(x)
        setPlayIndex(index)
    }

    return (
        <Box style={{
            padding: '0 100px 80px 100px', backgroundImage: `url(${BgImg})`,
            height: '100vh',
            width: '100vw',
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
        }}>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "5px" }}>
                <KeyboardBackspaceIcon style={{ transform: 'scale(1.8)', marginTop: '4px' }}
                    onClick={() => navigate('/music')} />
                <DatePicker style={{ marginLeft: '15px' }} locale={locale} onChange={onChange} />
                <Button style={{ color: "black", marginLeft: '15px' }} disabled={!event.date} onClick={handlePlan}>Запланировать
                    плейлист</Button>
            </div>
            {
                musics?.filter(x => user?.favMusic?.split(',').includes(musics.indexOf(x).toString())).map(x => (
                    <div style={{ display: 'flex', margin: '5px' }}>
                        <img src={x.cover} width={50} height={50} />
                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px', width: '500px' }}>
                            <h3>{x.name}</h3>
                            <span>{x.singer}</span>
                        </div>
                        <div style={{
                            width: '100%', display: 'flex', flexDirection: 'row-reverse',
                            alignContent: 'center', flexWrap: 'wrap'
                        }}>
                            {user?.favMusic?.split(',').includes(musics.indexOf(x).toString()) ?
                                <FavoriteIcon onClick={() => handleFavChange(false, musics.indexOf(x))}
                                    style={{ transform: 'scale(1.8)', margin: '0 15px' }} /> :
                                <FavoriteBorderIcon onClick={() => handleFavChange(true, musics.indexOf(x))}
                                    style={{ transform: 'scale(1.8)', margin: '0 15px' }} />
                            }
                            <PlayCircleIcon style={{ transform: 'scale(1.8)', margin: '0 15px' }} onClick={() => play(x)} />
                        </div>
                    </div>))
            }
            <ReactJkMusicPlayer
                playIndex={playIndex}
                mode="full"
                audioLists={musics?.filter(x => user?.favMusic?.split(',').includes(musics.indexOf(x).toString()))}
                showMediaSession
                autoPlay={false}
            />
        </Box >
    )
}