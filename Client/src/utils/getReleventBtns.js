import { NotesIconBox } from "../styles/styles";

//icons
import { FaTrash, FaArchive, FaTrashRestore, FaEdit } from "react-icons/fa";
import { RiInboxUnarchiveFill } from "react-icons/ri";

//redux
import {
  setArchiveNotes,
  setTrashNotes,
  unarchiveNote,
  restoreNote,
  deleteNote,
  setEditNote,
  toggleCreateNoteModal,
} from "../features";
import { deleteNotefromServer } from "../features/notesList/notesListSlice";

const getReleventBtns = (type, note, dispatch) => {
  const clickHandler = () => {
    dispatch(setEditNote(note));
    dispatch(toggleCreateNoteModal(true));
  };

  if (type === "archive") {
    return (
      <>
        <NotesIconBox
          onClick={() => dispatch(unarchiveNote(note))}
          data-info="Unarchive"
        >
          <RiInboxUnarchiveFill style={{ fontSize: "1rem" }} />
        </NotesIconBox>
        <NotesIconBox
          onClick={() => dispatch(setTrashNotes(note))}
          data-info="Delete"
        >
          <FaTrash />
        </NotesIconBox>
      </>
    );
  } else if (type === "trash") {
    return (
      <>
        <NotesIconBox
          onClick={() => dispatch(restoreNote(note))}
          data-info="Restore"
        >
          <FaTrashRestore />
        </NotesIconBox>
        <NotesIconBox
          onClick={() => dispatch(deleteNote(note))}
          data-info="Delete"
        >
          <FaTrash />
        </NotesIconBox>
      </>
    );
  } else {
    return (
      <>
        <NotesIconBox data-info="Edit">
          <FaEdit style={{ fontSize: "1rem" }} onClick={clickHandler} />
        </NotesIconBox>
        <NotesIconBox
          onClick={() => {
            dispatch(deleteNotefromServer(note.id))
            dispatch(setTrashNotes(note))
          }}
          data-info="Delete"
        >
          <FaTrash />
        </NotesIconBox>
      </>
    );
  }
};

export default getReleventBtns;
