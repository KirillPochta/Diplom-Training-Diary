import React, { useEffect, useState } from "react";

//styles
import {
  ButtonOutline,
  Container,
  NotesContainer,
  EmptyMsgBox,
} from "../../styles/styles";
import { TopBox, Box, InputBox } from "./AllNotes.styles";

//icons
import { BiSearch } from "react-icons/bi";
import { FaSortAmountDown } from "react-icons/fa";

//reddux
import { useDispatch, useSelector } from "react-redux";
import { toggleFiltersModal } from "../../features";

import { FiltersModal, NoteCard } from "../../components";

import { getAllNotes } from "../../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchNotes } from "../../features/notesList/notesListSlice";
import {audioLists} from "../../data/audioLists";
import ReactJkMusicPlayer from "react-jinke-music-player";

const AllNotes = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(false)
  const navigate = useNavigate()
  const [playIndex, setPlayIndex] = useState(0)

  const play = (x) => {
    const index = audioLists.indexOf(x)
    setPlayIndex(index)
  }
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
   const [musics, setMusics] = useState(null)

    useEffect(() => {
        axios.get('https://localhost:44366/api/music/GetAudioTapes')
            .then(response => {
                setMusics(response.data);
                console.log(response.data)
            })
            .catch(error => console.log(error));
    }, [])
  const status = useSelector(state => state.status)

  useEffect(() => {
    if (status === 'idle' || !status) {
      if (user.id) {
        dispatch(fetchNotes(user.id))
      }
    }
  }, [status, dispatch, user.id])

  const { mainNotes } = useSelector((state) => state.notesList);
  const { viewFiltersModal } = useSelector((state) => state.modal);

  const [filter, setFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // handle all filters
  const filterHandler = (e) => {
    setFilter(e.target.value);
  };

  //clear.filters handler
  const clearHandler = () => {
    setFilter("");
  };

  const searchResult = () => {
    const searchedNotes = mainNotes.filter(({ title }) =>
      title.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (searchedNotes.length > 0) {
      return (
        <NotesContainer>
          {searchedNotes.map((note) => (
            <NoteCard key={note.id} note={note} type="notes" />
          ))}
        </NotesContainer>
      );
    } else {
      return <EmptyMsgBox>Ничего не найдено</EmptyMsgBox>;
    }
  };

  return (
    <Container>
      {/* filter modal */}
      {viewFiltersModal && (
        <FiltersModal
          handleFilter={filterHandler}
          handleClear={clearHandler}
          filter={filter}
        />
      )}
      {/* notes */}
      {mainNotes.length === 0 ? (
        <EmptyMsgBox>Заметок пока нет.</EmptyMsgBox>
      ) : (
        <>
          <TopBox>
            <InputBox>
              <div className="notes__search-icon">
                <BiSearch />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Поиск заметки"
              />
            </InputBox>
            <div className="notes__filter-btn">
              <ButtonOutline
                onClick={() => dispatch(toggleFiltersModal(true))}
                className="nav__btn"
              >
                <FaSortAmountDown /> <span>Фильтры</span>
              </ButtonOutline>
            </div>
          </TopBox>

          <Box>
            {searchInput !== ""
              ? searchResult()
              : getAllNotes(mainNotes, filter, searchInput)}
          </Box>
        </>
      )}
      <ReactJkMusicPlayer
          playIndex={playIndex}
          mode="mini"
          audioLists={musics?.filter(x => user?.favMusic?.split(',').includes(musics.indexOf(x).toString()))}
          showMediaSession
          autoPlay={false}
      />
    </Container>
  );
};

export default AllNotes;
