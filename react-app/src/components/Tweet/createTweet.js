import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createTweet, getTweets } from "../../store/tweets";

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

    return (
        <>
            <div className="create-tweet-container">
                <form className="tweet-form" onSubmit={handleSubmit}>
                    <div className="input-tweet">
                        <textarea
                            type="text"
                            value={body}
                            name="text"
                            placeholder="Whats on your mind?"
                            required
                            onChange={(e) => setBody(e.target.value)}
                        ></textarea>
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
