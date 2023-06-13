import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  mainNotes: [],
  archiveNotes: [],
  trashNotes: [],
  editNote: null,
  status: 'idle'
};

const notesListSlice = createSlice({
  name: "notesList",
  initialState,
  reducers: {
    setMainNotes: (state, { payload }) => {
      if (state.mainNotes.find(({ id }) => id === payload.id)) {
        state.mainNotes = state.mainNotes.map((note) =>
          note.id === payload.id ? payload : note
        );
      } else {
        state.mainNotes.push(payload);
      }
    },

    setArchiveNotes: (state, { payload }) => {
      state.mainNotes = state.mainNotes.filter(({ id }) => id !== payload.id);
      state.archiveNotes.push({ ...payload, isPinned: false });
    },

    setTrashNotes: (state, { payload }) => {
      state.mainNotes = state.mainNotes.filter(({ id }) => id !== payload.id);
      state.archiveNotes = state.archiveNotes.filter(
        ({ id }) => id !== payload.id
      );
      state.trashNotes.push({ ...payload, isPinned: false });
    },

    unarchiveNote: (state, { payload }) => {
      state.archiveNotes = state.archiveNotes.filter(
        ({ id }) => id !== payload.id
      );
      state.mainNotes.push(payload);
    },

    restoreNote: (state, { payload }) => {
      state.trashNotes = state.trashNotes.filter(({ id }) => id !== payload.id);
      state.mainNotes.push(payload);
    },
    deleteNote: (state, { payload }) => {
      state.trashNotes = state.trashNotes.filter(({ id }) => id !== payload.id);
    },

    setPinnedNotes: (state, { payload }) => {
      state.mainNotes = state.mainNotes.map((note) =>
        note.id === payload.id ? { ...note, isPinned: !note.isPinned } : note
      );
    },
    setEditNote: (state, { payload }) => {
      state.editNote = payload;
      console.log(state.mainNotes);
    },
    readNote: (state, { payload }) => {
      const { type, id } = payload;

      const setRead = (notes) => {
        state[notes] = state[notes].map((note) =>
          note.id === id ? { ...note, isRead: !note.isRead } : note
        );
      };

      if (type === "archive") {
        setRead("archiveNotes");
      } else if (type === "trash") {
        setRead("trashNotes");
      } else {
        setRead("mainNotes");
      }
    },
    removeTags: (state, { payload }) => {
      state.mainNotes = state.mainNotes.map((note) => ({
        ...note,
        tags: note.tags.filter(({ tag }) => tag !== payload.tag),
      }));
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNotes.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.mainNotes = action.payload
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(pushNotes.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(pushNotes.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase(pushNotes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(updateNote.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(deleteNotefromServer.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(deleteNotefromServer.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase(deleteNotefromServer.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async (id) => {
  const resp = await axios.get(`https://localhost:44366/notes/getUserNotes/${id}`, { withCredentials: true })
  return resp.data
})
export const pushNotes = createAsyncThunk('notes/pushNotes', async (note) => {
  await axios.post(`https://localhost:44366/notes/AddNote`,
  note, 
  {
    withCredentials: true,
    Headers: {
      'Content-type': 'application/json'
    },
  })
})
export const updateNote = createAsyncThunk('notes/updateNote', async (note) => {
  console.log(note)
  await axios.put(`https://localhost:44366/notes/updateNote`,
  note,
    {
      withCredentials: true,
      Headers: {
        'Content-type': 'application/json'
      }
    })
})

export const deleteNotefromServer = createAsyncThunk('notes/deleteNote', async (id) =>{
  axios.delete(`https://localhost:44366/notes/delete/${id}`)
})


export const {
  setMainNotes,
  setArchiveNotes,
  setTrashNotes,
  unarchiveNote,
  restoreNote,
  deleteNote,
  setPinnedNotes,
  setEditNote,
  readNote,
  removeTags,
} = notesListSlice.actions;

export default notesListSlice.reducer;
