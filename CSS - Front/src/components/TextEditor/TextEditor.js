import ReactQuill from 'react-quill';
import {toolbarFullOptions} from "./toolbarOptions";
import { useDispatch, useSelector } from 'react-redux'

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import './style.scss'

const TextEditor = () => {

    const editorModifyBaseValue = useSelector((state) => state.textEditor.editorModifyBaseValue);
    const dispatch = useDispatch();


    const handleChange = (e) => {
        //console.dir(e)
        dispatch({
            type: 'SET_TEXT_EDITOR_CONTENT',
            editorContent: e,
        })
    }


    return (

        <ReactQuill theme="snow" value={editorModifyBaseValue} modules={{ toolbar: {toolbarFullOptions} }} onChange={handleChange} />
    )

}

export default TextEditor;