import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
    editReply,
    getReplies,
    getReplyId,
    removeReply,
} from "../../store/reply";
import { getTweetId } from "../../store/tweets";
const EditReply = ({ setOpen }) => {
    const user = useSelector((state) => state.session.user);
    const { id } = useParams();
    const reply = useSelector((store) => store.replies);
    const dispatch = useDispatch();
    const history = useHistory();
    const [text, setText] = useState(reply?.body);
    const [image, setImage] = useState(reply?.image);
    // setText(reply.body);
    useEffect(() => {
        dispatch(getReplyId(id));
    }, [dispatch, text]);

    useEffect(() => {
        setText(reply.body);
        setImage(reply.image);
    }, [reply.body, reply.image]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let num = Number(reply.tweet_id);
        if (!user) {
            alert("Please login!");
        }
        const data = {
            id,
            userId: user.id,
            body: text,
            image,
            tweet_id: num,
        };
        const newReply = dispatch(editReply(data));
        if (newReply) {
            history.push(`/tweets/${num}`);
            setOpen(false);

            setText("");
        }
    };

    return (
        <>
            <div className="tweet-section">
                <div className="tweet-container">
                    <form
                        method="POST"
                        className="edit-reply-form"
                        onSubmit={handleSubmit}
                    >
                        <h2 className="edit-label">Edit Reply</h2>
                        <textarea
                            type="text"
                            name="text"
                            value={text}
                            required
                            className="reply-text"
                            onChange={(e) => setText(e.target.value)}
                        ></textarea>
                        <input
                            className="reply-text"
                            type="text"
                            name="image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        ></input>
                        <div>
                            <button className="submitBtn" type="submit">
                                Post
                            </button>
                            <button
                                className="delete-reply-btn"
                                onClick={() => {
                                    dispatch(removeReply(id));
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditReply;
