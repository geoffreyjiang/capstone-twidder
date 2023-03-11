import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReply } from "../../../store/reply";
import "./index.css";
const CreateReplyForm = () => {
    const user = useSelector((state) => state.session.user);
    // console.log(user);
    const { id } = useParams();
    const dispatch = useDispatch();

    const history = useHistory();
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Please login!");
        }
        const data = {
            image,
            body,
            tweet_id: id,
        };
        let reply = dispatch(createReply(id, data));
        if (reply) {
            history.push(`/tweets/${id}`);
            setBody("");
            setImage("");
        }
    };
    let profPic;
    if (user?.profile_pic) profPic = user?.profile_pic;
    else
        profPic =
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

    // console.log(user);
    return (
        <>
            <div className="create-replyModal-container">
                <img
                    src={profPic}
                    className="reply-sessionUser-img"
                    alt="img"
                ></img>

                <div className="replyId-form">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="input-reply"
                            type="text"
                            value={body}
                            name="reply"
                            placeholder="Tweet your reply"
                            required
                            onChange={(e) => setBody(e.target.value)}
                        ></input>

                        <input
                            className="input-reply"
                            type="text"
                            value={image}
                            placeholder="Image (optional)"
                            onChange={(e) => setImage(e.target.value)}
                        ></input>
                        <div>
                            <button className="reply-btn" type="submit">
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateReplyForm;
