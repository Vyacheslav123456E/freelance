import React, {FC, useEffect, useState} from 'react';
import {Card, Col, Row, Button, Form, Input, Cascader, Select, InputNumber,
    Upload,
    Modal,
    UploadFile,
    UploadProps
} from "antd";
import Container from "../../components/Container";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import { InboxOutlined } from "@ant-design/icons/lib";
import { useHistory } from 'react-router-dom';
import {RcFile} from "antd/es/upload";

interface Option {
    title: string | number;
    label: string,
    children?: Option[];
}
export const type_price = [
    {value: 'за проект', label: 'за проект'},
    {value: 'зa час', label: 'за час'},
]

const getBase64 = (file: any): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
const Addorder: FC = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewTitle, setPreviewTitle] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const categories: any  = useTypedSelector(state => state.order.categories_cascader);

    const {fetchCategoriesCascader,addOrder} = useActions()
    const history = useHistory();
    useEffect(() => {
        fetchCategoriesCascader();
    }, []);

     const onFinish =  (data: any) =>{
        let fileIBase64: any[] = []
       fileList.forEach(async (el: any) => {
            fileIBase64.push({file: el.thumbUrl !== "" ? el.thumbUrl:
                    await getBase64(el.originFileObj as string)});
        })
        Object.assign(data,{files: fileIBase64})
        addOrder(data)
         history.push("/");
    };

    const handleCancel = () => setPreviewOpen(false);

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    }
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };
    return (
        <Row justify="space-around" align="middle" className="h100">
            <Card style={{width: 800, margin: 16}} title={"Новый заказ"}>
                <Form
                    name="normal_login"
                    initialValues={{remember: true}}
                    onFinish={onFinish}>
                    <Form.Item name="title" rules={[{required: true, message: 'Необходимо заполнить поле!'}]}>
                        <Input placeholder="Название заказа *"/>
                    </Form.Item>

                    <Form.Item name="categories" rules={[{required: true, message: 'Необходимо заполнить поле!'}]}>
                        <Cascader
                            options={categories.length !== 0 ? categories : []}
                            placeholder="Выберите категорию"/>
                    </Form.Item>

                    <Form.Item name="description" rules={[{required: true, message: 'Необходимо заполнить поле!'}]}>
                        <Input.TextArea showCount style={{height: '300px'}}
                                        placeholder="Описание заказа *"/>
                    </Form.Item>

                    <Form.Item name="tags">
                        <Select
                            mode="tags"
                            style={{width: '100%'}}
                            placeholder="Теги"
                        />
                    </Form.Item>

                    <label>Сумма</label>
                    <Row>
                        <Form.Item name="price" className={"price-modal"}>
                            <InputNumber addonAfter={'₽'} style={{width: 120}} defaultValue={'0'}/>
                        </Form.Item>
                        <Form.Item name="type_price">
                            <Select
                                defaultValue="за проект"
                                style={{width: 120}}
                                options={type_price}
                            />
                        </Form.Item>
                    </Row>

                    <label>Файлы</label>
                    <Form.Item name="files">
                        <Upload.Dragger
                            maxCount={3}
                            accept=".jpeg, .jpg, .png, .pdf, .mp3"
                            listType="picture-card"
                            action={"/uploads"}
                            onChange={handleChange}
                            onPreview={handlePreview}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined/>
                            </p>
                            <p className="ant-upload-text">Добавте или перетащите сюда файлы, изображения</p>
                        </Upload.Dragger>
                        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Row>
    );
};

export default Addorder;