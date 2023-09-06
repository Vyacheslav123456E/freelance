import React, {useEffect} from 'react';
import {Col, Row, Divider, Card, Tree, Layout} from 'antd';
import {
    AlignRightOutlined,
    CalendarTwoTone,
    CheckCircleTwoTone,
    EyeTwoTone,
    PlusSquareTwoTone
} from "@ant-design/icons/lib";
import {NavLink} from "react-router-dom";
import {useIsXSmall, useIsXSmallCol} from "../../hooks/useIsXSmall";
import {ordersData} from './data'
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import Container from '../../components/Container';
import './style.css'
const { DirectoryTree } = Tree;

const Index = () => {
    const categories: any  = useTypedSelector(state => state.order.categories);
    const {fetchCategories} = useActions()

    useEffect(() => {
        fetchCategories();
    }, []);

    const descriptions = (val: any) => [
        <EyeTwoTone/> ,
        " " + val.views + "просмотров  " ,
        <CheckCircleTwoTone />,
        '  ' + val.responses + ' откликов  ',
        <CalendarTwoTone />,
        '  ' + val.date,
    ]

    const addOrder = () => {
        return (
            <NavLink to={`/addorder`}>
                <PlusSquareTwoTone style={{fontSize: 30}}/>
            </NavLink>
        )
    }
    return (
        <Container>
            <Row className="h100">
                {useIsXSmall() ? (
                    <Col span={6} className={"offset"} >
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
                    <Card title="Заказы"  extra={addOrder()}>
                        {ordersData.map((label) => {
                            return (
                                <Row key={label.id}>
                                    <Col span={21}>
                                        <NavLink to={`/orderId`}>
                                            <div className={"title"}>{label.title}</div>
                                        </NavLink>
                                        <div>{descriptions(label)}</div>
                                    </Col>
                                    <Col span={3}>
                                        <div className={'price'}>{label.price} &#8381;</div>
                                        <div className={'sub-price'}>{'договорная'}</div>
                                    </Col>
                                    {label.tag.map((label, index) => {
                                        return (
                                            <Row key={index}>
                                                <Col span={24}>
                                                    {'#' + label + ' '}
                                                </Col>
                                            </Row>
                                        )
                                    })}
                                    <Divider/>
                                </Row>
                            )
                        })}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Index;