import React from "react";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


import MarksTable from "./MarksTable";

// import ResourcesList from "../ResourcesList";

import './style.scss';

function Marks() {

    const disciplineList = useSelector ((state) => state.lesson.disciplinesList);
    const currentMarks = useSelector((state) => state.marks.grade);
    const userId = useSelector((state) => state.user.userId);

    const userRole = useSelector((state) => state.user.roles);

    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'GET_CURRENT_MARKS',
            id : userId,
        });

        dispatch({
            type: 'FETCH_DISCIPLINES'
        });
    }, [dispatch, userId])

    return (
        <div className="marks">
            {currentMarks === [] ?
                <h1>Problème de connexion</h1> :
                userRole[0] === "ROLE_ADMIN" ?
                    <h1> ÉLÈVE </h1> :
                    <section className="marks__section">
                        <MarksTable
                        measureDataArray={disciplineList}
                        marksDataArray={currentMarks}                                                                
                        />                     
                    </section>
            }
        </div>
    );
}

export default Marks;