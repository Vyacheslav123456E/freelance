import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import {useHistory} from 'react-router-dom';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";
import {useDispatch} from "react-redux";
import {useActions} from "../hooks/useActions";
import {RouteNames} from "../router/names";

const Navbar: FC = () => {
    const router = useHistory()
    const {isAuth, user} = useTypedSelector(state => state.auth);
    const {logout} = useActions()


    return (
        <Layout.Header className={"header"}>
            <Row justify="end">
                {isAuth
                    ?
                    <>
                        <div style={{color: '#000'}}>
                            {user.username}
                        </div>
                        <Menu theme="light" mode="horizontal" selectable={false}>

                            <Menu.Item
                                onClick={logout}
                                key={1}
                            >
                                Выйти
                            </Menu.Item>
                        </Menu>
                    </>
                    :
                    <Menu  theme="light" mode="horizontal" selectable={false}>
                        <Menu.Item
                            onClick={() => router.push(RouteNames.LOGIN)}
                            key={1}
                        >
                            Логин
                        </Menu.Item>
                    </Menu>
                }
            </Row>
        </Layout.Header>
    );
};

export default Navbar;