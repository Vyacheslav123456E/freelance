import React from 'react';
import {useIsXSmall} from "../hooks/useIsXSmall";

const Layout = (props: any) => {
    return (
        <>
            <div className={useIsXSmall() ? 'layout' : 'layout--mobile'}>
                <div>{props.children}</div>
            </div>
        </>
    );
};

export default Layout;