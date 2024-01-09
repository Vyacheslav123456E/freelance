import React from 'react';
import {Divider, Flex} from "antd";
import moment from "moment";
import {NavLink} from "react-router-dom";
import {useActions} from "../../../hooks/useActions";

const Current = (props: any) => {
    const {countResponses} = useActions();

    const handleCountOrders = (ordersId: number) =>{
        countResponses(ordersId)
    }
    //console.log(props)
    return (
        <>
            {props.response !== undefined &&
                props.response.map((item: any, i: number) => (
                    <div key={i}>
                        <NavLink  to={{
                            pathname: `/c/${Math.random().toString(36).slice(2, 30)}`,
                            state: {item: item},
                        }} rel="noopener noreferrer" onClick={() => handleCountOrders(item['orders.id'])}>
                           <div className={"title"}>{item['orders.title']}</div>
                        </NavLink>
                        <Flex vertical>
                            <Flex gap={4}>
                                <div>{item['orders.price']}</div>
                                <div>{item['orders.type_price'] !== null &&' руб. ' + item['orders.type_price']}</div>
                            </Flex>
                            <span>{moment(item['orders.createdAt']).format('DD.MM.YYYY')}</span>
                            <span>Заказчик: {item['user.name']}</span>
                        </Flex>
                        <Divider/>
                    </div>
                ))
            }
        </>
    );
};

export default Current;