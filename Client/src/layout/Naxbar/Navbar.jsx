import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { Form, Modal } from 'antd';
const pages = [
    { Name: 'Упражнения', Url: '/exercises' },
    { Name: 'Музыка', Url: '/music' },
]

const authPages = [
    { Name: 'Заметки', Url: '/notes' },
    { Name: 'Календарь', Url: '/event-calendar' },
    { Name: 'План по калориям', Url: '/day-plan' }
]

const settingLoggedOut = [
    { Name: 'Войти', Url: '/login' },
    { Name: 'Зарегистрировтаься', Url: '/register' },
    { Name: 'Свяжитесь с нами' }
]

const settingsLogged = [
    { Name: 'Личный кабинет', Url: '/cabinet' },
    { Name: 'Панель администратора', Url: '/admin', ForAdmin: true },
    { Name: 'Свяжитесь с нами' },
    { Name: 'Выйти', Url: '/logout' }
];

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (url) => {

        setAnchorElUser(null);
        if (url) {
            navigate(url)
        }
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setAnchorElUser(null);

        setIsModalOpen(true)
        
    }

    const [form] = Form.useForm();

    const refForm = useRef();
    const handleCancel = () => {
        formData.user_name = ''
        formData.user_email = ''
        formData.message = ''
        setIsModalOpen(false);
    };
    const [isLogged, setLogged] = useState(false)
    const [isAdmin, setAdmin] = useState(false)
    const [pic, setPic] = useState(null)
    useEffect(() => {
        async function fetchUser() {
            try {
                const resp = await axios.get('https://localhost:44366/auth/user', { withCredentials: true })
                setLogged(true)
                setAdmin(resp.data.roleId == 1)
                setPic(`https://localhost:44366/api/picture/${resp.data.image}`)
            } catch {
                setLogged(false)
            }
        }
        fetchUser()
    })
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }


    const sendEmail = () => {
         if (formData.user_name.length < 2)
            toast.warn("Имя слишком короткое!")
        else if (formData.message.length < 8)
            toast.warn("Сообщение слишком короткое!")
        else {
            emailjs
                .sendForm(
                    "service_747cf0h",
                    "template_fnuhe67",
                    refForm.current,
                    "LuEzmvBO8ef1aHfCX"
                )
                .then(
                    async (result) => {
                        toast.success("Сообщение отправлено!")

                        console.log("message sent");
                        form.resetFields([])
                        navigate('/exercises')
                    },
                    (error) => {
                        console.log(error.text);
                    }
                );
        }
        formData.user_name = ''
        formData.user_email = ''
        formData.message = ''
        setIsModalOpen(false)
    };

    useEffect(() => {
        console.log(formData)
    }, [formData])


    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <FitnessCenterIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Дневник тренировок
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <Modal title="Свяжитесь с нами"
                                open={isModalOpen}
                                onOk={sendEmail}
                                onCancel={handleCancel}
                                cancelText="Закрыть"
                                okText="Добавить"
                            >
                                <form ref={refForm}>
                                    <h1>Как вас зовут?</h1>
                                    <input style={{ fontSize: "20px", width: "450px" }}
                                        name='user_name' onChange={handleInputChange} value={formData.user_name}
                                        placeholder="Имя" />
                                    <h1>Укажите свою почту</h1>
                                    <input type='email' style={{ fontSize: "20px", width: "450px" }}
                                        name='user_email' onChange={handleInputChange} value={formData.user_email}
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                        placeholder='Почта' />
                                    <h1>Напишите своё сообщение</h1>
                                    <textarea style={{ fontSize: "20px", width: "450px", height: '32px' }} name="message" onChange={handleInputChange}
                                        value={formData.message}
                                        placeholder='Сообщение' />
                                </form>
                            </Modal>
                            {pages.map((page) => (
                                <MenuItem href={page.Url} key={page.Name} onClick={() => handleCloseUserMenu(page.Url)}>
                                    <Typography textAlign="center">{page.Name}</Typography>
                                </MenuItem>
                            ))}
                            {isLogged ?
                                authPages.map((page) => (
                                    <MenuItem href={page.Url} key={page.Name} onClick={() => handleCloseUserMenu(page.Url)}>
                                        <Typography textAlign="center">{page.Name}</Typography>
                                    </MenuItem>)) :
                                null
                            }
                        </Menu>
                    </Box>
                    <FitnessCenterIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Дневник тренировок
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.Name}
                                href={page.Url}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.Name}
                            </Button>
                        ))}
                        {isLogged ?
                            authPages.map((page) => (
                                <Button
                                    key={page.Name}
                                    href={page.Url}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.Name}
                                </Button>
                            )) :
                            null
                        }
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Настройки">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Profile" src={pic} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {isLogged ?
                                settingsLogged.filter(s => !s.ForAdmin || s.ForAdmin == isAdmin).map((setting) => (
                                    setting.Name === "Свяжитесь с нами" ? (
                                        <MenuItem href={setting.Url} key={setting.Name} onClick={showModal}>
                                            <Typography textAlign="center">{setting.Name}</Typography>
                                        </MenuItem>) :
                                        <MenuItem key={setting.Name} onClick={() => handleCloseUserMenu(setting.Url)}>
                                            <Typography textAlign="center">{setting.Name}</Typography>
                                        </MenuItem>
                                )) :
                                settingLoggedOut.map((setting) => (
                                    setting.Name === "Свяжитесь с нами" ? (
                                        <MenuItem key={setting.Name} onClick={showModal}>
                                            <Typography textAlign="center">{setting.Name}</Typography>
                                        </MenuItem>) :
                                        <MenuItem key={setting.Name} onClick={() => handleCloseUserMenu(setting.Url)}>
                                            <Typography textAlign="center">{setting.Name}</Typography>
                                        </MenuItem>
                                ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;