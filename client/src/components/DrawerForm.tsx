import React, {useEffect, useState} from 'react';
import {Avatar, Col, Drawer, Flex, MenuProps, Row, Space, Typography} from 'antd';
import {LogoutOutlined, UserOutlined} from "@ant-design/icons/lib";
import {Divider} from "antd/lib";
import MenuProfileForm from "./MenuProfileForm";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import MenuHeaderForm from "./MenuHeaderForm";
import {RouteNames} from "../router/names";
import {useHistory} from "react-router-dom";
import {menus} from "./navbar/menu";

type Props = {
    stateUser: any,
    updateRender: any,
    type: 'order' | 'profile'
};
const {Text} = Typography;
const DrawerForm: React.FC<Props> = (props: Props) => {
    const {drawer} = useActions()
    const open = useTypedSelector(state => state.drawer.drawer);
    const {logout} = useActions()
    const router = useHistory()
    const {isAuth} = useTypedSelector(state => state.auth);


    const onClose = () => {
        drawer(false);
    };
    const updateRender = (render: any) =>{
        props.updateRender(render)
        drawer(false);
    }
    const onClick = (value: boolean) => {
        if (value){
            router.push(RouteNames.LOGIN)
        }else {
            logout()
            drawer(false)
        }

    };
    return (
        <>
            <Drawer closable={false} placement="left" onClose={onClose} open={open} width={252}
                    bodyStyle={{paddingLeft: 7, paddingRight: 7}}>
                <Row justify="space-around" align="middle">
                    {isAuth && (
                    <Space align="center" direction="vertical">
                        <Col span={24}>
                            <Avatar size={50} icon={<UserOutlined/>}/>
                        </Col>

                        <Col span={24} offset={0} className={'tree-text'}>
                            <h3 style={{margin: 0}}>{props?.stateUser?.name}</h3>
                        </Col>
                        <Col span={24} offset={0}>
                            <Text type="secondary">{props?.stateUser?.email}</Text>
                        </Col>
                    </Space>
                     )}
                    <Divider style={{margin: 0, marginTop: 15}}/>
                    <MenuHeaderForm menuSplice={menus} stateUser={[]}/>
                    <Divider style={{margin: 0}}/>
                    {props.type !== 'order' &&
                    <MenuProfileForm updateRender={updateRender}/>
                    }
                </Row>

                <Flex align={'flex-end'} justify={'flex-start'} className={'logout-box'}>

                    {isAuth && (
                        <Row style={{width: '100%'}}>
                            <Divider/>
                        <LogoutOutlined/>
                        <div className={'logout-text'}
                             onClick={() => onClick(false)}>
                            Выйти
                        </div>
                        </Row>
                    )
                  }
                </Flex>
            </Drawer>
        </>
    );
};

export default DrawerForm;