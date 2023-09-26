import React, {FC, useEffect, useState} from 'react';
import {Col, Layout, Menu, MenuProps, Row} from "antd";
import {NavLink, useHistory} from 'react-router-dom';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {RouteNames} from "../router/names";
import {ProfileOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons/lib";
import Utils from "../utils";
const { Header } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const Navbar: FC = () => {
    const router = useHistory()
    const {isAuth, user} = useTypedSelector(state => state.auth);
    const [stateUser,setStateUser]: any = useState({})
    const {logout} = useActions()

    useEffect(() => {
        if (Object.keys(user).length === 0) {
            const hexUser: any = sessionStorage.getItem('_in');
            Utils.decrypt(hexUser).then(res =>{
                setStateUser(JSON.parse(res))
            });
        }else {
            setStateUser(user)
        }
    }, []);

    const onClick: MenuProps['onClick'] = (e) => {
        if (e.key === 'login') {
            router.push(RouteNames.LOGIN)
        }
        if (e.key === 'registration')  {
            router.push(RouteNames.REGISTRATION)
        }
        if (e.key === 'profile')  {
            router.push(RouteNames.PROFILE)
        }
        if (e.key === 'exit')  {
            logout()
            router.push(RouteNames.ORDERS)
        }
    };
    const items: MenuProps['items'] = [
    getItem(stateUser.name, 'sub4', <UserOutlined />, [
        getItem('Профиль','profile', <ProfileOutlined />),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Выйти', 'exit'),
    ])]

    return (
        <Layout>
            <Header className={"header"}    title="Title">
                {isAuth ?
                    <Menu
                        onClick={onClick}
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        items={items}
                    />
                    :
                    <>
                    <Menu
                        onClick={onClick}
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        items={[
                            {
                                label: 'Логин',
                                key: 'login'
                            },
                            {
                                label: 'Регистрация',
                                key: 'registration'
                            }
                        ]}
                    />
                    </>
                }
            </Header>
        </Layout>
    );
};

export default Navbar;