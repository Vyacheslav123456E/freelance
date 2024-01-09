import React, {useEffect, useRef, useState} from 'react';
import {TweenOneGroup} from 'rc-tween-one';
import type {InputRef} from 'antd';
import {Col, Input, Tag, theme} from 'antd';
import {CloseCircleTwoTone} from "@ant-design/icons/lib";

type Props = {
    resTags(tags: any): void;
    skills: []
};

const App: React.FC<Props> = (props: Props) => {
    const {token} = theme.useToken();
    const [tags, setTags]: any[] = useState(props.skills);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<InputRef>(null);

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);

    const handleClose = (removedTag: string) => {
        const newTags = tags.filter((tag: any) => tag !== removedTag);
        setTags(newTags);
        props.resTags(newTags);
    };

    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1 && tags.length <=16 ) {
            setTags([...tags, inputValue]);
            props.resTags([...tags, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };

    const forMap = (tag: string) => {
        const tagElem = (
            <Col xs={24} sm={24}>
                <Tag
                    style={{height: 27, padding: '2px 1px 0px 10px', width: '100%', margin: 3}}
                    color="blue"
                    closeIcon={<CloseCircleTwoTone style={{marginInlineStart: 6}}/>}
                    onClose={(e) => {
                        e.preventDefault();
                        handleClose(tag);
                    }}>
                    {tag}
                </Tag>
            </Col>
        );
        return (
            <span key={tag} style={{display: 'inline-block',marginRight: 8}}>
        {tagElem}
      </span>
        );
    };

    const tagChild = tags.map(forMap);

    const tagPlusStyle: React.CSSProperties = {
        height: 32,
        padding: '4px 13px',
        background: token.colorBgContainer,
        float: 'left',
        fontSize: 14,
        width: '100%',
        lineHeight: 1.5714285714285714,
        color: "rgb(206 206 206)"
    };
    return (
        <>
            <Col xs={24} sm={24}>
                <TweenOneGroup
                    style={{textAlign: 'left'}}
                    appear={false}>
                    {tagChild}
                </TweenOneGroup>
            </Col>
            <Col xs={24} sm={24}>
              <div className={'label'}>Не более 17 навыков ({tagChild.length})</div>
            </Col>
            {inputVisible ? (
                <Col xs={24} sm={12}>
                    <Input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        placeholder={"Не больше 20 символов"}
                        maxLength={20}
                        onChange={handleInputChange}
                        onBlur={handleInputConfirm}
                        onPressEnter={handleInputConfirm}
                    />
                </Col>
            ) : (
                <>
                    <Col xs={24} sm={12}>
                        <Tag onClick={showInput} style={tagPlusStyle}>Ваши навыки</Tag>
                    </Col>
                </>
            )}
        </>
    );
};

export default App;