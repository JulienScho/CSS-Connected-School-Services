import React from "react";


import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import './style.scss';

const MarksTable = ({ measureDataArray, marksDataArray }) => {

    const generalAverage= [];    

    const dispatch = useDispatch();

    useEffect(() => {
     
        dispatch({
            type: 'FETCH_DISCIPLINES'
        });
    }, [])


    return (
        <table className = "table__content">
            <thead>
                <tr className = "table__content--column">
                    <th>Matières</th>
                    <th>Notes</th>
                    <th>Moyenne</th>
                </tr>
            </thead>
            <tbody>
                
                {measureDataArray.map((measureObject) => {
                    //(measureObject);

                   const gradeData = [];                
                  
                   if (measureObject.name !== "Pause Déjeuner")                    
                     { 
                        return (<tr>              
                            <td className ="table__content--measure">{measureObject.name}</td>
                            <td className ="table__content--marks"> 
                            {marksDataArray.map((markObject) => {
                               // console.log(markObject)
                                if(markObject.discipline.name === measureObject.name){
                                    gradeData.push(parseInt(markObject.grade,10));
                                    generalAverage.push(parseInt(markObject.grade,10));

                                    return (

                                <Link
                                    to ="/espace-perso/mes-cours">
                                        <button 
                                        className ="btn__showresources" 
                                        title ={markObject.title}                                   
                                        aria-label ="matière à afficher">{markObject.grade + " /"}
                                        </button>
                                </Link>
       
                                    )} return true;
                            })  
                        }       
                            </td>
                       
                            <td className = "table__content--average">
                                {parseInt(gradeData.reduce((a,b) => a+b, 0))/gradeData.length}
                            </td> 

                       </tr>);}  
                    
                       return  ( <tr>
                       
                       <td></td>
                       <td></td>
                       
                       <td className ="table__content--average--generalaverage"><span className ="table__content--average--generalaverage--score">Votre moyenne générale : </span> {Math.round(parseInt(generalAverage.reduce((a,b) => a+b, 0)*100)/generalAverage.length)/100 < 10 ? <span className = "table__content--average--generalaverage--badgrade"> 
                        {(Math.round(parseInt(generalAverage.reduce((a,b) => a+b, 0)*100)/generalAverage.length)/100).toString().replace(".",",")} </span> : <span className ="table__content--average--generalaverage--topgrade">
                        {(Math.round(parseInt(generalAverage.reduce((a,b) => a+b, 0)*100)/generalAverage.length)/100).toString().replace(".",",")} </span> 
                                               
                    }</td> 

                            </tr>       
                       )                  
                })                
                }
              
            </tbody>
        </table>
        
    )
};

export default MarksTable;