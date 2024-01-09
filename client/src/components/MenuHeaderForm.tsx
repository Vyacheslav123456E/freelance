import React, {useState} from 'react';
import {Menu, MenuProps} from "antd";
import {RouteNames} from "../router/names";
import {useHistory} from "react-router-dom";
import {useIsXSmall} from "../hooks/useIsXSmall";

type Props = {
    stateUser: any,
    menuSplice: any
};
const MenuHeaderForm: React.FC<Props> = (props: Props)  => {
    //console.log(props.menuSplice)
    const router = useHistory()
    const [menuProps, setMenuProps] = useState(props.menuSplice)

    const onClickMenu: MenuProps['onClick'] = (e) => {
        if (e.key === '/') {
            router.push(RouteNames.ORDERS)
        }
        if (e.key === 'profile') {
            router.push(RouteNames.PROFILE)
        }
    }

    return (
        <Menu
            onClick={onClickMenu}
            style={{borderInlineEnd: 0,width: '100%'}}
            mode={useIsXSmall() ? "horizontal" : "inline"}
            items={menuProps}
        />
    );
};

export default MenuHeaderForm;