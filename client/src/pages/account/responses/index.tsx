import React, {FC, useEffect} from 'react';
import {Tabs, TabsProps} from "antd";
import Current from "./current";
import {useActions} from "../../../hooks/useActions";
import {useTypedSelector} from "../../../hooks/useTypedSelector";


const Responses: FC = () => {
    const {fetchResponse} = useActions();
    const user: any = useTypedSelector(state => state.auth.user);
    const response = useTypedSelector(state => state.order.response);

    useEffect(() => {
        fetchResponse(user.id)
    }, []);

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Текущии',
            children: <Current response={response}/>
        },
        {
            key: '2',
            label: 'Архив',
            children: 'Content of Tab Pane 2',
        }
    ];

    return (
        <div>
            <Tabs
                defaultActiveKey="1"
                tabPosition={"top"}
                items={items}
            />
        </div>
    );
};

export default Responses;