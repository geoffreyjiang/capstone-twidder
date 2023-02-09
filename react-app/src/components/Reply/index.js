import { useParams, Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { getBusinesses } from "../../store/business";
import { getReplies, removeReply } from "../../store/reply";
import CreateReplyModal from "../Modals/ReplyModal/CreateReplyModal";
import EditReplyModal from "../Modals/EditReplyModal/EditReplyModal";
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

    const data = replies.map((el, i) => {
        return (
            <div className="tweet-container" key={i}>
                {el?.profile_pic ? (
                    <div className="user-things">
                        <div className="profile_pic">
                            <img
                                src={el.profile_pic}
                                className="tweet-user-img"
                                alt="no img"
                            ></img>
                        </div>
                        <div className="username-container">
                            {el.firstName} @{el?.username}
                        </div>
                    </div>
                ) : (
                    <div className="user-things">
                        <img
                            src={
                                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            }
                            className="tweet-user-img"
                            alt="no img"
                        ></img>
                        {el.firstName} @{el?.username}
                    </div>
                )}
                <h3>{el.body}</h3>
                <div className="edit-modal">
                    {user.id == el.user_id ? (
                        <>
                            <EditReplyModal replyId={el.id} />
                        </>
                    ) : null}
                </div>
            </div>
        );
    });

    return (
        <>
            <CreateReplyModal />
            {data}
        </>
    );
};

export default AllReplies;
