import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReply } from "../../store/reply";
import { createLike, getLikes, removeLike } from "../../store/likes";
import { getTweets } from "../../store/tweets";
import "./index.css";
const CreateLike = ({ tweetId, total, likedBy, tweet }) => {
    const user = useSelector((state) => state.session.user);
    const likes = useSelector((state) => {
        return Object.values(state.likes);
    });
    const [liked, setLiked] = useState();
    const [totalLikes, setTotalLikes] = useState(total);
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            user_id: user.id,
            tweet_id: tweetId,
        };
        setLiked(true);
        setTotalLikes(totalLikes + 1);

        dispatch(createLike(tweetId));
        // dispatch(getTweets());
    };
    console.log(totalLikes);
    useEffect(() => {
        if (likes) {
            const isLiked = likedBy.find((like) => like.user_id === user?.id);
            if (isLiked) {
                setLiked(true);
            } else {
                setLiked(false);
            }
        }
    }, [dispatch, likedBy, user.id]);
    // console.log(liked);

    const handleDelete = () => {
        const isLiked = likedBy.find((like) => like.user_id === user?.id);
        setLiked(false);
        setTotalLikes(totalLikes - 1);
        if (isLiked) {
            dispatch(removeLike(isLiked.id));
        }
    };

    useEffect(() => {
        dispatch(getLikes(tweetId));
    }, [dispatch, tweetId]);

    return (
        <>
            {liked && (
                <>
                    <div className="likes">
                        <i
                            onClick={handleDelete}
                            className="fa-solid fa-heart red-like"
                        ></i>
                        {totalLikes}
                    </div>
                </>
            )}

            {!liked && (
                <>
                    <div className="likes">
                        <i
                            onClick={handleSubmit}
                            className="fa-regular fa-heart"
                        ></i>
                        {totalLikes}
                    </div>
                </>
            )}
        </>
    );
};

export default CreateLike;
