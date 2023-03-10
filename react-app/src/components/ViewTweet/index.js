import React, { useState, useEffect } from "react";
import { getTweets, getTweetId, removeTweet } from "../../store/tweets";
import EditTweetModal from "../Modals/EditTweetModal/EditTweetModal";
import AllReplies from "../Reply";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import CreateLike from "../Likes/createLike";
import "./index.css";
const ViewTweet = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const tweet = useSelector((store) => store.tweets[id]);
    const user = useSelector((state) => state.session.user);
    const history = useHistory();

    useEffect(() => {
        dispatch(getTweetId(id));

        // dispatch(getLikes(id));
    }, [dispatch]);

    // console.log(tweet.user_id);
    // console.log(tweet);
    // console.log(user.id);

    return (
        <>
            <div className="tweetid-header">
                <div className="back-arrow">
                    <i
                        className="fa-solid fa-arrow-left fa-2x"
                        onClick={() => history.push("/tweets")}
                    ></i>
                </div>
                <h2>Explore</h2>
            </div>
            <div className="tweet-id-section">
                <div className="tweet-id-container">
                    {tweet?.profile_pic ? (
                        <div className="user-things">
                            <div className="tweetId-userImg-container">
                                <img
                                    src={tweet.profile_pic}
                                    className="tweet-user-img"
                                    alt="no img"
                                ></img>
                                <div className="username-container">
                                    <NavLink
                                        id="user-text"
                                        to={`/tweets/${tweet.id}`}
                                    >
                                        {tweet?.firstName} @{tweet?.username}·{" "}
                                        {tweet?.created_at}
                                    </NavLink>
                                </div>

                                <div className="user-modal">
                                    {user?.id === tweet?.user_id ? (
                                        <>
                                            <EditTweetModal />
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="user-things">
                            <div className="tweetId-userImg-container">
                                <img
                                    src={
                                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                    }
                                    className="tweet-user-img"
                                    alt="no img"
                                ></img>
                                <div className="username-container">
                                    <NavLink
                                        id="user-text"
                                        to={`/tweets/${tweet.id}`}
                                    >
                                        {tweet?.firstName} @{tweet?.username}·{" "}
                                        {tweet?.created_at}
                                    </NavLink>
                                </div>

                                <div className="user-modal">
                                    {user?.id === tweet?.user_id ? (
                                        <>
                                            <EditTweetModal />
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    )}
                    {tweet?.image ? (
                        <>
                            <div className="tweetId-text">
                                <h2>{tweet?.body}</h2>
                                <div className="all-tweet-img-container">
                                    <img
                                        src={tweet?.image}
                                        className="tweet-img"
                                    ></img>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="tweetId-just-text">
                                <h2>{tweet?.body}</h2>
                            </div>
                        </>
                    )}
                    <div className="tweetId-container-extras">
                        <CreateLike
                            tweetId={tweet?.id}
                            total={tweet?.totalLikes}
                            likedBy={tweet?.likes}
                        />
                    </div>
                </div>
                <AllReplies />
            </div>
        </>
    );
};

export default ViewTweet;
