import React from 'react';
import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import {Row,Avatar,Card,Button} from "antd";
import {UserOutlined} from "@ant-design/icons/lib";
import './style.css'

const gridStyle: React.CSSProperties = {
    width: '100%',
    textAlign: 'center',
};

const Index = () => {
    return (
        <>
            <Navbar/>
            <Container>
               <Row>
                   <Card bordered={false} className={"grid-avatar"}>
                       <Card.Grid hoverable={false} style={gridStyle}>
                           <Avatar size={64} icon={<UserOutlined />} />
                           <Button>Default Button</Button>
                       </Card.Grid>
                   </Card>
               </Row>
            </Container>
        </>
    );
};

export default Index;