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
    // console.log(user);
    return (
        <>
            <div className="tweet-container">
                {!user?.profile_pic ? (
                    <div className="user-things">
                        <div className="tweet-user-img-container">
                            <img
                                src={
                                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                }
                                className="tweet-user-img"
                                alt="img"
                            ></img>
                            <form
                                className="tweet-form"
                                onSubmit={handleSubmit}
                            >
                                <div className="input-tweet">
                                    <input
                                        type="text"
                                        value={body}
                                        name="text"
                                        id="tweet-text"
                                        placeholder="What's happening?"
                                        required
                                        onChange={(e) =>
                                            setBody(e.target.value)
                                        }
                                    ></input>
                                    <input
                                        type="input"
                                        value={image}
                                        name="image"
                                        placeholder="img"
                                        onChange={(e) =>
                                            setImage(e.target.value)
                                        }
                                    ></input>
                                </div>

                                <div className="input-tweet"></div>
                                <div>
                                    <button
                                        className="postTweet-btn"
                                        type="submit"
                                    >
                                        Post
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="tweet-container">
                        <div className="user-things">
                            <div className="tweetId-userImg-container">
                                <img
                                    src={user?.profile_pic}
                                    className="tweet-user-img"
                                    alt="img"
                                ></img>
                                <form
                                    className="tweet-form"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="input-tweet">
                                        <input
                                            type="text"
                                            value={body}
                                            name="text"
                                            id="tweet-text"
                                            placeholder="What's happening?"
                                            required
                                            onChange={(e) =>
                                                setBody(e.target.value)
                                            }
                                        ></input>
                                    </div>

                                    <div className="input-tweet">
                                        <input
                                            type="input"
                                            value={image}
                                            name="image"
                                            placeholder="img"
                                            onChange={(e) =>
                                                setImage(e.target.value)
                                            }
                                        ></input>
                                    </div>
                                    <div>
                                        <button
                                            className="postTweet-btn"
                                            type="submit"
                                        >
                                            Post
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CreateTweet;
