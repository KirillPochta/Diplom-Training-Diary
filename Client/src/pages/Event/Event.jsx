import React, { useEffect, useState } from 'react';
import EventCalendar from '../../components/EventCalendar';
import { Layout, Row, Button, Modal } from 'antd';
import EventForm from '../../components/EventForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../features/event/eventSlice';
import { fetchNotes } from '../../features/notesList/notesListSlice';
import ReactJkMusicPlayer from "react-jinke-music-player";
import {audioLists} from "../../data/audioLists";

const Event = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();
    const [user, setUser] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
      async function fetchUser() {
        try {
          if (!user) {
            const resp = await axios.get('https://localhost:44366/auth/user', { withCredentials: true })
            setUser(resp.data)
          }
        } catch {
          navigate('/login')
        }
      }
      fetchUser()
    }, [user, navigate])
  
    const status = useSelector(state => state.notesList.status)
    const [musics, setMusics] = useState(null)

    useEffect(() => {
        axios.get('https://localhost:44366/api/music/GetAudioTapes')
            .then(response => {
                setMusics(response.data);
                console.log(response.data)
            })
            .catch(error => console.log(error));
    }, [])
    useEffect(() => {
      if (status === 'idle' || !status) {
        if (user.id) {
          dispatch(fetchNotes(user.id))
          dispatch(fetchEvents(user.id))
        }
      }
    }, [status, dispatch, user.id])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleAddNewEvent = () => {
        setIsModalOpen(false);
    };
    const [playIndex, setPlayIndex] = useState(0)

    const play = (x) => {
        const index = audioLists.indexOf(x)
        setPlayIndex(index)
    }
    return (
        <div>
            <Layout>
                <EventCalendar />
                 
            </Layout>
            {musics ? <ReactJkMusicPlayer
                playIndex={playIndex}
                mode="mini"
                audioLists={musics}
                showMediaSession
                autoPlay={false}
            /> : <></>}
        </div>


    );
};

export default Event;
