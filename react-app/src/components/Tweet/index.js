import React, { useState, useEffect } from "react";
import {
    getTweets,
    getTweetId,
    editTweet,
    removeTweet,
} from "../../store/tweets";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./index.css";
import CreateTweet from "./createTweet";

const Tweets = () => {
    const dispatch = useDispatch();
    const tweets = useSelector((store) => {
        return Object.values(store.tweets);
    });

    useEffect(() => {
        dispatch(getTweets());
    }, [dispatch]);

    return (
        <>
            <CreateTweet />
            <div className="tweet-section">
                {tweets?.map((el) => {
                    return (
                        <div className="tweet-container">
                            <NavLink to={`/tweets/${el.id}`}> </NavLink>
                            <h3>
                                {el.body} by: {el.username}
                            </h3>
                            <NavLink to={`/tweets/${el.id}`}> </NavLink>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Tweets;
