import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {privateRoutes, publicRoutes} from "../router";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {RouteNames} from "../router/names";

const AppRouter = () => {
    const {isAuth} = useTypedSelector(state => state.auth);

    return (
        isAuth ?
            <Switch>
                {privateRoutes.map(route =>
                    <Route path={route.path}
                           exact={route.exact}
                           component={route.component}
                           key={route.path}
                    />
                )}
                <Redirect to={RouteNames.ORDERS}/>
            </Switch>
            :
            <Switch>
                {privateRoutes.map(route =>
                    <Route path={route.path}
                           exact={route.exact}
                           component={route.component}
                           key={route.path}
                    />
                )}
                <Redirect to={RouteNames.ORDERS}/>
            </Switch>
    );
};

export default AppRouter;