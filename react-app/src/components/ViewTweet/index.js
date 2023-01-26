import React, { useState, useEffect } from "react";
import {
    getTweets,
    getTweetId,
    editTweet,
    removeTweet,
} from "../../store/tweets";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";

const ViewTweet = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const tweet = useSelector((store) => store.tweets);
    const history = useHistory();

    console.log(tweet);

    useEffect(() => {
        dispatch(getTweetId(id));
    }, [dispatch]);

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
            </div>
        </>
    );
};

export default ViewTweet;
