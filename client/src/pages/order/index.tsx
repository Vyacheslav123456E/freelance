import React, {FC, useEffect, useState} from 'react';
import {Col, Row, Divider, Card, Tree, Tag, Space, Pagination, PaginationProps, Flex} from 'antd';
import {
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
import DrawerForm from "../../components/DrawerForm";
import {response_ph, views_ph} from "../../utils";
import parse from "html-react-parser";


const { DirectoryTree } = Tree;
const Index: FC = () => {
    //Разобраться почему страница рендерится несколько раз
    const {fetchCategories,fetchOrder,fetchOrderPagination,addViews} = useActions();
    const user: any = useTypedSelector(state => state.auth.user);
    const categories: any  = useTypedSelector(state => state.order.categories);
    const orders: any  = useTypedSelector(state => state.order.orders);
    const count: any  = useTypedSelector(state => state.order.count);
    const [render, updateRender] = useState('information');
    const [scrollPosition, setScroll] = useState(0);

   // console.log(orders)

    useEffect(() => {
        window.scrollTo(0, scrollPosition);
        fetchCategories();
        fetchOrder();
    }, [user]);

    const onChange: PaginationProps['onChange'] = (current,pageSize) => {
        fetchOrderPagination({current: current !== 0 ? current -1 : current, page: pageSize})
    };

    const addOrder = () => {
        return (
          user.length !== 0 && user.role_id === 1 &&
            <NavLink to={`/addorder`}>
                <PlusCircleOutlined style={{fontSize: 30}}/>
            </NavLink>

        )
    }

    const handleViews = (item: number) =>{
        addViews({order_id: item,user_id: user.id})
    }

    const link = () =>{
       // console.log('link')
        setScroll(window.scrollY)
        sessionStorage.setItem("scrollPosition", String(window.scrollY));
    }

    return (
        <Container>
            <Row>
                {useIsXSmall() ? (
                    <Col sm={6} className={"offset"}>
                        <Card title="Фильтр">
                            <DirectoryTree
                                multiple
                                checkable
                                showLine={false}
                                defaultSelectedKeys={['0-1']}
                                defaultExpandAll
                                treeData={categories}
                                showIcon={false}
                                blockNode
                                className={'tree-text'}
                            />
                        </Card>
                    </Col>
                ) : (
                    <DrawerForm stateUser={user} updateRender={updateRender} type={'order'}/>
                )}
                <Col span={useIsXSmallCol() ? 24 : 18}>
                    <Card title="Заказы" extra={addOrder()} bordered={false}>
                        {orders.length !== 0 &&
                           orders.map((item: any) => {
                             return (
                                <div key={item.id}>
                                    <NavLink  to={{
                                        pathname: `/a/${Math.random().toString(36).slice(2, 30)}`,
                                        state: {item: item},
                                    }} rel="noopener noreferrer" onClick={() => handleViews(item.id)}>
                                        <Card hoverable style={{marginTop: 16, background: '#eeeeee'}}>
                                            <Row>
                                                <Col span={21}>
                                                    {item.user_id !== null &&
                                                    item.user_id === user?.id &&
                                                    <Flex className={"response"}>Вы откликнулись </Flex>
                                                    }
                                                    <div className={"title"} >{item.title}</div>
                                                    <Space size={[0, 8]} wrap>
                                                        <Tag icon={<EyeTwoTone/>} className={"tag"}>
                                                            { item.views + " " +
                                                              views_ph(Number(item.views),[])
                                                            }
                                                        </Tag>
                                                        <Tag icon={<CheckCircleTwoTone/>} className={"tag"}>
                                                            {item.response + " " +
                                                              response_ph(Number(item.response), [])}
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
                                                        <Space size={[0, 8]} wrap key={index}
                                                               style={{paddingTop: 9}}>
                                                            <Tag >
                                                                {"  #" + el + ' '}
                                                            </Tag>
                                                        </Space>
                                                    )
                                                })}
                                                <Divider style={{margin: '9px 0 14px 0'}}/>
                                                <Col span={24}>
                                                    <div className={"description_text"}>{parse(item.description)}</div>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </NavLink >
                                </div>
                            )
                        })}
                        <Pagination
                            showQuickJumper
                            defaultPageSize={10}
                            defaultCurrent={1}
                            total={count}
                            style={{marginTop: 16}}
                            onChange={(current, page) => {
                                onChange(current, page)
                            }}
                        />
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Index;