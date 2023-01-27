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
import { getLikes, editLikes } from "../../store/likes";

const Tweets = () => {
    const dispatch = useDispatch();
    const tweets = useSelector((store) => {
        return Object.values(store.tweets);
    });
    const likes = useSelector((store) => Object.values(store.likes));
    // let count = 0;
    // likes.forEach((el) => {
    //     if (el.isLiked === true) count++;
    // });
    useEffect(() => {
        dispatch(getTweets());
    }, [dispatch]);

    return (
        <>
            <CreateTweet />
            <div className="tweet-section">
                {tweets?.map((el) => {
                    // const likes = dispatch(getLikes(el.id));
                    // console.log(likes);
                    return (
                        <div className="tweet-container">
                            <NavLink to={`/tweets/${el.id}`}> </NavLink>
                            <h3>
                                {el.body} by: {el.username}
                            </h3>
                            <h3>Likes: {el.likes}</h3>
                            <NavLink to={`/tweets/${el.id}`}> </NavLink>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Tweets;
