import React, {FC, useMemo, useState} from 'react';
import {Button, Checkbox, Divider, Form, Input, notification} from "antd";
import {rules} from "../utils/rules";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {LockOutlined, UserOutlined} from "@ant-design/icons/lib";
import {useHistory} from "react-router-dom";
import {RouteNames} from "../router/names";
import {NotificationPlacement} from "antd/es/notification/interface";
import Utils from "../utils";

const Context = React.createContext({ name: 'Default' });
const LoginForm: FC = () => {
    const router = useHistory()
    const {error, isLoading} = useTypedSelector(state => state.auth);
    const {login} = useActions()
    const [api, contextHolder] = notification.useNotification();

    const onFinish = async (data: []) => {
        const result: any = await login(data);
        if (result.success === 0){
            openNotification('topRight',result.message);
        }else {
            router.push(RouteNames.ORDERS)
        }
    }
    const openNotification = (placement: NotificationPlacement,message: string) => {
        api.error({
            message: `Ошибка`,
            description: <Context.Consumer>{({ name }) => message}</Context.Consumer>,
            placement,
        });
    };
    const clickRegistration = () => {
        router.push(RouteNames.REGISTRATION)
    }
    const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);
    return (
        <Context.Provider value={contextValue}>
            {contextHolder}
        <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}>
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Пожалуйста, введите свое имя пользователя!' }]}>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Пожалуйста, введите свой пароль!' }]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Пароль"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Запомнить</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                    Забыли пароль
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button"
                        loading={isLoading}>
                   Вход
                </Button>
                <Divider style={{margin: '30px 0 0 0'}}/>
                <p onClick={clickRegistration} className={"ahref"}>Регистрация</p>
            </Form.Item>
        </Form>
        </Context.Provider>
    );
};

export default LoginForm;