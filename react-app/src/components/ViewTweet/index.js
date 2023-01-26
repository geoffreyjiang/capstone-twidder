import React, { useState, useEffect } from "react";
import {
    getTweets,
    getTweetId,
    editTweet,
    removeTweet,
} from "../../store/tweets";

import AllReplies from "../Reply";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";

const ViewTweet = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const tweet = useSelector((store) => store.tweets);
    const history = useHistory();
    useEffect(() => {
        dispatch(getTweetId(id));
    }, [dispatch, id]);

    const deleteTweet = (id) => {
        dispatch(removeTweet(id));
        dispatch(getTweets());
        history.push("/");
    };

    return (
        <>
            <div className="tweet-id-section">
                <h2>{tweet.body}</h2>
                <button onClick={() => deleteTweet(id)}>Delete</button>
                <button onClick={() => history.push(`/tweets/${id}/edit`)}>
                    Edit
                </button>
                <div className="replyArea">
                    <AllReplies />
                </div>
            </div>
        </>
    );
};

export default ViewTweet;
