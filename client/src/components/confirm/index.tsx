import React from 'react';
import {ExclamationCircleOutlined} from "@ant-design/icons/lib";
import {Button, Modal} from "antd";

const Confirm = () => {
    const [modal, contextHolder] = Modal.useModal();

    const showConfirm = () => {
        modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Bla bla ...',
            okText: '确认',
            cancelText: '取消',
        });
    }
    return (
        <div>

        </div>
    );
};

export default Confirm;