import React, {FC, useEffect} from 'react';
import AppRouter from "./components/AppRouter";
import {Layout} from "antd";
import './App.css';
import {useActions} from "./hooks/useActions";
import {useTypedSelector} from "./hooks/useTypedSelector";

const App:FC = () => {
    const {setAuth} = useActions()

    useEffect(() => {
        let token = sessionStorage.getItem('_in');
        if ( token === null){
            setAuth(false)
        }else {
            setAuth(true)
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