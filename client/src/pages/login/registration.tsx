import React, {FC} from 'react';
import {Card, Layout, Row} from "antd";
import './style.scss'
import RegistrationForm from "../../components/RegistrationForm";

const Registration: FC = () => {
    return (
        <Row justify="center" align="middle" className="h100">
            <Card style={{ width: 450, marginLeft: 16, marginRight: 16}}>
                <RegistrationForm/>
            </Card>
        </Row>
    );
};

export default Registration;