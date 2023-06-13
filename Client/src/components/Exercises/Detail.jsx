import {Button, Stack, Typography} from '@mui/material';
import React, {useState} from 'react';
import BodyPartImage from '../../assets/exercises/icons/body-part.png';
import TargetImage from '../../assets/exercises/icons/target.png';
import EquipmentImage from '../../assets/exercises/icons/equipment.png';

import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {DatePicker} from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import {formatDate} from '../../utils/date';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {createEvent} from '../../features/event/eventSlice';
import ReactJkMusicPlayer from "react-jinke-music-player";
import {audioLists} from "../../data/audioLists";

const Detail = ({exerciseDetail, showButton, userId}) => {
    const navigate = useNavigate();
    const [event, setEvent] = useState({date: '', info: exerciseDetail.name});
    const {bodyPart, gifUrl, name, target, equipment} = exerciseDetail;
    const dispatch = useDispatch();
    const [playIndex, setPlayIndex] = useState(0)

    const play = (x) => {
        const index = audioLists.indexOf(x)
        setPlayIndex(index)
    }
    const onChange = (date, dateString) => {
        if (date) setEvent({...event, date: formatDate(date?.toDate())});
    };

    const handleAddExercise = async () => {
        let today = new Date();
        today.setHours(0, 0, 0, 0)
        if (new Date(event.date).getTime() < today.getTime()) {
            toast.error("Вы не можете запланировать упражнение на прошлое")
            return
        }
        const user = await (await axios.get('https://localhost:44366/auth/user', {withCredentials: true})).data
        try {

            await axios.post('https://localhost:44366/training/AddUserTraining', {
                trainingId: exerciseDetail.id,
                userId: user.id,
                name,
                bodyPart,
                gifUrl
            })

        } catch {
        }
        dispatch(createEvent({...event, userId}));

    };
    const extraDetail = [
        {
            icon: BodyPartImage,
            name: bodyPart,
        },
        {
            icon: TargetImage,
            name: target,
        },
        {
            icon: EquipmentImage,
            name: equipment,
        },
    ];
    return (
        <div>
            <Stack gap="60px" sx={{flexDirection: {lg: 'row'}, p: '20px', alignItems: 'center'}}>
                <img src={gifUrl} alt={name} loading="lazy" className="detail-image"/>
                <Stack sx={{gap: {lg: '35px', xs: '20px'}}}>
                    <Typography
                        sx={{fontSize: {lg: '64px', xs: '30px'}}}
                        fontWeight={700}
                        textTransform="capitalize">
                        {name}
                    </Typography>
                    <Typography sx={{fontSize: {lg: '24px', xs: '18px'}}} color="#4F4C4C">
                        Тренировки делают вас сильнее. <br/>{' '}
                        <span style={{textTransform: 'capitalize'}}>{name}</span> - одно из лучших
                        упражнений для группы мышц {target}.<br/> Оно даст вам заряд хорошего
                        настроения и энергии.
                    </Typography>
                    {extraDetail?.map((item) => (
                        <Stack key={item.name} direction="row" gap="24px" alignItems="center">
                            <Button
                                sx={{
                                    background: '#FFF2DB',
                                    borderRadius: '50%',
                                    width: '100px',
                                    height: '100px',
                                }}>
                                <img
                                    src={item.icon}
                                    alt={bodyPart}
                                    style={{width: '50px', height: '50px'}}
                                />
                            </Button>
                            <Typography
                                textTransform="capitalize"
                                sx={{fontSize: {lg: '30px', xs: '20px'}}}>
                                {item.name}
                            </Typography>
                        </Stack>
                    ))}
                    {
                        showButton ?
                            <>
                                <DatePicker locale={locale} onChange={onChange}/>
                                <Button
                                    disabled={!event.date}
                                    onClick={() => handleAddExercise()}
                                    sx={{
                                        background: '#FFF2DB',
                                        borderRadius: '20px',
                                        padding: '20px',
                                        fontWeight: '700',
                                        width: '50%',
                                        color: 'rgb(255, 38, 37)',
                                    }}>
                                    Запланировать упражнение
                                </Button>
                            </> :
                            null
                    }
                </Stack>
            </Stack>
            <ReactJkMusicPlayer
                playIndex={playIndex}
                mode="mini"
                audioLists={audioLists}
                showMediaSession
                autoPlay={false}
            />
        </div>
    );
};

export default Detail;
