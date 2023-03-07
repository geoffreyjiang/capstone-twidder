import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createLike, getLikes, removeLike } from "../../store/likes";
import { getTweets } from "../../store/tweets";
import { followingTweet } from "../../store/follow";
import "./index.css";
const CreateLike = ({ tweetId, likedBy }) => {
    const user = useSelector((state) => state.session.user);
    const likes = useSelector((state) => {
        return Object.values(state.likes);
    });
    const [liked, setLiked] = useState();
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isLiked = likedBy?.find((like) => like.user_id === user?.id);
        if (isLiked) {
            await handleDelete();
        }
        const data = {
            user_id: user.id,
            tweet_id: tweetId,
        };
        if (data) {
            setLiked(true);

            await dispatch(createLike(tweetId));
            await dispatch(getTweets());
            await dispatch(followingTweet(user?.id));
        }
    };
    // console.log(likedBy);
    // console.log(likes);
    useEffect(() => {
        if (likes) {
            const isLiked = likedBy?.find((like) => like.user_id === user?.id);
            if (isLiked) {
                setLiked(true);
            } else {
                setLiked(false);
            }
        }
    }, [dispatch, likedBy, user?.id]);
    // console.log(likedBy);

    const handleDelete = async () => {
        const isLiked = likedBy?.find(
            (like) => like.user_id === user?.id && like.tweet_id === tweetId
        );
        // console.log(isLiked);
        if (isLiked) {
            setLiked(false);
            await dispatch(removeLike(isLiked.id));
            await dispatch(getTweets());
            await dispatch(followingTweet(user?.id));
        }
    };

    useEffect(() => {
        dispatch(getLikes(tweetId));
    }, [dispatch, tweetId]);

    return (
        <>
            {liked && (
                <>
                    <i
                        onClick={handleDelete}
                        id="heart"
                        className="fa-solid fa-heart red-like heartIcon"
                    ></i>
                    {likedBy?.length >= 0 && (
                        <div id="totalLikes">{likedBy?.length}</div>
                    )}
                </>
            )}

            {!liked && (
                <>
                    <i
                        onClick={handleSubmit}
                        id="heart"
                        className="fa-regular fa-heart heartIcon"
                    >
                        {likedBy?.length > 0 && (
                            <div id="totalLikes">{likedBy?.length}</div>
                        )}
                    </i>
                </>
            )}
        </>
    );
};

export default CreateLike;
