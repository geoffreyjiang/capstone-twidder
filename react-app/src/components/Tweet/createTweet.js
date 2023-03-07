import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createTweet, getTweets } from "../../store/tweets";
import "./create.css";
const CreateTweet = () => {
    const user = useSelector((state) => state.session.user);
    // console.log(user);
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
        let newTweet = dispatch(createTweet(data));
        if (newTweet) {
            history.push(`/`);
            // dispatch(getTweets());
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
            <div className="create-tweet-container">
                <div className="create-tweet-user-img-container">
                    <img
                        src={profPic}
                        className="tweet-sessionUser-img"
                        alt="img"
                    ></img>
                </div>
                <form className="tweet-form" onSubmit={handleSubmit}>
                    <div className="input-tweet">
                        <input
                            type="text"
                            value={body}
                            name="text"
                            id="tweet-text"
                            placeholder="What's happening?"
                            required
                            onChange={(e) => setBody(e.target.value)}
                        ></input>
                    </div>

                    <div className="input-tweet">
                        <input
                            type="input"
                            value={image}
                            name="image"
                            placeholder="img"
                            onChange={(e) => setImage(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <button className="postTweet-btn" type="submit">
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateTweet;
