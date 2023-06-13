import {Button, Form, Input} from 'antd';
import {Parallax} from 'react-parallax';
import HeroBackGround from '../../assets/bgImg.jpg'

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
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
    console.log(values);
};

function refForm() {

}

function sendEmail() {

}

export const Test = () => (

            <Form ref={refForm}
                  {...layout}
                  name="nest-messages"
                  onFinish={sendEmail}
                  style={{
                      maxWidth: 600,
                      width:"100vh"

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
                    <Input/>
                </Form.Item>
                <Form.Item
                    name='user_email'
                    label="Почта"
                    rules={[{
                        type: 'email',
                        required: true
                    },]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item name='massage' label="Сообщение" rules={[{
                    required: true
                },]}>
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol, offset: 8,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Отправить
                    </Button>
                </Form.Item>
            </Form>

);