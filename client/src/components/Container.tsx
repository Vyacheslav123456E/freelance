import React from 'react';

const Container = (props: any) => {
    return (
        <div style={{
            marginLeft: '5%',
            marginRight: '5%',
            paddingTop: 10,
            paddingBottom: 10}}>
            <div>{props.children}</div>
        </div>
    );
};

export default Container;