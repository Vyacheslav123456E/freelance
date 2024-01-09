import React from 'react';
import {Button, Col, Form, Input, notification, Row} from "antd";
import {useActions} from "../../../hooks/useActions";
import {NotificationPlacement} from "antd/es/notification/interface";

const Context = React.createContext({ name: 'Default' });
type Props = {stateUser: any};
const Index: React.FC<Props> = (props: Props) => {
    const {contacts} = useActions()
    const [api, contextHolder] = notification.useNotification();


    const onFinish = async (data: any) => {
        data.user_id = props.stateUser.id
        let res: any = await contacts(data)
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
                      phone: props.stateUser.contacts[0].phone,
                      messenger_name: props.stateUser.contacts[0].messenger_name,
                      messenger_link: props.stateUser.contacts[0].messenger_link,
                      website: props.stateUser.contacts[0].website
                  }}>
                <Col xs={24} sm={12}>
                    <Form.Item name="phone">
                        <Input placeholder="Телефон"/>
                    </Form.Item>
                </Col>
                <div className={'label'}>
                    <label>Мессенджеры</label>
                    <Row>
                        <Col xs={24} sm={18}>
                            <Form.Item style={{marginBottom: 0}}>
                                <Form.Item
                                    name="messenger_name"
                                    className={"price-modal"}
                                    style={{display: 'inline-block', width: 'calc(30% - 8px)'}}>
                                    <Input placeholder="Название"/>
                                </Form.Item>
                                <Form.Item
                                    name="messenger_link"
                                    style={{display: 'inline-block', width: 'calc(70% - 8px)'}}>
                                    <Input placeholder="Ссылка"/>
                                </Form.Item>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div className={'label'}>
                    <label>Сайт или профиль в соцсетях</label>
                    <Col xs={24} sm={12}>
                        <Form.Item name="website">
                            <Input placeholder="http://example.ru"/>
                        </Form.Item>
                    </Col>
                </div>
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