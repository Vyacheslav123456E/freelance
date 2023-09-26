import React, {FC} from 'react';
import {useLocation} from 'react-router-dom';
import Container from "../../components/Container";
import {Card, Col, Row, Image, Space, Tag, Divider} from "antd";
import {useIsXSmall, useIsXSmallCol} from "../../hooks/useIsXSmall";
import {AlignRightOutlined, CalendarTwoTone, CheckCircleTwoTone, EyeTwoTone} from "@ant-design/icons/lib";
import './style.css'
import moment from "moment";

const OrderId: FC = () => {
    let params: any = useLocation().state;


    return (
        <Container>
            <Row>
                {useIsXSmall() ? (
                    <Col span={6} className={"offset"} >
                        <Card title="Фильтр">

                        </Card>
                    </Col>
                ) : (
                    <div className={"filter-small"}>
                        <AlignRightOutlined style={{fontSize: '28px'}}/>
                    </div>
                )}
                <Col span={useIsXSmallCol() ? 24 : 18}>
                    <Card title={params.item.title}>
                        <Row>
                            <div className={'price-id'}>
                                {params.item.price === "Договрная" ? params.item.price :
                                    <div>{params.item.price} &#8381;</div>
                                }
                            </div>
                            <div className={'sub-price-id'}>{params.item.type_price}</div>
                        </Row>
                        <Row>
                            <Space size={[0, 8]} wrap>
                                <Tag icon={<EyeTwoTone/>} className={"tag"}>
                                    {params.item.views + " просмотров"}
                                </Tag>
                                <Tag icon={<CheckCircleTwoTone/>} className={"tag"}>
                                    {params.item.responses + " откликов"}
                                </Tag>
                                <Tag icon={<CalendarTwoTone/>} className={"tag"}>
                                    {moment(params.item.createdAt).format('DD.MM.YYYY hh:mm')}
                                </Tag>
                            </Space>
                        </Row>
                        <Row>
                            {params.item.tags?.map((el: any, index: any) => {
                                return (
                                    <Space size={[0, 8]} wrap key={index} style={{paddingTop: 9}}>
                                        <Tag color="cyan">
                                            {"  #" + el + ' '}
                                        </Tag>
                                    </Space>
                                )
                            })}
                        </Row>
                        <Divider/>
                        <Row>
                            <p>{params.item.description}</p>
                        </Row>
                        <Divider/>
                       <Image.PreviewGroup>
                        <h4>Файлы</h4>
                            {params.item.files.length !== 0 &&
                            params.item.files.map((item: any, i: number) => {
                                return (
                                    <Image width={200} key={i} src={item?.file}/>
                                )
                            })}
                        </Image.PreviewGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderId;