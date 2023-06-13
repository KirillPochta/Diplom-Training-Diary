import React, {useEffect, useRef, useState} from "react";
import emailjs from "@emailjs/browser";
import axios from "axios";
import {toast} from "react-toastify";
import {Button, Form, Input, Modal} from 'antd';
import {useNavigate} from "react-router-dom";

const layout = {
    labelCol: {
        span: 8,
    }, wrapperCol: {
        span: 16,
    },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} обязательно к заполнению!', types: {
        user_email: '${label} не валидна!'
    }
};
const SendMessage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        navigate('/exercise')
        setIsModalOpen(false);
    };
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState('optional');

    const refForm = useRef();
    const [user, setUser] = useState({})
    let [data, setData] = useState(null)
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        message: ''
    });
    const onRequiredTypeChange = ({requiredMarkValue}) => {
        setRequiredMarkType(requiredMarkValue);
    };
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    useEffect(() => {
        async function fetchUser() {

            await axios.get('https://localhost:44366/auth/user', {withCredentials: true}).then(
                response => {
                    setUser(response.data)
                })
                .catch(err => {
                    console.log(err)
                })

        }

        fetchUser()
    }, [])

    function timeout(delay ) {
        return new Promise(res => setTimeout(res, delay));
    }

    const sendEmail = (e) => {
        console.log(formData.user_name.length)
        e.preventDefault();
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
                        await timeout(3000);

                        console.log("message sent");
                        e.target.reset();
                        navigate('/exercise')
                    },
                    (error) => {
                        console.log(error.text);
                    }
                );
        }
    };
    useEffect(() => {
        setIsModalOpen(true)
    }, []);
    useEffect(() => {
        console.log(formData)
    }, [formData])
    return (
        <Modal title="Свяжитесь с нами!" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <Form ref={refForm}
                  {...layout}
                  name="nest-messages"
                  style={{
                      maxWidth: 600,
                      width: 360,
                      marginTop:30
                  }}
                  validateMessages={validateMessages}
            >
                <Form.Item
                    name='user_name'
                    label="Имя"
                    rules={[{
                        required: true,
                    },]}
                >
                    <Input name='user_name' onChange={handleInputChange} value={formData.user_name}/>
                </Form.Item>
                <Form.Item
                    name='user_email'
                    label="Почта"
                    rules={[{
                        type: 'email',
                        required: true, message: 'Введите корректную почту'
                    },]}
                >
                    <Input name='user_email' onChange={handleInputChange} value={formData.user_email}/>
                </Form.Item>

                <Form.Item
                    name="massage"
                    label="Intro"
                    rules={[{required: true, message: 'Введите сообщение'}]}
                >
                    <Input.TextArea name="message" onChange={handleInputChange} value={formData.message} showCount
                                    maxLength={100}/>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol, offset: 8,
                    }}
                >
                </Form.Item>
                <Button type="primary" htmlType="submit" onSubmit={sendEmail}>
                    Отправить
                </Button>
            </Form>
        </Modal>

    )
};

export default SendMessage;


