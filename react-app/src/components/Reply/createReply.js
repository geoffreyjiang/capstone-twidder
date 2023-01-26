import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReply } from "../../store/reply";
const CreateReply = () => {
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
        }
    };
    return (
        <>
            <div className="create-reply-container">
                <form className="reply-form" onSubmit={handleSubmit}>
                    <div className="input-reply">
                        <textarea
                            type="text"
                            value={body}
                            name="question"
                            placeholder="Tweet your reply"
                            required
                            className="question-text"
                            onChange={(e) => setBody(e.target.value)}
                        ></textarea>
                    </div>

                    {/* <div className="input-reply">
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.vaue)}
                        ></input>
                    </div> */}
                    <div>
                        <button className="submitBtn" type="submit">
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateReply;
