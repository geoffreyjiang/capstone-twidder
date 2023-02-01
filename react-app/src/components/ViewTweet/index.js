import React, { useState, useEffect } from "react";
import {
    getTweets,
    getTweetId,
    editTweet,
    removeTweet,
} from "../../store/tweets";
import { getLikes, editLikes } from "../../store/likes";

import AllReplies from "../Reply";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import "./index.css";
const ViewTweet = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const tweet = useSelector((store) => store.tweets);
    const likes = useSelector((store) => Object.values(store.likes));
    const user = useSelector((state) => state.session.user);

    // const [like, setLike] = useState(likes.isLiked);

    const history = useHistory();
    let count = 0;
    console.log(id);

    useEffect(() => {
        dispatch(getTweetId(id));
        // dispatch(getLikes(id));
    }, [dispatch]);

    const deleteTweet = () => {
        dispatch(removeTweet(tweet.id));
        dispatch(getTweets());
        history.push("/");
    };
    // console.log(tweet.user_id);
    // console.log(user.id);

    return (
        <>
            <div className="tweet-id-section">
                <h2>{tweet?.body}</h2>
                {user?.id == tweet?.user_id ? (
                    <>
                        <button onClick={() => deleteTweet(tweet.id)}>
                            Delete
                        </button>
                        <button
                            onClick={() => history.push(`/tweets/${id}/edit`)}
                        >
                            Edit
                        </button>
                    </>
                ) : null}
                <div className="replyArea">
                    <AllReplies />
                </div>
            </div>
        </>
    );
};

export default ViewTweet;
