import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import TextEditor from 'react-quill';
import { toolbarFullOptions } from '../TextEditor/toolbarOptions'


const AddResources = ({ teacherDisciplineId }) => {
    //link state    
    const newTitle = useSelector((state) => state.lesson.newResourceTitle);

    const [inputContentValue, setInputContentValue] = useState('');

    //Link Dispatch
    const dispatch = useDispatch();

    //Reset TextEditor Content
    useEffect(()=>{
        dispatch({
            type: 'CLEAN_EDITOR_CONTENT',
        })
    },[]);

    //handleChange functions
    const handleTitleChange = (e) => {
        dispatch({
            type: 'CHANGE_INPUT_RESOURCE_TITLE',
            newTitle: e.target.value,
        })
    };

    const handleContentChange = (e) => {
        setInputContentValue(e);
    };

 
    const sendNewResource = () => {
        dispatch({
            type: 'SEND_NEW_RESOURCE',
            disciplineId: teacherDisciplineId,
            content: inputContentValue,
        })
    };
    
    //submit Form Function
    const handleSubmitForm = (e) => {
        e.preventDefault();
        sendNewResource();

    };

    return (
        <section>
            <form onSubmit={handleSubmitForm} className="addResource-form" >
                <label className="addResource-form__label" htmlFor="title">Titre : </label>
                <input
                    onChange={handleTitleChange}
                    className="addResource-form__input"
                    type="text" 
                    value={newTitle}
                    placeholder="Titre de la ressource"
                    id="title"
                />
                <label className="addResource-form__label" htmlFor="content">Contenu : </label>
                <TextEditor theme="snow" modules={{ toolbar: toolbarFullOptions }} onChange={handleContentChange} />
                <button className="addResource-form__addBtn" type="submit">Publier</button>
            </form>
        </section>
    );

};

export default AddResources;