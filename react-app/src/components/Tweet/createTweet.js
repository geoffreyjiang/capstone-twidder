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
        // if (body.length > 180) {
        //     setBody("");
        //     alert("tweet must be less than 180 characters");
        // }
        console.log(image);
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
            {!user?.profile_pic ? (
                <div className="user-things">
                    <img
                        src={
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        }
                        className="tweet-user-img"
                        alt="img"
                    ></img>
                </div>
            ) : (
                <div className="user-things">
                    <img
                        src={user?.profile_pic}
                        className="tweet-user-img"
                        alt="img"
                    ></img>
                </div>
            )}
            <div className="create-tweet-container">
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
                        <button className="submitBtn" type="submit">
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateTweet;
