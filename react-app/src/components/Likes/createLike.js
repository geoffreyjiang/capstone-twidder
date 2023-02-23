import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReply } from "../../store/reply";
import { createLike } from "../../store/likes";
import { getTweets } from "../../store/tweets";
const CreateLike = ({ tweetId, total }) => {
    const user = useSelector((state) => state.session.user);
    // console.log(user);
    const { id } = useParams();
    // const isLiked = useSelector((state) => console.log());

    const dispatch = useDispatch();
    const history = useHistory();
    const [like, setLike] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            user_id: user.id,
            tweet_id: tweetId,
        };
        dispatch(createLike(tweetId));
        dispatch(getTweets());
    };
    return (
        <>
            <div className="create-like-container">
                <form className="like-form" onSubmit={handleSubmit}>
                    <div>
                        <button className="submitBtn" type="submit">
                            <i class="fa-regular fa-heart"></i>
                        </button>
                        <h4>{total}</h4>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateLike;
