import React, { useState, useEffect } from "react";
import { getTweets } from "../../store/tweets";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
const UserProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const tweets = useSelector((store) => {
        return Object.values(store.tweets);
    });
    const myTweets = tweets.filter((el) => el.user_id === user.id);
    console.log(tweets);
    // console.log(user);
    console.log(myTweets);

    useEffect(() => {
        dispatch(getTweets());
    }, [dispatch]);

    return (
        <>
            <div className="sessionUser-header">
                <div className="back-arrow">
                    <i
                        className="fa-solid fa-arrow-left fa-2x"
                        onClick={() => history.push("/tweets")}
                    ></i>
                </div>
                <div className="user-header">
                    <h3>{user.firstName}</h3>
                    <p id="user-text">{myTweets.length} Tweets</p>
                </div>
            </div>
            <div className="tweet-user-section">
                <img
                    src="https://cdn.pixabay.com/photo/2022/06/27/18/56/grass-7288141__340.jpg"
                    className="user-background"
                ></img>
            </div>
        </>
    );
};

export default UserProfile;
