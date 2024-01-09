import React from 'react';
import {Form, Input, Col, Row, Divider, Select, Button, notification} from "antd";
import {rules} from "../../../utils/rules";
import {day,month,years} from "./date";
import moment from "moment";
import {useActions} from "../../../hooks/useActions";
import {NotificationPlacement} from "antd/es/notification/interface";

const Context = React.createContext({ name: 'Default' });
type Props = { stateUser: any};

const Index: React.FC<Props> = (props: Props) => {
    const [api, contextHolder] = notification.useNotification();
    const {information} = useActions()

    const onFinish = async (data: any) => {
        Object.assign(data, {
            date: moment(`${data.days}-${data.months}-${data.year}`),
            user_id: props.stateUser.id
        })
        let res: any = await information(data)
        if (res){
            openNotification('topRight', 'Обновлено', 'ok');
        }else {
            openNotification('topRight', '', 'error');
        }
    }

    const openNotification = (placement: NotificationPlacement,message: string, type: string) => {
        if (type === 'ok') {
            api.success({
                message: ``,
                description: <Context.Consumer>{({name}) => message}</Context.Consumer>,
                placement,
            });
        }else {
            api.error({
                message: `Ошибка`,
                placement,
            });
        }
    };
    return (
        <>
            {contextHolder}
            <Form onFinish={onFinish} layout="vertical"
                  initialValues={{
                      remember: true,
                      days: 'День',
                      months: 'Месяц',
                      years: 'Год',
                      name: props.stateUser.name,
                      email: props.stateUser.email,
                      location: props.stateUser.location,
                      day: props.stateUser.birthday[0].day ,
                      year: props.stateUser.birthday[0].year,
                      month: props.stateUser.birthday[0].month,
                      description: props.stateUser.description
                  }}>
                <Col xs={24} sm={12}>
                    <Form.Item name="name" rules={[rules.required("Обязательно поле!")]}>
                        <Input placeholder="Имя"/>
                    </Form.Item>
                    <Form.Item name="email" rules={[rules.required("Обязательно поле!")]}>
                        <Input placeholder="Email"/>
                    </Form.Item>
                    <Form.Item name="location">
                        <Input placeholder="Местоположение"/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24}>
                    <Row>
                        <Form.Item name="day">
                            <Select options={day} style={{width: 80,marginRight: 5}}/>
                        </Form.Item>
                        <Form.Item name="month">
                            <Select options={month} style={{width: 100,marginRight: 5}}/>
                        </Form.Item>
                        <Form.Item name="year">
                            <Select options={years} style={{width: 80}}/>
                        </Form.Item>
                    </Row>
                </Col>
                <Col xs={24} sm={24}>
                    <Form.Item name="description">
                        <Input.TextArea showCount style={{height: '100px'}} placeholder="О себе *"
                                        autoSize={{ minRows: 3 }} maxLength={2500} />
                    </Form.Item>
                </Col>
                <Divider/>
                <Col xs={24} sm={24}>
                    <Row justify="start" align="middle">
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Сохранить
                            </Button>
                        </Form.Item>
                    </Row>
                </Col>
            </Form>
        </>
    );
};

export default Index;