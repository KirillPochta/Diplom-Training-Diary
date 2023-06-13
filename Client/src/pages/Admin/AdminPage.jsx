import axios from "axios"
import {useEffect, useState} from "react"
import {DataGrid} from '@mui/x-data-grid';
import {Box, Button, Modal} from "@mui/material";
import {RegisterPage} from "../Register/RegisterPage";
import './AdminPage.css'
import {useNavigate} from "react-router-dom";

export const AdminPage = () => {
    const [users, setUsers] = useState(null)
    const [visitorRole, setVisiotrRole] = useState(null)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        async function fetchUsers() {
            const curr = (await axios.get('https://localhost:44366/auth/user', {withCredentials: true})).data
            const resp = await axios.get('https://localhost:44366/user/getAllUsers', {withCredentials: true})
            let users = resp.data.filter(u => u.email != 'admin@gmail.com')
            let currentUserRole = curr.roleId
            for (let user of users) {
                const resp2 = await axios.get(`https://localhost:44366/training/getUSerTrainingCount/${user.id}`, {withCredentials: true})
                user.trainingsCount = resp2.data
            }

            setUsers(users)
            setVisiotrRole(currentUserRole)
        }

        fetchUsers()
    }, [])


    const onDeleteButtonClick = async (id) => {
        await axios.delete(`https://localhost:44366/user/deleteUser/${id}`, {withCredentials: true})
        const resp = await axios.get('https://localhost:44366/user/getAllUsers', {withCredentials: true})
        let users = resp.data.filter(u => u.email != 'admin@gmail.com')
        for (let user of users) {
            const resp2 = await axios.get(`https://localhost:44366/training/getUSerTrainingCount/${user.id}`, {withCredentials: true})
            user.trainingsCount = resp2.data
        }
        setUsers(users)
    }

    const onPromoteButtonClick = async (user) => {
        await axios.put(`https://localhost:44366/user/updateUser`, {...user, roleId: 1}, {withCredentials: true})
        const resp = await axios.get('https://localhost:44366/user/getAllUsers', {withCredentials: true})
        let users = resp.data.filter(u => u.email != 'admin@gmail.com')
        for (let user of users) {
            const resp2 = await axios.get(`https://localhost:44366/training/getUSerTrainingCount/${user.id}`, {withCredentials: true})
            user.trainingsCount = resp2.data
        }
        setUsers(users)
    }

    const columns = [
        {field: 'id', headerName: 'ID', width: 200},
        {field: 'firstName', headerName: 'Кирилл', width: 130, editable: true},
        {field: 'lastName', headerName: 'Фамилия', width: 130, editable: true},
        {field: 'birth', headerName: 'Дата рождения', width: 105},
        {
            field: 'fullName',
            headerName: 'Полное имя',
            description: 'Эта колонка не может быть сортирована',
            sortable: false,
            width: 160,
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        {field: 'email', headerName: 'Почта', width: 130, editable: true},
        {field: 'joined', headerName: 'Вступил', width: 105},
        {
            field: 'role', headerName: 'Роль', width: 70,
            valueGetter: (params) => params.row.roleId == 1 ? 'Admin' : "User"
        },
        {field: 'trainingsCount', headerName: 'Кол. упражнений', width: 150},
        {
            field: 'actions', headerName: 'Действия', width: 400, renderCell: (params) => {
                return (
                    <>
                        <Button
                            onClick={(e) => onDeleteButtonClick(params.row.id)}
                            variant="contained"
                            style={{marginRight: '10px'}}
                        >
                            Удалить
                        </Button>
                        {params.row.roleId == 2 ?
                            <Button
                                onClick={(e) => onPromoteButtonClick(params.row)}
                                variant="contained"
                            >
                                Повысить
                            </Button> :
                            null
                        }
                    </>
                );
            }
        }
    ];

    const handleCellEditCommit = async (a) => {
        const user = users.find(x => x.id === a.id)
        user[a.field] = a.value
        await axios.put(`https://localhost:44366/user/updateUser`, user, {withCredentials: true})
    }
    console.log(visitorRole)

    if (visitorRole == '2') navigate('/')
    else if (visitorRole == null) navigate('/login')
    else if (users)
        return (
            <div style={{height: 'calc(100vh - 140px)', width: '100%'}}>
                <Button style={{margin: '15px'}} variant="contained" onClick={() => setOpen(true)}>Добавить</Button>
                <DataGrid
                    onCellEditCommit={handleCellEditCommit}
                    rows={users}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 5},
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
                <Modal onClose={() => setOpen(false)} open={open}>
                    <Box sx={style}>
                        <RegisterPage notLogin={true}/>
                    </Box>
                </Modal>
            </div>
        )

    return null
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    height: '80vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    padding: 0,
    overflowY: 'scroll'
};
  