import React from 'react';
import Navbar from "./navbar/Navbar";

const Container = (props: any) => {
    return (
        <>
            <Navbar/>
            <div className={'container'}>
                <div>{props.children}</div>
            </div>
        </>
    );
};

export default Container;