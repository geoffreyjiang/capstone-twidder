import React, { useState, useEffect } from "react";
import { getTweets } from "../../store/tweets";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";

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
            <div className="tweet-section">
                {tweets?.map((el) => {
                    return (
                        <div className="tweet-container">
                            <h3>
                                {el.body} by: {el.username}
                            </h3>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Tweets;
