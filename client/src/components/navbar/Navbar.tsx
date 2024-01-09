import React, {FC, useState} from 'react';
import {Avatar, Button, Flex, Layout, Menu, MenuProps, Row} from "antd";
import {useHistory} from 'react-router-dom';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import {RouteNames} from "../../router/names";
import {MenuFoldOutlined, MenuUnfoldOutlined, ProfileOutlined, UserOutlined,ContactsOutlined} from "@ant-design/icons/lib";
import {menus} from "./menu"
import {useIsXSmall} from "../../hooks/useIsXSmall";
import MenuHeaderForm from "../MenuHeaderForm";
import MenuLoginForm from "../MenuLoginForm";
import {getStorage} from "../../utils";

const {Header} = Layout;
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
    const [collapsed, setCollapsed] = useState(false);
    const {isAuth} = useTypedSelector(state => state.auth);
    const user: any = useTypedSelector(state => state.auth.user);

    const {drawer} = useActions()
    const router = useHistory()
    const {logout,changingUser} = useActions()

    const onOpenDrawer = () => {
        drawer(true)
        setCollapsed(!collapsed)
    }
    const loginReg: MenuProps['onClick'] = (e) => {
        if (e.key === 'login') {
            router.push(RouteNames.LOGIN)
        }
        if (e.key === 'registration') {
            router.push(RouteNames.REGISTRATION)
        }
        if (e.key === 'exit')  {
            logout()
            router.push(RouteNames.ORDERS)
        }
        if (e.key === 'profile')  {
            if (getStorage() !== null) {
                router.push(RouteNames.PROFILE)
            }else {
                logout()
                router.push(RouteNames.ORDERS)
            }
        }
        if (e.key === 'personal-account')  {
            if (getStorage() !== null) {
                router.push(RouteNames.PERSONAL_ACCOUNT)
            }else {
                logout()
                router.push(RouteNames.ORDERS)
            }
        }
        if (e.key === 'changing') {
            changingUser(user)
        }
    };
    const items: MenuProps['items'] = [
        getItem( <Avatar icon={<UserOutlined />} />, 'sub4', null,[
            getItem('Профиль','profile', <ProfileOutlined />),
            getItem('Личный кабинет', 'personal-account',<ContactsOutlined />),
            getItem('Заказчик', 'changing',<UserOutlined />),
            getItem('Выйти', 'exit'),
        ])]

    return (
        <Layout>
            <Header className={"header"}>
                {useIsXSmall() ? (
                    <>
                        {
                            isAuth ? (
                                <Row>
                                    <Flex justify={'flex-start'} style={{width: '87%'}}>
                                        <MenuHeaderForm menuSplice={menus} stateUser={[]}/>
                                    </Flex>
                                    <Flex justify={'flex-end'} style={{width: '10%'}}>
                                        <Menu
                                            onClick={loginReg}
                                            theme="light"
                                            mode="horizontal"
                                            items={items}
                                        />
                                        <div>{user.name}</div>
                                    </Flex>
                                </Row>
                                ) : (
                                <Flex justify={'flex-end'} style={{width: '100%',textAlign: "right"}}>
                                   <MenuLoginForm loginReg={loginReg}/>
                                </Flex>
                            )
                        }
                    </>
                ) : (
                    <Row>
                        <Flex justify={'flex-start'} style={{width: '18%'}}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                                onClick={() => onOpenDrawer()}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                        </Flex>
                        {
                        !isAuth ? (
                            <Flex justify={'flex-start'} style={{width: '82%',textAlign: "right"}}>
                              <MenuLoginForm loginReg={loginReg}/>
                            </Flex>
                        ) : (
                            <Flex justify={'flex-end'} style={{width: '82%',textAlign: "right"}}>
                                <Menu
                                    onClick={loginReg}
                                    theme="light"
                                    mode="horizontal"
                                    items={items}
                                />
                            </Flex>
                        )}
                    </Row>
                )}
            </Header>
        </Layout>
    );
};

export default Navbar;