import React from 'react';
import {Col, Menu, Row} from "antd";

type Props = {
    loginReg: any,
};
const MenuLoginForm: React.FC<Props> = (props: Props) => {
    return (

            <Menu
                onClick={props.loginReg}
                theme="light"
                mode="horizontal"
                style={{width: '100%', display: 'inline-block'}}
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

    );
};

export default MenuLoginForm;