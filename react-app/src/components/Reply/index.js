import { useParams, NavLink, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { getBusinesses } from "../../store/business";
import { getReplies } from "../../store/reply";
import EditReplyModal from "../Modals/EditReplyModal/EditReplyModal";
import CreateReplyForm from "./ReplyForm/replyForm";
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
    console.log(replies);
    const data = replies.map((el, i) => {
        return (
            <div className="tweet-container" key={i}>
                {el?.profile_pic ? (
                    <div className="user-things">
                        <div className="tweet-user-img-container">
                            <img
                                src={el.profile_pic}
                                className="tweet-user-img"
                                alt="no img"
                            ></img>
                            <div className="username-container" id="user-text">
                                <NavLink
                                    id="user-text"
                                    to={`/user/${el.user_id}`}
                                >
                                    {el.firstName} @{el?.username} ·{" "}
                                    {el.created_at}
                                </NavLink>
                            </div>
                            {user.id == el.user_id ? (
                                <>
                                    <div className="user-rmodal">
                                        <EditReplyModal replyId={el.id} />
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </div>
                ) : (
                    <div className="user-things">
                        <div className="tweet-user-img-container">
                            <img
                                src={
                                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                }
                                className="tweet-user-img"
                                alt="no img"
                            ></img>
                            <div className="username-container" id="user-text">
                                <NavLink
                                    id="user-text"
                                    to={`/user/${el.user_id}`}
                                >
                                    {el.firstName} @{el?.username} ·{" "}
                                    {el.created_at}
                                </NavLink>
                            </div>
                            {user.id == el.user_id ? (
                                <>
                                    <div className="user-rmodal">
                                        <EditReplyModal replyId={el.id} />
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </div>
                )}
                {el?.image ? (
                    <div className="tweet-text">
                        <p>{el?.body}</p>
                        <div className="all-tweet-img-container">
                            <img
                                src={el?.image}
                                className="tweet-img"
                                alt="img"
                            ></img>
                        </div>
                    </div>
                ) : (
                    <div className="tweet-text">
                        <p>{el?.body}</p>
                    </div>
                )}
            </div>
        );
    });

    return (
        <>
            <CreateReplyForm />
            {data}
        </>
    );
};

export default AllReplies;
