import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom'

import TextEditor from '../TextEditor/TextEditor';
import { imgUrl } from '../../selectors/baseUrl';
import FlashMessage from '../FlashMessage/FlashMessage';

import './style.scss';


const ModifyAnnouce = () => {
    const currentAnnounce = useSelector((state) => state.announce.currentAnnounce);
    const categoryList = useSelector((state) => state.announce.categoryList);
    const flashMessageContent = useSelector((state) => state.announce.flashMessageContent);
    const { id } = useParams();
    const dispatch = useDispatch();

    const [currentImage, ModifyCurrentImage] = useState("");

    useEffect(() => {
        dispatch({
            type: 'GET_ANNOUNCE_BY_ID',
            id: id,
        });
        dispatch({
            type: 'GET_CATEGORY_LIST',
        });
    }, []);

    //Selecting current category after downloading categories list
    useEffect(() => {

        const formSelectOptions = document.querySelector('.addAnnounce__form--select').children;
        const formSelectOptionsArray = [...formSelectOptions];
        formSelectOptionsArray.map((option) => {
            //set all options to false
            if (option.selected === true) { option.selected = false; }
            //select current announce category if exist
            if (currentAnnounce.category[0]) {
                if (currentAnnounce.category[0].id) {
                    if (parseInt(option.dataset.id, 10) === parseInt(currentAnnounce.category[0].id, 10)) {
                        option.selected = true;
                    }
                } else if (currentAnnounce.category[0]) {
                    if (parseInt(option.dataset.id, 10) === parseInt(currentAnnounce.category[0], 10)) {
                        option.selected = true;
                    }
                }
            }

            return true;
        })
    }, [categoryList, currentAnnounce.category])

    //--handleChange modifying functions--//

    const handleTitleChange = (e) => {
        dispatch({
            type: 'MODIFY_CURRENT_ANNOUNCE_TITLE',
            value: e.target.value,
        })
    };

    const handleSelectChange = (e) => {
        dispatch({
            type: 'MODIFY_CURRENT_ANNOUNCE_SELECT',
            value: { id: e.target.selectedOptions[0].dataset.id, }
        })
    };
    const handleChangeImage = (e) => {

        const files = e.target.files;
        const imgName = files[0].name
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = (e) => {
            ModifyCurrentImage(e.target.result);

            dispatch({
                type: 'MODIFY_CURRENT_IMAGE',
                value: e.target.value,
                fileValue: e.target.result,
                imgName: imgName
            })
        }
    }

    //submit Form Function
    const handleSubmitForm = (e) => {
        e.preventDefault();
        dispatch({
            type: 'SUBMIT_MODIFIED_ANNOUNCE',
            id: id,
        })
    };


    return (
        <section>            
            {flashMessageContent && <FlashMessage incomingMessage={flashMessageContent} />}

            <h2 className="addAnnounce__title">Modification d'annonce</h2>

            <form onSubmit={handleSubmitForm} className="addAnnounce__form  modifyAnnounce">

                <label htmlFor="title" className="addAnnounce__form--label" >Titre : </label>
                <input
                    onChange={handleTitleChange}
                    placeholder="titre de l'annonce"
                    required
                    value={currentAnnounce.title}
                    type="text"
                    name="title"
                    id="title"
                    className="addAnnounce__form__input--title"
                />

                <label htmlFor="content" className="addAnnounce__form--label">Contenu </label>
                <TextEditor className="addAnnounce__textEditor  modify__announce"/>

                <select onChange={handleSelectChange} required className="addAnnounce__form--select">
                    <option value="">Choisir une catégorie</option>
                    {categoryList.map((categoryObject) => (
                        <option key={categoryObject.id} value={categoryObject.name} data-id={categoryObject.id}>{categoryObject.name}</option>
                    )
                    )}
                </select>
                <label htmlFor="img" className="addAnnounce__form--label--img" >Modifier l'image</label>
                <input
                    className="addAnnounce__form--input__file"
                    fileValue={currentAnnounce.image}
                    onChange={handleChangeImage}
                    type="file"
                    name="img"
                    id="img"
                    accept="image/png, image/jpeg"
                />

                {/* switch between local and server image preview when modifying source.
             All server's files-img-name begin with number. if it's a letter it displays local image(without baseUrl)*/}
                {
                    currentAnnounce.image &&
                    currentAnnounce.image[0] !== "d" &&
                    <img src={imgUrl + currentAnnounce.image} alt="annonce" />
                }
                {currentImage && currentAnnounce.image[0] === "d" && <img src={currentAnnounce.image} alt="annonce" />}


                <button className="addAnnounce__form--submit" type="submit">Modifier</button>

            </form>
        </section>
    )
}

export default ModifyAnnouce;