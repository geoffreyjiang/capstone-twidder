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

    const [className, setClassName] = useState({ color: "" });

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
    // console.log(myLikes);
    useEffect(() => {
        const handleLike = () => {
            if (total === 0) {
                setClassName({ ...className, color: "fa-regular fa-heart" });
            }
            likedBy?.forEach((el) => {
                if (el.user_id === user?.id && total !== 0) {
                    setClassName({
                        ...className,
                        color: "fa-solid fa-heart red-like",
                    });
                } else {
                    setClassName({
                        ...className,
                        color: "fa-regular fa-heart",
                    });
                }
            });
        };
        if (likedBy) {
            handleLike();
        }
    }, [dispatch, likedBy, setClassName, total, tweet]);
    console.log(Object.values(className).toString());
    return (
        <div className="likes">
            <i
                className={Object.values(className).toString()}
                onClick={handleSubmit}
            ></i>
            {total}
        </div>
    );
};

export default CreateLike;
