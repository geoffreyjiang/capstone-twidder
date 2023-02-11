import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReply } from "../../store/reply";
const CreateReply = ({ setOpen }) => {
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
        };
        let reply = dispatch(createReply(id, data));
        if (reply) {
            history.push(`/tweets/${id}`);
            setBody("");
            setImage("");
            setOpen(false);
        }
    };
    return (
        <>
            <div className="create-reply-container">
                <h2>Tweet your reply</h2>
                <form className="reply-form" onSubmit={handleSubmit}>
                    <div className="input-reply">
                        <input
                            type="text"
                            value={body}
                            name="reply"
                            placeholder="Tweet your reply"
                            required
                            onChange={(e) => setBody(e.target.value)}
                        ></input>
                    </div>

                    <div className="input-reply">
                        <input
                            type="text"
                            value={image}
                            placeholder="Image (optional)"
                            onChange={(e) => setImage(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <button className="reply-btn" type="submit">
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateReply;
