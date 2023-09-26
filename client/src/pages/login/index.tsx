import React, {FC} from 'react';
import {Card, Col, Layout, Row} from "antd";
import LoginForm from "../../components/LoginForm";
import {Container} from "react-dom";
import RegistrationForm from "../../components/RegistrationForm";

const Index: FC = () => {
    return (
        <Row justify="space-around" align="middle"  className="h100">
                <Card style={{ width: 450, marginLeft: 16, marginRight: 16}}>
                    <LoginForm/>
                </Card>
        </Row>
    );
};

export default Index;