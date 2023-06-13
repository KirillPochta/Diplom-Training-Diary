import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  status: '',
  events: [],
  error: '',
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    // createEvent(state, action) {
    //   state.events.push(action.payload);
    // },
    deleteEvent(state, action) {
      state.events = [...state.events.slice(0, action.payload), ...state.events.slice(action.payload + 1)];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEvents.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.events = action.payload
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload)
      })
      .addCase(createEvent.rejected, (state, action) => {
        toast.error("Вы уже запланировали это упражнение на эту дату")
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
      })
  }
});

export const fetchEvents = createAsyncThunk('events/fetchEvents', async (id) => {
  const resp = await axios.get(`https://localhost:44366/notification/getUserNotifications/${id}`, { withCredentials: true })
  return resp.data
})

export const createEvent = createAsyncThunk('events/createEvents', async (event) => {
  let resp;
  resp = await axios.post(`https://localhost:44366/notification/AddNotification`, event)
  toast.success("Упражнение запланировано")
  toast.error(resp.data)
  return resp.data;

})

export const createEventMusic = createAsyncThunk('events/createEvents', async (event) => {
  let resp;
  resp = await axios.post(`https://localhost:44366/notification/AddNotification`, event)
  toast.success("Плейлист запланирован")
  toast.error(resp.data)
  return resp.data;

})

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (event) => {
  await axios.delete(`https://localhost:44366/notification/DeleteNotification/${event.id}`)
})

export default eventSlice.reducer;
