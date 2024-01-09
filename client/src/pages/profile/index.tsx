import React, {useEffect, useState} from 'react';
import Container from "../../components/Container";
import {Row, Avatar, Card, Button, Col, Typography, Space} from "antd";
import {UserOutlined} from "@ant-design/icons/lib";
import './style.scss'
import {useTypedSelector} from "../../hooks/useTypedSelector";
import Utils from "../../utils";
import {Divider} from "antd/lib";
import Information from "./information";
import Specialization from './specialization';
import Contacts from './contacts';
import {Content} from "antd/es/layout/layout";
import {useIsXSmall, useIsXSmallCol} from "../../hooks/useIsXSmall";
import DrawerForm from '../../components/DrawerForm';
import MenuProfileForm from "../../components/MenuProfileForm";

const { Text } = Typography;

const gridStyle: React.CSSProperties = {
    width: '100%',
    textAlign: 'center',
};

const Index = () => {
    const {user} = useTypedSelector(state => state.auth);
    const [stateUser,setStateUser]: any = useState(user);
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

    const components: any = {
        'information': <Information stateUser={stateUser}/>,
        'specialization': <Specialization stateUser={stateUser}/>,
        'contacts': <Contacts stateUser={stateUser}/>,
    };
    return (
        <Container>
                <Row>
                    {useIsXSmall() ? (
                        <Col span={6} className={"offset"}>
                            {stateUser &&
                             <Card style={{paddingRight: '7px !important',paddingLeft: '7px !important'}}>
                                <Row justify="space-around" align="middle">
                                    <Space align="center" direction="vertical">
                                        <Col span={24}>
                                            <Avatar size={85} icon={<UserOutlined/>}/>
                                        </Col>
                                        <Col span={24} offset={0} className={'tree-text'}>
                                            <h4 style={{margin: 0}}>{stateUser.name}</h4>
                                        </Col>
                                        <Col span={24} offset={0}>
                                            <Text type="secondary">{stateUser.email}</Text>
                                        </Col>
                                    </Space>
                                    <Divider/>
                                    <Col span={24}>
                                      <MenuProfileForm updateRender={updateRender}/>
                                    </Col>
                                </Row>
                            </Card>
                            }
                        </Col>
                     ):(
                         <DrawerForm stateUser={stateUser} updateRender={updateRender} type={'profile'}/>
                     )}
                    <Col span={useIsXSmallCol() ? 24 : 18} style={{marginBottom: 10}}>
                        <Card bordered={false} className={"grid-avatar"}>
                            <Card.Grid hoverable={false} style={gridStyle}>
                                {Object.keys(stateUser).length !== 0 &&
                                    <Content>{components[render]}</Content>
                                }
                            </Card.Grid>
                        </Card>
                    </Col>
                </Row>

        </Container>
    );
};

export default Index;