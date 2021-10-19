// == Import
import PropTypes from 'prop-types';

// == Composant
const DisciplinesList = ({ name }) => {
    if(name !== "Pause Déjeuner") {
        return (
            <>  
                <option value={name}>{name}</option>

            </>
        )
    } else { return false; }
};

DisciplinesList.propTypes = {
    name: PropTypes.string.isRequired,
}

// == Export
export default DisciplinesList ;