import React, {FC, useEffect, useState} from 'react';
import {Card, Row, Form, Input, Cascader, Select, InputNumber,
    Upload,
    Modal,
    UploadFile,
    UploadProps
} from "antd";
import Container from "../../components/Container";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import { InboxOutlined } from "@ant-design/icons/lib";
import {RcFile} from "antd/es/upload";
import Buttons from "../../components/Buttons";
import Utils, {getBase64, type_price} from "../../utils";
import {useIsXSmall} from "../../hooks/useIsXSmall";
import DrawerForm from "../../components/DrawerForm";
import { useHistory } from "react-router-dom"
import CKEditorForm from "../../components/ckeditor";
import Tags from "../../components/Tags";


const Addorder: FC = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewTitle, setPreviewTitle] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const categories: any  = useTypedSelector(state => state.order.categories_cascader);
    const {user} = useTypedSelector(state => state.auth);
    const [render, updateRender] = useState('information');
    const {fetchCategoriesCascader,addOrder} = useActions()
    const [stateUser,setStateUser]: any = useState({});
    const [editor,setTextEditor] = useState<string>("");
    const [tags, setTags]: any[] = useState([]);
    const history = useHistory()

    useEffect(() => {
        if (Object.keys(user).length === 0) {
            Utils.userInfo().then(res =>{
                setStateUser(res)
            })
        }else {
            setStateUser(user)
        }
        fetchCategoriesCascader();
    }, []);

    const onFinish =  (data: any) =>{
        let fileIBase64: any[] = []
       fileList.forEach(async (el: any) => {
            fileIBase64.push({file: el.thumbUrl !== "" ? el.thumbUrl:
                    await getBase64(el.originFileObj as string)});
        })
        Object.assign(data,{files: fileIBase64})
        data.user_id = stateUser.id
        data.description = editor
        data.price = Number(data.price)
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

    const textEditor = (value: any) => {
        setTextEditor(value)
    }

    const resTags = (value: []) => {
        setTags(value)
    }

    return (
        <Container>
          <Row justify="space-around" align="middle">
              {!useIsXSmall() && (
                  <DrawerForm stateUser={stateUser} updateRender={updateRender} type={'order'}/>
              )}
            <Card style={{width: 800}} title={"Новый заказ"}>
                <Form
                    initialValues={{remember: true,type_price: 'за проект',price: 0}}
                    onFinish={onFinish}>
                    <Form.Item name="title" rules={[{required: true, message: 'Необходимо заполнить поле!'}]}>
                        <Input placeholder="Название заказа *"/>
                    </Form.Item>

                    <Form.Item name="categories" rules={[{required: true, message: 'Необходимо заполнить поле!'}]}>
                        <Cascader
                            options={categories.length !== 0 ? categories : []}
                            placeholder="Выберите категорию"/>
                    </Form.Item>

                    <Form.Item name="description">
                        {/*<Input.TextArea showCount style={{height: '300px'}} placeholder="Описание заказа *"/>*/}
                         <CKEditorForm textEditor={textEditor} text={''}/>
                    </Form.Item>

                    <Form.Item name="tags">
                     {/*                       <Select
                            mode="tags"
                            style={{width: '100%'}}
                            placeholder="Теги"
                        />*/}
                        <Tags resTags={resTags} skills={[]}/>
                    </Form.Item>

                    <label>Сумма</label>
                    <Row>
                        <Form.Item name="price" className={"price-modal"}>
                            <InputNumber addonAfter={'₽'} style={{width: 120}}/>
                        </Form.Item>
                        <Form.Item name="type_price">
                            <Select
                                style={{width: 120}}
                                options={type_price}
                            />
                        </Form.Item>
                    </Row>

                    <label>Файлы</label>
                    <Form.Item name="files" valuePropName="checked">
                        <Upload.Dragger
                            maxCount={3}
                            accept=".jpeg, .jpg, .png, .pdf, .mp3"
                            listType="picture-card"
                            action={"/uploads"}
                            onChange={handleChange}
                            onPreview={handlePreview}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined/>
                            </p>
                            <p className="ant-upload-text">Добавте или перетащите сюда файлы, изображения</p>
                        </Upload.Dragger>
                    </Form.Item>
                    <Form.Item>
                       <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                         <img alt="example" style={{ width: '100%' }} src={previewImage} />
                       </Modal>
                    </Form.Item>
                    <Form.Item>
                      <Buttons type="primary" htmlType="submit" className="login-form-button" text={"Сохранить"} />
                       {/*          <Button type="primary" htmlType="submit" className="login-form-button">
                            Сохранить
                        </Button>*/}
                    </Form.Item>
                </Form>
            </Card>
        </Row>
        </Container>
    );
};

export default Addorder;