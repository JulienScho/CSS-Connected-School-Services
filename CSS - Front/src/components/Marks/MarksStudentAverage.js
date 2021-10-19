import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { roundNumber }from '../../selectors/round';

const MarksStudentAverage = () => {

    const userId = useSelector((state) => state.user.userId);
    const marksList = useSelector((state)=> state.marks.grade);

    const dispatch = useDispatch();
    
    const Average = () => {
        let marksSum = 0;
        let marksNumber = 0;
            marksList.map((mark)=>{
                marksSum+=parseInt(mark.grade);
                marksNumber++;  
            return true;    
            })
        return roundNumber(marksSum/marksNumber);
    }

    useEffect(()=>{
        dispatch({
            type: 'GET_CURRENT_MARKS',
            id: userId,
        })
    },[])


return(
    <section className = "MarksStudentAverage" >
        <h3 className = "MarksStudentAverage__title">Ta moyenne générale : </h3>
        <p className = "MarksStudentAverage__mark"> { Average().toString().replace(".",",") } </p>
    </section>
)
}
export default MarksStudentAverage;