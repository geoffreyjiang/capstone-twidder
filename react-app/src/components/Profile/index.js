import React, { useState, useEffect } from "react";
import { getTweets } from "../../store/tweets";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, getUsers } from "../../store/user";

import "./index.css";
const UserProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const user = useSelector((state) => state.users[id]);

    const tweets = useSelector((store) => {
        return Object.values(store.tweets);
    });
    const myTweets = tweets?.filter((el) => el.user_id === user?.id);
    // console.log(tweets);
    console.log(user);
    // console.log(myTweets);
    console.log(id);
    useEffect(() => {
        dispatch(getTweets());
        // dispatch(getUsers());
        dispatch(getUserById(id));
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
                    <h3>{user?.firstName}</h3>
                    <p id="user-text">{myTweets?.length} Tweets</p>
                </div>
            </div>
            <div className="tweet-user-section">
                <div className="user-background-container">
                    <img
                        src="https://cdn.pixabay.com/photo/2022/06/27/18/56/grass-7288141__340.jpg"
                        className="user-background"
                    ></img>
                </div>
                <div className="user-tings-container">
                    <div className="profile-pic">
                        <img
                            src={user?.profile_pic}
                            className="user-profile-pic"
                        ></img>
                    </div>
                    <div className="user-tings">
                        <h3>{user?.firstName}</h3>
                        <h4 id="user-text"> @{user?.username}</h4>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
