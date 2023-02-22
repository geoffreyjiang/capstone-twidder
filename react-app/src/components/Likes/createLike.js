import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReply } from "../../store/reply";
import { createLike } from "../../store/likes";
const CreateLike = ({ tweetId }) => {
    const user = useSelector((state) => state.session.user);
    // console.log(user);
    const { id } = useParams();
    // const isLiked = useSelector((state) => console.log());

    const dispatch = useDispatch();
    const history = useHistory();
    const [like, setLike] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Please login!");
        }

        const data = {
            user_id: user.id,
            tweet_id: tweetId,
        };
        dispatch(createLike(tweetId));
    };
    return (
        <>
            <div className="create-like-container">
                <form className="like-form" onSubmit={handleSubmit}>
                    <div className="input-like">
                        <input type="checkbox" value={like}></input>
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

export default CreateLike;
