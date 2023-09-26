import React, {useMemo} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {Button, Checkbox, Col, Divider, Form, Input, notification, Radio, Row} from "antd";
import {rules} from "../utils/rules";
import {NotificationPlacement} from "antd/es/notification/interface";
import {useHistory} from "react-router-dom";
import {RouteNames} from "../router/names";

const Context = React.createContext({ name: 'Default' });

const RegistrationForm = () => {
    const {error, isLoading} = useTypedSelector(state => state.auth);
    const router = useHistory()
    const [api, contextHolder] = notification.useNotification();
    const {registration} = useActions()

    const onFinish = async (data: []) => {
       const result: any = await registration(data);
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
    const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);
    const clickLogin = () => {
        router.push(RouteNames.LOGIN)
    }
    return (
        <Context.Provider value={contextValue}>
            {contextHolder}
        <Form onFinish={onFinish} layout="vertical">
            {error && <div style={{color: 'red'}}>{error}</div>}
            <Form.Item name="role_id" rules={[rules.required("Выберите пользователя")]}>
            <Radio.Group className={"radio"}>
                <Radio.Button value="1" className={"radio-button"}>Заказчик</Radio.Button>
                <Radio.Button value="2" className={"radio-button"}>Фрилансер</Radio.Button>
            </Radio.Group>
            </Form.Item>
            <Divider/>

            <Form.Item  name="name" rules={[rules.required("Пожалуйста введите имя пользователя!")]}>
                <Input placeholder="Имя пользователя"/>
            </Form.Item>

            <Form.Item name="email" rules={[{
                    type: 'email', message: 'Введенный адрес электронной почты неверен!'},
                   {required: true, message: 'Пожалуйста, введите свой адрес электронной почты!'}]}>
                <Input placeholder="Email"/>
            </Form.Item>

            <Form.Item name="password" rules={[rules.required("Пожалуйста введите пароль")]}>
                <Input.Password  type={"password"} placeholder="Пароль"/>
            </Form.Item>

            <Form.Item name="repeat_password" rules={[rules.required("Пожалуйста введите пароль")]}>
                <Input.Password  type={"password"} placeholder="Повторите пароль"/>
            </Form.Item>

            <Form.Item name="agreement" valuePropName="checked" rules={[
                           {
                               validator: (_, value) =>
                                   value ? Promise.resolve() : Promise.reject(new Error('Необходимо принять пользовательское соглашение')),
                           },
                       ]}>
                <Checkbox>
                    Вы принимаете условия <a>Пользовательского соглашения</a>
                </Checkbox>
            </Form.Item>
            <Divider/>
            <Form.Item>
                <Row>
                    <Col span={20}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Регистрация
                </Button>
                    </Col>
                <Col span={2}>
                    <p onClick={clickLogin} className={"ahref"}>Логин</p>
                </Col>
                </Row>
            </Form.Item>
        </Form>
        </Context.Provider>
    );
};

export default RegistrationForm;