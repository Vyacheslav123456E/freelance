import React, {useEffect} from 'react';
import {useActions} from "../hooks/useActions";
import {useHistory} from "react-router-dom";
import {Button} from "antd";
import {getStorage} from "../utils";

const Buttons = (props: any) => {
    const {setAuth} = useActions()
    const history = useHistory();

    useEffect(() => {
        if ( getStorage() === null){
            setAuth(false)
            history.push("/");
        }else {
            setAuth(true)
        }
    },[])

    return (
        <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => props.handleClick}>
            {props.text}
        </Button>
    );
};
//89043821012
export default Buttons;