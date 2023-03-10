import React, { useState, useEffect } from "react";
import { getTweets } from "../../store/tweets";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../store/user";
import {
    createFollow,
    removeFollow,
    followingTweet,
    deleteFollowingTweet,
} from "../../store/follow";
import UserTweets from "./userTweets";
import "./index.css";
const UserProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const user = useSelector((state) => state.users[id]);
    const [btn, setBtn] = useState();

    const tweets = useSelector((store) => {
        return Object.values(store.tweets);
    });
    const myTweets = tweets?.filter((el) => el.user_id === user?.id);
    // console.log(tweets);
    // console.log(myTweets);
    useEffect(() => {
        dispatch(getUserById(id));
        dispatch(getTweets());
        // dispatch(getUsers());
    }, [dispatch, id]);

    let userImg;

    if (!user?.profile_pic) {
        userImg =
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    } else userImg = user?.profile_pic;
    let backgroundPic;
    if (user?.background) backgroundPic = user?.background;
    else
        backgroundPic =
            "https://cdn.pixabay.com/photo/2018/04/14/18/06/twitter-3319619__340.jpg";

    useEffect(() => {
        if (user) {
            const isFollowing = user?.follower.find(
                (el) => el.id === sessionUser?.id
            );
            if (sessionUser?.id === user?.id) {
                document.getElementById("follow-btn").style.display = "none";
            }
            if (isFollowing) {
                setBtn(true);
            } else {
                setBtn(false);
            }
        }
    }, [dispatch, user?.follower, sessionUser?.id]);

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
                    <img src={backgroundPic} className="user-background"></img>
                </div>
                <div className="user-things-container">
                    <div className="profile-pic">
                        <img src={userImg} className="user-profile-pic"></img>
                    </div>

                    {!btn && (
                        <>
                            <div className="followbtn-container">
                                <button
                                    className="follow-btn"
                                    id="follow-btn"
                                    onClick={async () => {
                                        await dispatch(
                                            createFollow(
                                                sessionUser?.id,
                                                user?.id
                                            )
                                        );

                                        await dispatch(getUserById(id));
                                        await dispatch(followingTweet(id));
                                        await dispatch(getTweets());
                                    }}
                                >
                                    Follow
                                </button>
                            </div>
                        </>
                    )}

                    {btn && (
                        <div className="followbtn-container">
                            <button
                                className="follow-btn"
                                id="follow-btn"
                                onClick={async () => {
                                    await dispatch(
                                        removeFollow(sessionUser?.id, user?.id)
                                    );
                                    await dispatch(
                                        deleteFollowingTweet(user?.id)
                                    );

                                    await dispatch(getUserById(id));

                                    await dispatch(getTweets());
                                }}
                            >
                                Unfollow
                            </button>
                        </div>
                    )}
                    <div className="profile-user-things">
                        <h3>{user?.firstName}</h3>
                        <h4 id="user-text"> @{user?.username}</h4>
                    </div>
                    <div className="user-bio">
                        <p>{user?.bio}</p>

                        <div className="follower-container">
                            <h4>
                                {user?.following.length >= 0 && (
                                    <div className="follow-div">
                                        {user?.following.length} {""}
                                        Following
                                    </div>
                                )}
                            </h4>
                            <h4>
                                {user?.follower.length >= 0 && (
                                    <div className="follow-div">
                                        {user?.follower.length} Followers
                                    </div>
                                )}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rborder"></div>
            <UserTweets userId={id} />
        </>
    );
};

export default UserProfile;
