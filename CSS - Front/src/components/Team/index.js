// == Import
import './style.scss';

import julien from '../../assets/img/julien.png';
import felipe from '../../assets/img/felipe.svg';
import willy from '../../assets/img/willy.svg';
import kevin from '../../assets/img/kevin.svg';
import adrien from '../../assets/img/adrien.svg';

// == Composant
const Team = () => {
    return (
        <div className="team">
            <h1 className="team__title">L'équipe CSS</h1>
                <section className="team__section">
                    <article className="team__card">
                        <img src={julien} className="team__avatar" alt=""/>
                        <h2 className="team__name">Julien S.</h2>
                        <p className="team__role">Product Owner</p>
                    </article>
                    <article className="team__card">
                        <img src={felipe} className="team__avatar" alt=""/>
                        <h2 className="team__name">Felipe B.</h2>
                        <p className="team__role">Scrum Master</p>
                    </article>
                    <article className="team__card">
                        <img src={willy} className="team__avatar" alt=""/>
                        <h2 className="team__name">Willy D.</h2>
                        <p className="team__role">Lead dev front</p>
                    </article>
                    <article className="team__card">
                        <img src={kevin} className="team__avatar" alt=""/>
                        <h2 className="team__name">Kevin P.</h2>
                        <p className="team__role">Lead dev back</p>
                    </article>
                    <article className="team__card">
                        <img src={adrien} className="team__avatar" alt=""/>
                        <h2 className="team__name">Adrien D.</h2>
                        <p className="team__role">Git Master</p>
                    </article>
                </section>
        </div>

    )
}
// == Export
export default Team;