import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// import {
//     getTweets,
//     getTweetId,
//     editTweet,
//     removeTweet,
// } from "../../store/tweets";

import {
    getTweetId,
    editTweet,
    removeTweet,
    getTweets,
} from "../../../store/tweets";
// import "./index.css";
const EditTweet = ({ setOpen }) => {
    const user = useSelector((state) => state.session.user);
    const { id } = useParams();
    const tweet = useSelector((store) => store.tweets[id]);
    const dispatch = useDispatch();
    const history = useHistory();
    const [body, setBody] = useState(tweet?.body);
    const [img, setImg] = useState(tweet?.image);
    useEffect(() => {
        dispatch(getTweetId(id));
    }, [dispatch]);
    let pImg;
    if (!user?.profile_pic)
        pImg =
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    else pImg = user.profile_pic;
    if (!tweet) {
        history.push("/tweets");
    }
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
        let newTweet = dispatch(editTweet(data));
        if (newTweet) {
            setOpen(false);
            // history.push(`/tweets`);
            setBody("");
            // dispatch(getTweetId(id));
        }
    };
    return (
        <>
            <div className="edit-tweet-container">
                {/* <img className="edit-prof-img" src={pImg} alt="prof"></img> */}

                <form
                    method="POST"
                    className="edit-tweet-form"
                    onSubmit={handleSubmit}
                >
                    <h2 className="edit-label">Edit Tweet</h2>
                    <label>Tweet</label>
                    <input
                        type="text"
                        value={body}
                        name="tweet"
                        required
                        className="tweet-text"
                        onChange={(e) => setBody(e.target.value)}
                    ></input>
                    <label>Image Url</label>
                    <input
                        className="tweet-text"
                        type="text"
                        value={img}
                        placeholder="optional"
                        onChange={(e) => setImg(e.target.value)}
                    ></input>
                    <div>
                        <button className="editTweet-btn" type="submit">
                            Post
                        </button>
                        <button
                            className="editTweet-btn"
                            onClick={() => {
                                dispatch(removeTweet(id));
                                // history.push("/tweets");
                                history.push("/tweets");
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

export default EditTweet;
