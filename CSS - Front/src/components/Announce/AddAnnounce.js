import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { useState } from 'react';
import FlashMessage from '../FlashMessage/FlashMessage';

import TextEditor from 'react-quill';
import { toolbarFullOptions } from '../TextEditor/toolbarOptions'



const AddAnnounce = () => {
    //link state    
    const titleInputValue = useSelector((state) => state.announce.newAnnounceTitle);
    const categoryList = useSelector((state) => state.announce.categoryList);
    const flashMessageContent = useSelector((state) => state.announce.flashMessageContent);
    //local state to display selected image preview and be reusable
    const [imgUrl, setImgUrl] = useState("");
    const [imgName, setImgName] = useState("");
    const [inputTitleValue, setInputTitleValue] = useState('');
    const [inputContentValue, setInputContentValue] = useState('');
    const [selectOptionValue, setSelectOptionsValue] = useState('');

    //Link Dispatch
    const dispatch = useDispatch();

    useEffect(() => {        
        dispatch({
            type: 'GET_CATEGORY_LIST',
        });
    }, [dispatch]);

    //reset to "" input file value at each send
    useEffect(() => {
        const inputFile = document.querySelector('.addAnnounce__form--input__file');
        inputFile.value = "";
    }, [titleInputValue]);

    //handleChange functions
    const handleTitleChange = (e) => {
        setInputTitleValue(e.target.value)
    };
    const handleContentChange = (e) => {
        setInputContentValue(e);
    };
    const handleSelectChange = (e) => {
        setSelectOptionsValue(e.target.selectedOptions[0].dataset.id)
    };
    const handleLoadImage = (e) => {
        // check if exists to avoid error when cancelling choice of picture
        if(e.target.files[0]){

        setImgName(e.target.files[0].name);
        const files = e.target.files;
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = (e) => {
            setImgUrl(e.target.result);
            //console.log('event', e.target.result.replace("data:", "").replace(/^.+,/, ""))
            // dispatch({
            //     type: 'CHANGE_INPUT_IMAGE',
            //     value: e.target.value,
            //     fileValue: e.target.result,
            //     imgName: imgName
            // })
        }}
    }

    //submit Form Function
    const handleSubmitForm = (e) => {
        e.preventDefault();
        dispatch({
            type: 'SUBMIT_ANNOUNCE',
            imgName: imgName,
            imgB64: imgUrl,
            title: inputTitleValue,
            content: inputContentValue,
            categoryId: selectOptionValue,
        });
        // Reset form inputs
        setImgUrl("");
        setImgName("");
        setInputTitleValue("");
        setInputContentValue("");
        setSelectOptionsValue("");
        const quill = document.querySelector('.ql-editor');
        quill.innerHTML = "";
    };

    return (
        <section>
            {flashMessageContent && <FlashMessage incomingMessage={flashMessageContent} />}

            <h2 className="addAnnounce__title">Ajout d'annonce</h2>

            <form className="addAnnounce__form" onSubmit={handleSubmitForm} >

                <label className="addAnnounce__form--label" htmlFor="title">Titre : </label>
                <input
                    onFocus={(e) => e.target.placeholder = ""}
                    onBlur={(e) => e.target.placeholder = "titre de l'annonce"} 
                    className="addAnnounce__form__input--title"
                    placeholder="titre de l'annonce"
                    required onChange={handleTitleChange}
                    value={inputTitleValue}
                    type="text" name="title"
                    id="title"
                />

                <label className="addAnnounce__form--label" htmlFor="content">Contenu </label>

                <TextEditor className="addAnnounce__textEditor" theme="snow" modules={{ toolbar: toolbarFullOptions }} onChange={handleContentChange} />

                
                    <select value={selectOptionValue} required className="addAnnounce__form--select" onChange={handleSelectChange}>
                        <option value="">Choisir une catégorie</option>
                        {
                            categoryList.map((categoryObject) => (
                                <option value={categoryObject.id} key={categoryObject.id} data-id={categoryObject.id}>
                                    {categoryObject.name}
                                </option>
                            )
                            )}
                    </select>
                    
                    <label className="addAnnounce__form--label--img" htmlFor="img">Choisir une image</label>
                    <input
                        className="addAnnounce__form--input__file"
                        required onChange={handleLoadImage}
                        type="file"
                        name="img"
                        id="img"
                        accept="image/png, image/jpeg"
                    />
                    

                    
               
                <button className = "addAnnounce__form--submit" type="submit">Publier</button>

                {imgUrl && <img src={imgUrl} alt="preview" />}

            </form>
        </section>
    );

};

export default AddAnnounce;