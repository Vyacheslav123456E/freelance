import React, {useEffect} from 'react';
import {Card, Col, Row, Button, Form, Input, Cascader, Select, InputNumber, Upload} from "antd";
import Container from "../../components/Container";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {DownOutlined, InboxOutlined, PlusOutlined, SettingOutlined} from "@ant-design/icons/lib";

interface Option {
    title: string | number;
    label: string,
    children?: Option[];
}
export const type_price = [
    {value: 'за проект', label: 'за проект'},
    {value: 'зв час', label: 'за час'},
]
const normFile = (e: any) => {
    if (Array.isArray(e)) {
        console.log(e)
        return e;
    }
    return e?.fileList;
};
const Addorder = () => {
    const categories_cascader: any  = useTypedSelector(state => state.order.categories_cascader);

    const {fetchCategoriesCascader} = useActions()
    useEffect(() => {
        fetchCategoriesCascader();
    }, []);


    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    const onChange = (value: any[]) => {
        console.log(value);
    };
    const handleChange = (value: string) => {
        console.log(`${value}`);
    };
    const handleChangeTypePrice = (value: string) => {
        console.log(`${value}`);
    };
    const handleUpload = (value: any) =>{
        console.log(value);
    }
    useEffect(() => {

    }, []);
    return (
        <Container>
            <Row className="h100" justify="center">
                <Col span={16}>
                    <Card title="Новый заказ">
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{remember: true}}
                            onFinish={onFinish}>
                            <label>Название заказа *</label>
                            <Form.Item name="username">
                                <Input/>
                            </Form.Item>
                            <label>Категории *</label>
                            <Form.Item name="categories_cascader">
                                <Cascader
                                    options={categories_cascader.length !== 0 ? categories_cascader : []}
                                    onChange={el => onChange(el)}
                                    placeholder="Выберите категорию"/>
                            </Form.Item>
                            <label>Описание заказа *</label>
                            <Form.Item name="description">
                                <Input.TextArea showCount style={{height: '300px'}}/>
                            </Form.Item>
                            <label>Теги *</label>
                            <Form.Item name="tags">
                                <Select
                                    mode="tags"
                                    style={{width: '100%'}}
                                    placeholder="Ключевые навыки"
                                    onChange={handleChange}
                                />
                            </Form.Item>
                            <label>Сумма *</label>
                            <Row>
                                <Form.Item name="price" className={"price-modal"}>
                                    <InputNumber addonAfter={'₽'} style={{width: 120}} defaultValue={0}/>
                                </Form.Item>
                                <Form.Item name="type_price">
                                    <Select
                                        defaultValue="за проект"
                                        style={{width: 120}}
                                        onChange={handleChangeTypePrice}
                                        options={type_price}
                                    />
                                </Form.Item>
                            </Row>
                            <label>Файлы</label>
                            <Form.Item  valuePropName="fileList" getValueFromEvent={normFile}>
                                <Form.Item name="files" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                                    <Upload.Dragger name="files" action="/upload.do" onChange={e => handleUpload(e)}>
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Добавте или перетащите сюда файлы, изображения</p>
                                    </Upload.Dragger>
                                </Form.Item>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                  Сохранить
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
};

export default Addorder;