import React from 'react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import '@ckeditor/ckeditor5-build-classic/build/translations/ru';
import './style.css'

type Props = {
    textEditor(val: any): void;
    text: string
};
const CKEditorForm: React.FC<Props> = (props: Props) => {
    return (
        <div className="editor">
            <CKEditor
                data={props.text}
                editor={ ClassicEditor }
                config={{
                    language: 'ru',
                    toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link', 'numberedList', 'bulletedList', 'insertTable']
                }}
                onChange={(event, editor) => {
                    props.textEditor(editor.getData())
                }}
            />
        </div>
    );
};

export default CKEditorForm;