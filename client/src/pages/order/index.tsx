import React, {FC, useEffect, useState} from 'react';
import {Col, Row, Divider, Card, Tree, Layout, Tag, Space, Pagination, PaginationProps} from 'antd';
import {
    AlignRightOutlined,
    CalendarTwoTone,
    CheckCircleTwoTone,
    EyeTwoTone, PlusCircleOutlined
} from "@ant-design/icons/lib";
import {NavLink} from "react-router-dom";
import {useIsXSmall, useIsXSmallCol} from "../../hooks/useIsXSmall";
import moment from 'moment'
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import Container from '../../components/Container';
import './style.css'
import Navbar from "../../components/Navbar";
const { DirectoryTree } = Tree;

const Index: FC = () => {
    const {fetchCategories,fetchOrder,fetchOrderPagination} = useActions()
    const categories: any  = useTypedSelector(state => state.order.categories);
    const orders: any  = useTypedSelector(state => state.order.orders);
    const count: any  = useTypedSelector(state => state.order.count);
    const {isAuth, user}: any = useTypedSelector(state => state.auth);


    useEffect(() => {
        fetchCategories();
        fetchOrder();
    }, []);

    const onChange: PaginationProps['onChange'] = (current,pageSize) => {
        fetchOrderPagination({current: current !== 0 ? current -1 : current, page: pageSize})
    };
    const addOrder = () => {
        return (
            isAuth &&
            <NavLink to={`/addorder`}>
                <PlusCircleOutlined style={{fontSize: 30}}/>
            </NavLink>

        )
    }
    return (
        <>
            <Navbar/>
            <Container>
                <Row>
                    {useIsXSmall() ? (
                        <Col span={6} className={"offset"}>
                            <Card title="Фильтр">
                                <DirectoryTree
                                    multiple
                                    checkable
                                    defaultSelectedKeys={['0-1']}
                                    defaultExpandAll
                                    treeData={categories}
                                    showIcon={false}
                                    blockNode/>
                            </Card>
                        </Col>
                    ) : (
                        <div className={"filter-small"}>
                            <AlignRightOutlined style={{fontSize: '28px'}}/>
                        </div>
                    )}
                    <Col span={useIsXSmallCol() ? 24 : 18}>
                        <Card title="Заказы" extra={addOrder()}>
                            {orders.length !== 0 &&
                            orders.map((item: any) => {
                                return (
                                    <Row key={item.id}>
                                        <Col span={21}>
                                            <NavLink to={{
                                                pathname:`/orderId/${item.id}`,
                                                state: {item: item}
                                            }}>
                                                <div className={"title"}>{item.title + ',' + item.id}</div>
                                            </NavLink>
                                            <Space size={[0, 8]} wrap>
                                                <Tag icon={<EyeTwoTone/>} className={"tag"}>
                                                    {item.views + " просмотров"}
                                                </Tag>
                                                <Tag icon={<CheckCircleTwoTone/>} className={"tag"}>
                                                    {item.responses + " откликов"}
                                                </Tag>
                                                <Tag icon={<CalendarTwoTone/>} className={"tag"}>
                                                    {moment(item.createdAt).format('DD.MM.YYYY hh:mm')}
                                                </Tag>
                                            </Space>
                                        </Col>
                                        <Col span={3}>
                                            <div className={'price'}>
                                                {item.price === "Договрная" ? item.price :
                                                    <div>{item.price} &#8381;</div>
                                                }
                                            </div>
                                            <div className={'sub-price'}>{item.type_price}</div>
                                        </Col>
                                        {item.tags?.map((el: any, index: any) => {
                                            return (
                                                <Space size={[0, 8]} wrap key={index} style={{paddingTop: 9}}>
                                                    <Tag color="cyan">
                                                        {"  #" + el + ' '}
                                                    </Tag>
                                                </Space>
                                            )
                                        })}
                                        <Divider/>
                                    </Row>
                                )
                            })}
                            <Pagination
                                showQuickJumper
                                defaultPageSize={10}
                                defaultCurrent={1}
                                total={count}
                                onChange={(current,page) =>{
                                    onChange(current,page)
                                }}
                                />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Index;