import React, {FC, useEffect} from 'react';
import AppRouter from "./components/AppRouter";
import {Layout} from "antd";
import './App.css';
import {useActions} from "./hooks/useActions";
import {useHistory} from "react-router-dom";
import Utils, {getStorage} from "./utils";
import {useTypedSelector} from "./hooks/useTypedSelector";


const App:FC = () => {
    const {setAuth,setUser} = useActions()
    const history = useHistory();
    const {user} = useTypedSelector(state => state.auth);

    useEffect(() => {
        if (getStorage() === null){
            setAuth(false)
            history.push("/");
        }else {
            setAuth(true)
        }
        if (Object.keys(user).length === 0) {
            Utils.userInfo().then(res =>{
                setUser(res)
            })
        }else {
            setUser(user)
        }
    },[])
    return (
        <Layout style={{height: 'calc(100vh - 0)'}}>
            <Layout.Content>
                <AppRouter />
            </Layout.Content>
        </Layout>
    );
};

export default App;