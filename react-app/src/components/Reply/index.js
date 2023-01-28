import { useParams, Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { getBusinesses } from "../../store/business";
import { getReplies, removeReply } from "../../store/reply";
import CreateReply from "./createReply";
const AllReplies = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const replies = useSelector((store) => {
        return Object.values(store.replies);
    });
    // console.log(replies);
    useEffect(() => {
        dispatch(getReplies(id));
    }, [dispatch, id]);

    const data = replies.map((el) => {
        return (
            <div className="reply-box">
                <h3>{el.body}</h3>
                <h2>
                    {user.id == el.user_id ? (
                        <>
                            <button
                                className="delete-reply-btn"
                                onClick={() => {
                                    dispatch(removeReply(el.id));
                                    dispatch(getReplies(id));
                                }}
                            >
                                Delete
                            </button>
                            <button
                                className="edit-reply-btn "
                                onClick={() => history.push(`/reply/${el.id}`)}
                            >
                                Edit
                            </button>
                        </>
                    ) : null}
                </h2>
            </div>
        );
    });

    return (
        <>
            <h3 className="reply-title">REPLIES</h3>
            <CreateReply />
            <div className="reply-container">{data} </div>
        </>
    );
};

export default AllReplies;
