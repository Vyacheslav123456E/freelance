import React, {createContext} from 'react';
import Container from "../../../components/Container";
import {Avatar, Card, Divider, Flex, Form, Input, notification} from "antd";
import {useHistory, useLocation} from "react-router-dom";
import Layout from "../../../components/Layout";
import {ArrowLeftOutlined, UserOutlined} from "@ant-design/icons/lib";
import {useIsXSmall} from "../../../hooks/useIsXSmall";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {RouteNames} from "../../../router/names";
import Buttons from "../../../components/Buttons";
import {rules} from "../../../utils/rules";
import {useActions} from "../../../hooks/useActions";
import {NotificationPlacement} from "antd/es/notification/interface";

const Context = createContext({ name: 'Default' });

const CurrentId = () => {
    let params: any = useLocation().state;
    const countResponse: any  = useTypedSelector(state => state.order.countResponse);
    const isUpdate: any  = useTypedSelector(state => state.order.isUpdate);
    const [api, contextHolder] = notification.useNotification();

    const router = useHistory();
    const {updateResponses} = useActions();

    const back = () =>{
        router.push(RouteNames.PERSONAL_ACCOUNT)
    }
    const onFinish = async (data: any) => {
        if (params.item.text.length !== data.description.length){
            params.item.text = data.description
            await updateResponses({id: params.item.id, text: data.description});
            if (isUpdate){
                openNotification('topRight', 'Обновлено', 'ok');
            }else {
                openNotification('topRight', 'Ошибка', 'error');
            }
        }else {
            openNotification('topRight', 'Нет изменений', 'error');
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
                message: message,
                placement,
            });
        }
    };

    return (
        <Container>
            <Layout>
                {contextHolder}
                <Flex justify={'center'}>
                    <Card style={useIsXSmall() ? {width: '70%'} : {width: '100%'}}>
                        <ArrowLeftOutlined style={{width: 50,marginBottom: 9,cursor: "pointer"}}
                                           onClick={back}/>
                        <div className={"title--st"}>{params.item['orders.title']}</div>
                        <Flex gap={4}>
                            <div>{params.item['orders.price']}</div>
                            <div>{params.item['orders.type_price'] !== null &&' руб. ' + params.item['orders.type_price']}</div>
                        </Flex>
                        <div>Всего откликов: {countResponse > 0 && countResponse}</div>
                        <Divider/>
                        <Form onFinish={onFinish} initialValues={{description: params.item.text}}
                              layout="vertical" >
                            <Form.Item label={'Редактировать'} name="description">
                                <Input.TextArea showCount style={{height: '100px'}} placeholder="Ваш отклик"
                                                 autoSize={{ minRows: 5 }} maxLength={2500} />
                            </Form.Item>
                            <Form.Item>
                                <Buttons text={"Сохранить"} />
                            </Form.Item>
                        </Form>
                    </Card>
                    {useIsXSmall() &&
                      <Card style={{width: '30%'}}>
                        <Flex justify={'center'} align={'center'} vertical>
                            <Avatar size={{xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100}}
                                icon={<UserOutlined/>}/>
                            <div className={'title--st'}>{params.item.orderUser.name}</div>
                            <div>{params.item.orderUser.email}</div>
                            <span style={{marginTop: 20}}>Заказчик</span>
                            <Divider/>
                        </Flex>
                    </Card>
                    }
                </Flex>
            </Layout>
        </Container>
    );
};

export default CurrentId;