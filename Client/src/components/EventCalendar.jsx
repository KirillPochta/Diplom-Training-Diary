import React from 'react';
import {Calendar, Modal} from 'antd';
import locale from 'antd/es/calendar/locale/ru_RU';
import {formatDate} from '../utils/date';
import {useDispatch, useSelector} from 'react-redux';
import {IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {deleteEvent, fetchEvents} from '../features/event/eventSlice';
import {deleteNotefromServer, fetchNotes} from '../features/notesList/notesListSlice';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import {toast} from "react-toastify";

const EventCalendar = () => {

    const events = useSelector(state => state.notesList.mainNotes).concat(useSelector(state => state.event.events));
    useNavigate();
    const monthCellRender = (value) => {
        return null
    };
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const [content, setContent] = React.useState(null)

    const dispatch = useDispatch();
    const showModal = (currentDayEvents) => {
        console.log(currentDayEvents)
        setContent((
            <div>
                <h3>Ваши записи</h3>
                <ul>
                    {currentDayEvents?.toReversed().map((item) => (
                        <li key={item.id}>
                            {item.content?.replace(/<\/?[^>]+(>|$)/g, "") ?? item.info}
                            <IconButton children={<CloseIcon/>} onClick={() => onDelete(item)}/>
                        </li>
                    ))}
                </ul>
            </div>
        ))
        setIsModalOpen(true);
    };
    const showAlert = (item) => {
        alert(item.info)
    }
    const handleOk = () => {
            setIsModalOpen(false);
        }
    ;

    const handleCancel = () => {
            setIsModalOpen(false);
        }
    ;

    const onDelete = async (event) => {
        if (event.title) {
            dispatch(deleteNotefromServer(event.id))
            setTimeout(() => dispatch(fetchNotes(event.userId), 1000))
        } else {
            dispatch(deleteEvent(event))
            setTimeout(() => dispatch(fetchEvents(event.userId), 1000))
        }
        setIsModalOpen(false)
        toast.success("Успешное удаление")
    }

    const dateCellRender = (value) => {
            const formatedDate = formatDate(value.toDate());
            const currentDayEvents = events?.filter((ev) => (ev.eventDate ?? ev.date) === formatedDate);
            return (
                <div>
                    <ul className="events" onClick={() => showModal(currentDayEvents)}>
                        {currentDayEvents?.toReversed().map((item) => (
                            <li style={{fontSize:"20x"}} key={item.id}>
                                {item.content?.replace(/<\/?[^>]+(>|$)/g, "") ?? item.info}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    ;


    return (
        <>
            <Calendar
                locale={locale}
                dateCellRender={dateCellRender}
                monthCellRender={monthCellRender}
            />
            <Modal open={isModalOpen}
                   onOk={handleOk}
                   onCancel={handleCancel}
                   cancelButtonProps={{style:{display:"none"}}}
            >
                {content}
            </Modal>
        </>
    );
};

export default EventCalendar;