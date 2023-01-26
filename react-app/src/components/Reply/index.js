import { useParams, Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { getBusinesses } from "../../store/business";
import { getReplies } from "../../store/reply";
const AllReplies = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const q = useSelector((store) => {
        console.log("store", store);
    });
    useEffect(() => {
        dispatch(getReplies(id));
    }, [dispatch, id]);

    // console.log(q);
    // const allQuestions = q.map((questions) => {
    //     return (
    //         <div className="question-item">
    //             <h4>
    //                 {questions.body} - {questions.username}
    //             </h4>
    //             <div to={`/question/${questions.id}`}>
    //                 Answer this question (Coming Soon)
    //             </div>
    //         </div>
    //     );
    // });
    return (
        <>
            <h3 className="questions-title">REPLIES</h3>
            <div className="questions-container">
                <h5>yo</h5>
            </div>
        </>
    );
};

export default AllReplies;
