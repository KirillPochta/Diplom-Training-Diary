import { UserOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Row } from 'antd';
import React, { useState } from 'react';
import locale from 'antd/es/date-picker/locale/ru_RU';
import { createEvent, fetchEvents } from '../features/event/eventSlice';
import { formatDate } from '../utils/date';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const EventForm = ({ submit, userId }) => {
  const [event, setEvent] = useState({ date: '', info: '' });
  const dispatch = useDispatch();
  const onFinish = () => {
    let today = new Date();
    today.setHours(0, 0, 0, 0)
    if (new Date(event.date).getTime() < today.getTime()) {
      toast.error("Вы не можете создать событие в прошлом")
      return
    }
    submit();
    dispatch(createEvent({ ...event, userId }));
    setTimeout(() => dispatch(fetchEvents(userId)), 1000)
    toast.success("Событие создано")
  };
  const onChange = (date, dateString) => {
    if (date) setEvent({ ...event, date: formatDate(date?.toDate()) });
  };
  return (
    <Form name="normal_login" initialValues={{ remember: true }} onFinish={onFinish}>
      <Form.Item
        name="discriptionOfEvent"
        rules={[{ required: true, message: 'Поле должно быть заполненым!' }]}>
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Информация о событии"
          onChange={(e) => setEvent({ ...event, info: e.target.value })}
          value={event.info}
        />
      </Form.Item>
      <Form.Item
        name="dateOfEvent"
        rules={[{ required: true, message: 'Пожалуйста введите дату!' }]}>
        <DatePicker locale={locale} onChange={onChange} />
      </Form.Item>

      <Row justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default EventForm;
