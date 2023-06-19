import React, {useEffect, useState} from 'react';
import {Box} from '@mui/material';
import HeroBanner from '../../components/Exercises/HeroBanner'
import SearchExercises from '../../components/Exercises/SearchExercises'
import Exercises from '../../components/Exercises/Exercises'
import ReactJkMusicPlayer from "react-jinke-music-player";
import axios from "axios";
import {audioLists} from '../../data/audioLists'
const ExercisesPage = () => {
    const [exercises, setExercises] = useState([]);
    const [bodyPart, setBodyPart] = useState('all');
    const [playIndex, setPlayIndex] = useState(0)
    console.log(exercises);
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
        <Box>
            {musics ? <ReactJkMusicPlayer
                playIndex={playIndex}
                mode="mini"
                audioLists={musics}
                showMediaSession
                autoPlay={false}
            /> : <></>}
            <HeroBanner/>
            <SearchExercises
                setExercises={setExercises}
                bodyPart={bodyPart}
                setBodyPart={setBodyPart}
                exercises={exercises}
            />
            <Exercises setExercises={setExercises} exercises={exercises} bodyPart={bodyPart}/>

        </Box>
    );
};

export default ExercisesPage;