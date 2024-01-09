import React from 'react';
import {Menu, MenuProps} from "antd";
import {menuProfile} from "../pages/profile/menu";
import {ContactsOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons/lib";

type Props = {
    updateRender: any
};
const MenuProfileForm: React.FC<Props> = (props: Props) => {


    const onClickMenuProfile: MenuProps['onClick'] = (e) => {
        props.updateRender(e.key);
    }

    return (
        <Menu
            onClick={onClickMenuProfile}
            style={{borderInlineEnd: 0}}
            mode="inline"
            items={menuProfile(<UserOutlined/>, <SettingOutlined/>,
                <ContactsOutlined/>)}/>
    );
};

export default MenuProfileForm;