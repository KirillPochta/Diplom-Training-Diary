import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { v4 } from "uuid";
import dayjs from "dayjs";
import locale from 'antd/es/date-picker/locale/ru_RU';

//styles
import { FixedContainer, DeleteBox } from "../Modal.styles";
import {
  Box,
  TopBox,
  StyledInput,
  AddedTagsBox,
  OptionsBox,
} from "./CreateNoteModal.styles";
import { ButtonFill, ButtonOutline } from "../../../styles/styles";

//icons
import { FaTimes, FaPlus } from "react-icons/fa";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  toggleTagsModal,
  toggleCreateNoteModal,
  setMainNotes,
  setEditNote,
} from "../../../features";

//components
import TextEditor from "../../TextEditor/TextEditor";
import TagsModal from "../TagsModal/TagsModal";
import { pushNotes, updateNote } from "../../../features/notesList/notesListSlice";
import axios from "axios";
import { DatePicker } from "antd";
import { formatDate } from "../../../utils/date";
import { createEvent } from "../../../features/event/eventSlice";

const CreateNoteModal = () => {
  const dispatch = useDispatch();

  const { viewAddTagsModal } = useSelector((state) => state.modal);
  const { tagsList } = useSelector((state) => state.tags);
  const { editNote } = useSelector((state) => state.notesList);

  const [noteTitle, setNoteTitle] = useState(editNote?.title || "");
  const [value, setValue] = useState(editNote?.content || "");
  const [addedTags, setAddedTags] = useState(editNote?.tags || []);
  const [noteColor, setNoteColor] = useState(editNote?.color || "");
  const [priority, setPriority] = useState(editNote?.priority || "low");

  //deleting tag from added tags when the tag is deleted from the main tags list
  useEffect(() => {
    setAddedTags((prev) =>
      prev.filter(({ tag }) => tagsList.find((obj) => obj.tag === tag))
    );
  }, [tagsList]);

  //add tags to note
  const tagsHandler = (tag, type) => {
    const newTag = tag.toLowerCase();

    if (type === "add") {
      setAddedTags((prev) => [...prev, { tag: newTag, id: v4() }]);
    } else {
      setAddedTags(addedTags.filter(({ tag }) => tag !== newTag));
    }
  };

  // create note
  const createNoteHandler = async () => {
    if (!noteTitle) {
      toast.error("Отсутсвует заголовок");
      return;
    } else if (value === "<p><br></p>") {
      toast.error("Отсутсвует тело записки");
      return;
    }
    else if (noteTitle.length < 5) {
      toast.error("Название слишком короткое!")
      return
    }
    let today = new Date();
    today.setHours(0, 0, 0, 0)
    if (new Date(event.date).getTime() < today.getTime()) {
      toast.error("Вы не можете создать событие в прошлом")
      return
    }
    
    const date = dayjs().format("DD/MM/YY h:mm A");

    let note = {
      title: noteTitle,
      content: value,
      tags: addedTags,
      color: noteColor,
      priority,
      editedTime: new Date().getTime(),
      eventDate: event.date
    };

    const user = (await axios.get('https://localhost:44366/auth/user', { withCredentials: true })).data

    if (editNote) {
      note = { ...editNote, ...note, eventDate: event.date};

    } else {
      note = {
        ...note,
        date,
        createdTime: new Date().getTime(),
        editedTime: null,
        isPinned: false,
        isRead: false,
        userId: user.id,
        eventDate: event.date
      };
      toast.success("Заметка создана!")

    }

    if (editNote) {
      dispatch(updateNote(note))
      toast.success("Заметка обнавлена!")

    }
    else{
      console.log(event.date)
      dispatch(pushNotes(note))
    }

    dispatch(setMainNotes(note));
    dispatch(toggleCreateNoteModal(false));
    dispatch(setEditNote(null));
  };

  const [event, setEvent] = useState(null);

  const onChange = (date, dateString) => {
    if (date) setEvent({date: formatDate(date?.toDate()) });
  };

  return (
    <FixedContainer>
      {viewAddTagsModal && (
        <TagsModal type="add" addedTags={addedTags} handleTags={tagsHandler} />
      )}

      <Box>
        <TopBox>
          <div className="createNote__title">Создать заметку</div>
          <DeleteBox
            className="createNote__close-btn"
            onClick={() => dispatch(toggleCreateNoteModal(false))}
          >
            <FaTimes />
          </DeleteBox>
        </TopBox>

        <StyledInput
          type="text"
          value={noteTitle}
          name="title"
          placeholder="Название..."
          onChange={(e) => setNoteTitle(e.target.value)}
        />

        <div>
          <TextEditor value={value} setValue={setValue} color={noteColor} />
        </div>

        <AddedTagsBox>
          {addedTags.map(({ tag, id }) => (
            <div key={id}>
              <span className="createNote__tag">{tag}</span>
              <span
                onClick={() => tagsHandler(tag, "remove")}
                className="createNote__tag-remove"
              >
                <FaTimes />
              </span>
            </div>
          ))}
        </AddedTagsBox>

        <OptionsBox>
          <div>
            <label htmlFor="color">Цвет фона : </label>
            <select
              value={noteColor}
              id="color"
              onChange={(e) => setNoteColor(e.target.value)}
            >
              <option value="">Белый</option>
              <option value="#ffcccc">Красный</option>
              <option value="#ccffcc">Зеленый</option>
              <option value="#cce0ff">Синий</option>
              <option value="#ffffcc">Жёлтый</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority">Приоритет : </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              id="priority"
            >
              <option value="low">Низкий</option>
              <option value="high">Высокий</option>
            </select>
          </div>
        </OptionsBox>

        <DatePicker locale={locale} onChange={onChange} />
        <div className="createNote__create-btn">
          <ButtonFill disabled={!event || !event.date} onClick={createNoteHandler}>
            {editNote ? (
              <span>Изменить</span>
            ) : (
              <>
                <FaPlus /> <span>Создать</span>
              </>
            )}
          </ButtonFill>
        </div>
      </Box>
    </FixedContainer>
  );
};

export default CreateNoteModal;
