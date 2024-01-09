import React, {FC, useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import Container from '../../components/Container';
import {Card, Col, Row, Image, Space, Tag, Divider, Typography, Input, Form} from "antd";
import {useIsXSmall, useIsXSmallCol} from "../../hooks/useIsXSmall";
import {
    ArrowLeftOutlined,
    CalendarTwoTone,
    CheckCircleTwoTone,
    EyeTwoTone
} from "@ant-design/icons/lib";
import './style.css'
import moment from "moment";
import {RouteNames} from "../../router/names";
import DrawerForm from "../../components/DrawerForm";
import Utils from "../../utils";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import parse from "html-react-parser"
import Buttons from "../../components/Buttons";
import {rules} from "../../utils/rules";
import {useActions} from "../../hooks/useActions";

const { Title } = Typography;
const OrderId: FC = () => {
    const {addResponse} = useActions();
    let params: any = useLocation().state;
    const router = useHistory()
    const [stateUser,setStateUser]: any = useState({});
    const {user} = useTypedSelector(state => state.auth);
    const [render, updateRender] = useState('information');

    useEffect(() => {
        if (Object.keys(user).length === 0) {
            Utils.userInfo().then(res =>{
                setStateUser(res)
            })
        }else {
            setStateUser(user)
        }
    }, [user]);

    const back = () =>{
        router.push(RouteNames.ORDERS)
    }

    const onFinish = async (data: any) => {
        addResponse({
            order_id: params.item.id,
            user_id: stateUser.id,
            text: data.description,
            status: 0,
        })
    }
    return (
        <Container>
            <Row>
                {useIsXSmall() ? (
                    <Col span={6} className={"offset"} >
                        <Card title="Фильтр">
                        </Card>
                    </Col>
                ) : (
                    <DrawerForm stateUser={stateUser} updateRender={updateRender} type={'order'}/>
                )}
                <Col span={useIsXSmallCol() ? 24 : 18}>
                    <Card>
                        <Row>
                            <ArrowLeftOutlined style={{width: 50,marginBottom: 9,cursor: "pointer"}}
                             onClick={back}/>
                            <Title level={3} style={{fontSize: '2.8vh'}}>{params.item.title}</Title>
                        </Row>
                        <Row>
                            <div className={'price-id'}>
                                {params.item.price === "Договрная" ? params.item.price :
                                    <div>{params.item.price} &#8381;</div>
                                }
                            </div>
                            <div className={'sub-price-id'}>{params.item.type_price}</div>
                        </Row>
                        <Row>
                            <Space size={[0, 8]} wrap>
                                <Tag icon={<EyeTwoTone/>} className={"tag"}>
                                    {params.item.views + " просмотров"}
                                </Tag>
                                <Tag icon={<CheckCircleTwoTone/>} className={"tag"}>
                                    {params.item.responses + " откликов"}
                                </Tag>
                                <Tag icon={<CalendarTwoTone/>} className={"tag"}>
                                    {moment(params.item.createdAt).format('DD.MM.YYYY hh:mm')}
                                </Tag>
                            </Space>
                        </Row>
                        <Row>
                            {params.item.tags?.map((el: any, index: any) => {
                                return (
                                    <Space size={[0, 8]} wrap key={index} style={{paddingTop: 9}}>
                                        <Tag>
                                            {"  #" + el + ' '}
                                        </Tag>
                                    </Space>
                                )
                            })}
                        </Row>
                        <Divider/>
                        <Row>
                            <p style={{overflow: "hidden"}}>{parse(params.item.description)}</p>
                        </Row>
                        <Image.PreviewGroup>
                            {params.item.files.length !== 0 &&
                            params.item.files.map((item: any, i: number) => {
                                return (
                                    <>
                                        <Divider/>
                                        <h4>Файлы</h4>
                                        <Image width={200} key={i} src={item?.file}/>
                                    </>
                                )
                            })}
                        </Image.PreviewGroup>
                        <Divider/>
                        <Form onFinish={onFinish}>
                            <Form.Item name="description" rules={[rules.required("Отклик не может быть пустым")]}>
                                <Input.TextArea showCount style={{height: '100px'}} placeholder="Ваш отклик"
                                                autoSize={{ minRows: 5 }} maxLength={2500} />
                            </Form.Item>
                            <Form.Item>
                                <Buttons text={"Откликнуться"} />
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderId;