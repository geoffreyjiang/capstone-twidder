import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
    getTweets,
    getTweetId,
    editTweet,
    removeTweet,
} from "../../store/tweets";

const EditTweet = () => {
    const user = useSelector((state) => state.session.user);
    const { id } = useParams();
    const tweet = useSelector((store) => store.tweets);
    const dispatch = useDispatch();
    const history = useHistory();
    const [body, setBody] = useState(tweet.body);
    const [img, setImg] = useState(tweet.image);
    useEffect(() => {
        dispatch(getTweetId(id));
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Please login!");
        }

        const data = {
            id,
            userId: user.id,
            body,
            image: img,
        };
        const newTweet = dispatch(editTweet(data));
        if (newTweet) {
            history.push(`/tweets/${id}`);
            dispatch(getTweetId(id));
            setBody("");
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
                    <h2 className="edit-label">Edit Tweet</h2>
                    <textarea
                        type="text"
                        value={body}
                        name="tweet"
                        required
                        className="tweet-text"
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                    <input
                        className="tweet-text"
                        type="text"
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                    ></input>
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

export default EditTweet;
