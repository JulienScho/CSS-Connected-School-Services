// == Import
import PropTypes from 'prop-types';
import TextEditor from 'react-quill';

import { Trash, Edit, ChevronDown, ChevronRight } from 'react-feather';
import EditResources from './EditResources';

// == Composant
const ResourcesList = ({ 
    id,
    title, 
    content, 
    handleTitleClick, 
    isSelected, 
    index,
    roleTeacher,
    isEditResourceOpen,
    handleEditResources,
    handleDeleteResource
}) => {
    return (
        <div className="resource__item">
            <div className="resource__header">
            <div id={index} className="resource__title" onClick={handleTitleClick}>
                <h3>{title}</h3>
                <div>{isSelected === index ? <ChevronDown /> : <ChevronRight /> }</div>  
            </div>
            
            </div>
            <div className="resource__overflow">
             {isSelected === index && 
                <>
                {roleTeacher &&
                <div className="resource__buttons">
                    <button className="resource__editBtn" type="button" onClick={handleEditResources}><Edit /></button>
                    <button className="resource__deleteBtn" type="button" onClick={handleDeleteResource}><Trash /></button>
                </div>
            }
                {!isEditResourceOpen &&
                    <TextEditor
                        className="resource__content"
                        value={content}
                        readOnly={true}
                        theme={"bubble"}
                     />

                }
                {isEditResourceOpen &&
                <EditResources 
                    currentTitle={title} 
                    currentContent={content} 
                    currentId={id}
                />
                }
                </>
             }
            </div>
            
            
        </div>
    )
};



ResourcesList.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired, 
    handleTitleClick: PropTypes.func.isRequired,
    isSelected: PropTypes.number,
}

// == Export
export default ResourcesList;