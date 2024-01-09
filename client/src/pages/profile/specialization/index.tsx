import React, {useEffect, useState} from 'react';
import {Button, Cascader, Checkbox, Col, Divider, Form, Input, InputNumber, notification, Row, Select} from "antd";
import Tags from "../../../components/Tags";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useActions} from "../../../hooks/useActions";
import {NotificationPlacement} from "antd/es/notification/interface";
import {type_price} from "../../../utils";

const { SHOW_CHILD } = Cascader;
const Context = React.createContext({ name: 'Default' });
type Props = {stateUser: any};

const Index: React.FC<Props> = (props: Props) => {
    const {fetchCategoriesCascader,specialization} = useActions();
    const categories: any = useTypedSelector(state => state.order.categories_cascader);
    const [tags, setTags]: any[] = useState([]);
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        fetchCategoriesCascader();
    }, []);

    const onFinish = async (data: any) => {
        data.skills = tags.length === 0 ? props.stateUser.specialization[0].skills : tags
        data.user_id = props.stateUser.id
        let res: any = await specialization(data)
        if (res){
            openNotification('topRight', 'Обновлено', 'ok');
        }else {
            openNotification('topRight', '', 'error');
        }
    }
    const resTags = (value: []) => {
        setTags(value)
    }

    const openNotification = (placement: NotificationPlacement,message: string, type: string) => {
        if (type === 'ok') {
            api.success({
                message: ``,
                description: <Context.Consumer>{({name}) => message}</Context.Consumer>,
                placement,
            });
        }else {
            api.error({
                message: `Ошибка`,
                placement,
            });
        }
    };
    
    return (
        <>
            {contextHolder}
            <Form onFinish={onFinish} layout="vertical"
                  initialValues={{
                      specialization: props.stateUser.specialization[0].specialization,
                      skills: props.stateUser.specialization[0].skills,
                      activity: props.stateUser.specialization[0].activity,
                      experience: props.stateUser.specialization[0].experience,
                      payment: props.stateUser.specialization[0].payment,
                      type_price: props.stateUser.specialization[0].type_price,
                      payment_method: props.stateUser.specialization[0].payment_method,
                      form_ownership: props.stateUser.specialization[0].form_ownership
                  }}>
                <Col xs={24} sm={12}>
                    <Form.Item name="specialization">
                        <Input placeholder="Cпециализация"/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24}>
                    <Form.Item name="skills" style={{textAlign: "left"}}>
                        <Tags resTags={resTags}
                              skills={props.stateUser.specialization[0].skills === null ? [] : props.stateUser.specialization[0].skills}/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item name="activity">
                        <Cascader
                            options={categories.length !== 0 ? categories : []}
                            placeholder={"Сфера деятельности"}
                            multiple
                            maxLength={10}
                            showCheckedStrategy={SHOW_CHILD}
                            maxTagCount="responsive"
                        />
                    </Form.Item>
                    <div className={'label'}>
                        <label>Ваш опыт работы</label>
                        <Form.Item name="experience">
                            <Input placeholder={'0'} style={{width: 120}}/>
                        </Form.Item>
                    </div>
                    <div className={'label'}>
                        <label>  {props.stateUser.specialization[0].type_price}</label>

                        <Row>
                            <Form.Item name="payment" className={"price-modal"}>
                                <InputNumber addonAfter={'₽'} placeholder="0" style={{width: 120}}/>
                            </Form.Item>
                            <Form.Item name="type_price">
                                <Select
                                    style={{width: 120}}
                                    options={type_price}
                                />
                            </Form.Item>
                        </Row>
                    </div>
                    <div className={'label'}>
                        <label>Способ оплаты</label>
                        <Form.Item name="payment_method">
                            <Checkbox.Group style={{width: '100%'}}>
                                <Row>
                                    <Col span={24}>
                                        <Checkbox value="Безналичный расчёт" className={'checkbox-left'}>Безналичный
                                            расчёт</Checkbox><br/>
                                        <Checkbox value="Наличный расчёт" className={'checkbox-left'}>Наличный
                                            расчёт</Checkbox><br/>
                                        <Checkbox value="Электронные деньги" className={'checkbox-left'}>Электронные
                                            деньги</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </Form.Item>
                    </div>
                    <div className={'label'}>
                        <label>Форма собственности</label>
                        <Form.Item name="form_ownership">
                            <Checkbox.Group style={{width: '100%'}}>
                                <Row>
                                    <Col span={24}>
                                        <Checkbox value="ИП" className={'checkbox-left'}>ИП</Checkbox><br/>
                                        <Checkbox value="Юридическое лицо" className={'checkbox-left'}>Юридическое
                                            лицо</Checkbox><br/>
                                        <Checkbox value="Физ. лицо" className={'checkbox-left'}>Физ. лицо</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </Form.Item>
                    </div>
                    <Divider/>
                    <Col xs={24} sm={24}>
                        <Row justify="start" align="middle">
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Сохранить
                                </Button>
                            </Form.Item>
                        </Row>
                    </Col>
                </Col>
            </Form>
        </>
    );
};

export default Index;