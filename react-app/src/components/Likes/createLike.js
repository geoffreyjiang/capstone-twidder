import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReply } from "../../store/reply";
import { createLike, getLikes } from "../../store/likes";
import { getTweets } from "../../store/tweets";
import "./index.css";
const CreateLike = ({ tweetId, total, likedBy, tweet }) => {
    const user = useSelector((state) => state.session.user);
    const likes = Object.values(useSelector((state) => state.likes));

    // console.log(user);
    const [like, setLike] = useState();
    const [className, setClassName] = useState();

    const { id } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            user_id: user.id,
            tweet_id: tweetId,
        };

        dispatch(createLike(tweetId));
        dispatch(getTweets());
    };
    useEffect(() => {
        dispatch(getLikes(tweetId));
    }, [dispatch, tweetId]);
    const myLikes = likes.filter((el) => el.user_id === user.id);
    useEffect(() => {
        if (total === 0) {
            setLike(false);
            setClassName(["fa-regular fa-heart"]);
        }
        likedBy.map((el) => {
            if (el.user_id === user.id && total !== 0) {
                setLike(true);
                setClassName(["fa-solid fa-heart red-like"]);
            } else {
                setLike(false);
                setClassName(["fa-regular fa-heart"]);
            }
        });
    }, [dispatch, total, like, className]);

    return (
        <div className="likes">
            <i className={className} onClick={handleSubmit}></i>
            {total}
        </div>
    );
};

export default CreateLike;
