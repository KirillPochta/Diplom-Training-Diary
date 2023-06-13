import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveCircleOutlineTwoToneIcon from '@mui/icons-material/RemoveCircleOutlineTwoTone';
import ReactJkMusicPlayer from "react-jinke-music-player"
import "react-jinke-music-player/assets/index.css";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Modal,
    Form
} from 'antd';
import { toast } from "react-toastify";
import { Tune } from '@mui/icons-material';
import BgImg from '../../assets/bgImg.jpg'

export const MusicPage = () => {
    const [user, setUser] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [musics, setMusics] = useState([]);
    const [playIndex, setPlayIndex] = useState(0)
    const [state, setState] = useState({ name: '', singer: '' });
    const navigate = useNavigate();
    const picRef = useRef(null)
    const audioRef = useRef(null)
    useEffect(() => {
        async function fetchUser() {
            try {
                if (!user) {
                    const resp = await axios.get('https://localhost:44366/auth/user', { withCredentials: true })
                    setUser(resp.data)
                }
            } catch { }
        }
        fetchUser()
    }, [user])

    const handleDeleteMusic = async (id) => {
        await axios.delete('https://localhost:44366/api/music/Delete/' + id)
        await axios.get('https://localhost:44366/api/music/GetAudioTapes')
            .then(response => {
                setMusics(response.data);
            })
            .catch(error => console.log(error));
    }
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
    useEffect(() => {
        axios.get('https://localhost:44366/api/music/GetAudioTapes')
            .then(response => {
                setMusics(response.data);

            })
            .catch(error => console.log(error));
    }, [])

    const userCheck = () => {
        if (user && user.roleId === 2) {
            return (
                <div style={{ overflow: "hidden" }}>
                    <Button style={{ color: "black", float: "left", fontSize: "20px", padding: "0px 15px" }}
                        onClick={() => navigate('/fav-music')}>Избранная музыка</Button>
                </div>
            );
        } else if (user) {
            return (
                <div style={{ overflow: "hidden" }}>
                    <Button style={{ color: "black", float: "left", fontSize: "20px", padding: "0px 15px" }}
                        onClick={() => navigate('/fav-music')}>Избранная музыка</Button>

                    <Button style={{ color: 'black', float: 'right', fontSize: '20px', padding: '0px 15px' }}
                        onClick={showModal}>Добавить новую музыку</Button>
                </div>
            );
        }
    };

    const play = (x) => {
        const index = musics.indexOf(x)
        setPlayIndex(index)
    }
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsModalOpen(false);
    };


    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const id = target.id ?? target.name;

        setState({
            ...state,
            [id]: value
        });
    }


    const handleSubmit = async (event) => {
        setIsModalOpen(false)
        console.log("SUMBIT")
        event.preventDefault()
        const formdata = new FormData()

        if (typeof picRef.current?.files[0] === 'undefined' || typeof audioRef.current?.files[0] === 'undefined') {
            toast.warn('Файл(ы) не выбран(ы)')
            return
        }
        else if (state.name.length < 4)
            toast.warn("Название слишком короткое!")

        else if (state.singer.length < 4)
            toast.warn("Имя исполнителя сликом короткое!")
        else if (picRef.current.files[0] == null)
            toast.warn("Выберите изображение!")
        else if (audioRef.current.files[0] == null)
            toast.warn("Выберите аудиозапись!")
        else {
            formdata.append('Name', state.name)
            formdata.append('Singer', state.singer)
            formdata.append('CoverFile', picRef.current.files[0])
            formdata.append('CoverSrc', picRef.current.files[0].name)
            formdata.append('MusicFile', audioRef.current.files[0])
            formdata.append('MusicSrc', audioRef.current.files[0].name)
            console.log(formdata)
            await fetch(`https://localhost:44366/api/music`, {
                method: 'POST',
                body: formdata
            })
            await axios.get('https://localhost:44366/api/music/GetAudioTapes')
                .then(response => {
                    setMusics(response.data);

                })
                .catch(error => console.log(error))
            state.name = ''
            state.singer = ''
            picRef.current.files[0] = null
            picRef.current.files[0].name = ''
            audioRef.current.files[0] = null
            audioRef.current.files[0].name = ''
            setIsModalOpen(false)
        }
    }

    return (
        <div style={{
            padding: '0 100px 80px 100px', backgroundImage: `url(${BgImg})`,
            height: '100vh',
            width: '100vw',
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
        }}>
            <Modal title="Добавление музыки"
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={handleCancel}
                cancelText="Закрыть"
                okText="Добавить"
            >
                <Form>
                    <h1>Введите название песни</h1>
                    <input style={{ fontSize: "20px", width: "450px" }}
                        required value={state.name}
                        onChange={handleInputChange}
                        id="name"
                        name="name"
                        placeholder="Песня" />
                    <h1>Введите название исполнителя</h1>
                    <input style={{ fontSize: "20px", width: "450px" }}
                        required value={state.singer}
                        onChange={handleInputChange}
                        id="singer"
                        name="singer"
                        placeholder="Певец" />
                    <h1>Выберите обложку</h1>
                    <input style={{}} id='file' required type='file'
                        accept="image/*" ref={picRef} />
                    <h1>Выберите песню</h1>
                    <input style={{}} id='file' required type='file'
                        accept=".mp3" ref={audioRef} />
                </Form>
            </Modal>
            <div style={{ marginTop: "5px" }}>{userCheck()}</div>

            {
                musics.map(x => (
                    <div style={{ display: 'flex', margin: '5px' }}>
                        <img src={x.cover} width={50} height={50} style={{ borderRadius: "50%" }} />
                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px', width: '500px' }}>
                            <h3>{x.name}</h3>
                            <span>{x.singer}</span>
                        </div>
                        <div style={{
                            width: '100%', display: 'flex', flexDirection: 'row-reverse',
                            alignContent: 'center', flexWrap: 'wrap'
                        }}>
                            {!user ?
                                (<PlayCircleIcon style={{ transform: 'scale(1.8)', margin: '0 15px' }} onClick={() => play(x)} />)
                                :
                                <> {user.roleId === 1 ? <RemoveCircleOutlineTwoToneIcon onClick={() => handleDeleteMusic(x.id)} style={{ transform: 'scale(1.8)', margin: '0 15px' }} /> : null }
                                    {user?.favMusic?.split(',').includes(musics.indexOf(x).toString()) ?
                                        <FavoriteIcon onClick={() => handleFavChange(false, musics.indexOf(x))}
                                            style={{ transform: 'scale(1.8)', margin: '0 15px' }} /> :
                                        <FavoriteBorderIcon onClick={() => handleFavChange(true, musics.indexOf(x))}
                                            style={{ transform: 'scale(1.8)', margin: '0 15px' }} />
                                    }
                                    <PlayCircleIcon style={{ transform: 'scale(1.8)', margin: '0 15px' }} onClick={() => play(x)} />
                                </>
                            }




                        </div>
                    </div>))
            }
            <ReactJkMusicPlayer
                playIndex={playIndex}
                mode="full"
                audioLists={musics}
                showMediaSession
                autoPlay={false}
            />
        </div >
    )
}