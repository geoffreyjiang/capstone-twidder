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
const EditReply = ({ replyId, setOpen }) => {
    const user = useSelector((state) => state.session.user);
    const { id } = useParams();
    const reply = useSelector((store) => store.replies[replyId]);
    const dispatch = useDispatch();
    const history = useHistory();
    const [text, setText] = useState(reply?.body);
    const [image, setImage] = useState(reply?.image);
    // useEffect(() => {
    //     dispatch(getReplyId(replyId));
    // }, [dispatch, text]);
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
            id: replyId,
            userId: user.id,
            body: text,
            image,
            tweet_id: num,
        };
        const newReply = dispatch(editReply(data));
        if (newReply) {
            // history.push(`/tweets/${num}`);
            setOpen(false);
            setText("");
            getTweetId(id);
        }
    };

    return (
        <>
            <div className="edit-tweet-container">
                <form
                    method="POST"
                    className="edit-tweet-form"
                    onSubmit={handleSubmit}
                >
                    <h2 className="edit-label">Edit Reply</h2>
                    <label>Reply</label>

                    <input
                        type="text"
                        name="text"
                        value={text}
                        required
                        className="reply-text"
                        onChange={(e) => setText(e.target.value)}
                    ></input>
                    <label>Image Url</label>

                    <input
                        className="reply-text"
                        type="text"
                        name="image"
                        value={image}
                        placeholder="optional"
                        onChange={(e) => setImage(e.target.value)}
                    ></input>
                    <div>
                        <button className="editTweet-btn" type="submit">
                            Post
                        </button>
                        <button
                            className="editTweet-btn"
                            onClick={() => {
                                dispatch(removeReply(replyId));
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditReply;
