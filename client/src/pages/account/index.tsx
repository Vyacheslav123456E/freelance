import React, {useState} from 'react';
import Container from "../../components/Container";
import {Card, RadioChangeEvent, Tabs, TabsProps} from "antd";
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import Response from "./responses";


const Index = () => {
    const [size, setSize] = useState<SizeType>('small');

    const onChange = (e: RadioChangeEvent) => {
        setSize(e.target.value);
    };
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Отклики',
            children: <Response/>,
        },
        {
            key: '2',
            label: 'Приглашения',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: 'В работе',
            children: 'Content of Tab Pane 3',
        },
        {
            key: '4',
            label: 'Завершенные',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '5',
            label: 'В архиве',
            children: 'Content of Tab Pane 3',
        },
    ];

    return (
        <Container>
            <Card style={{paddingRight: '7px !important', paddingLeft: '7px !important'}}>
                <Tabs
                    defaultActiveKey="home"
                    type="card"
                    size={size}
                    items={items}>
                </Tabs>
            </Card>
        </Container>
    );
};

export default Index;