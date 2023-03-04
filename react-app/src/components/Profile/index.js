import React, { useState, useEffect } from "react";
import { getTweets } from "../../store/tweets";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, getUsers } from "../../store/user";
import { createFollow, removeFollow } from "../../store/follow";
import UserTweets from "./userTweets";
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
    // console.log(myTweets);
    useEffect(() => {
        dispatch(getTweets());
        // dispatch(getUsers());
        dispatch(getUserById(id));
    }, [dispatch]);

    let userPic
    if (!user?.profile_pic) userPic='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    else userPic = user?.profile_pic

    let res = []
    let isFollowing = user?.follower.forEach(el => {
        res.push(el.id)
    })

    console.log(res.includes(sessionUser.id))

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
                        src={user?.background}
                        className="user-background"
                    ></img>
                </div>
                <div className="user-things-container">
                    <div className="profile-pic">
                        <img
                            src={userPic}
                            className="user-profile-pic"
                        ></img>
                    </div>
                    <div className="profile-user-things">
                        <h3>{user?.firstName}</h3>
                        <h4 id="user-text"> @{user?.username}</h4>
                    </div>
                    <div className="user-bio">
                        <p>{user?.bio}</p>
                        {sessionUser.id != user?.id && !res.includes(sessionUser.id) ? (
                            <>
                                <div className="follow-btn">
                                    <button
                                        onClick={() =>
                                            dispatch(createFollow(sessionUser.id, user?.id))
                                        }
                                    >
                                        Follow
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="unfollowBtn">
                                    <button onClick={()=> dispatch(removeFollow(sessionUser.id, user?.id))}>Unfollow</button>
                                </div>
                            </>
                        )}

                        <h4 id="user-text">
                            {user?.follower.length} Followers {"|"} Following
                        </h4>
                    </div>
                </div>
            </div>
            <UserTweets userId={id} />
        </>
    );
};

export default UserProfile;
