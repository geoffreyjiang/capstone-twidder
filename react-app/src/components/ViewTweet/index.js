import React, { useState, useEffect } from "react";
import {
    getTweets,
    getTweetId,
    editTweet,
    removeTweet,
} from "../../store/tweets";
import { getLikes, editLikes } from "../../store/likes";
import EditTweetModal from "../Modals/EditTweetModal/EditTweetModal";
import AllReplies from "../Reply";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import "./index.css";
const ViewTweet = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const tweet = useSelector((store) => store.tweets[id]);
    const likes = useSelector((store) => Object.values(store.likes));
    const user = useSelector((state) => state.session.user);
    // const [like, setLike] = useState(likes.isLiked);
    const [editBody, setEditBody] = useState(tweet?.body);
    const history = useHistory();

    useEffect(() => {
        dispatch(getTweetId(id));

        // dispatch(getLikes(id));
    }, [dispatch]);

    const deleteTweet = () => {
        dispatch(removeTweet(tweet.id));
        dispatch(getTweets());
        history.push("/");
    };
    // console.log(tweet.user_id);
    // console.log(user.id);

    return (
        <>
            <div className="tweet-id-section">
                <div className="tweet-id-container">
                    {tweet?.profile_pic ? (
                        <div className="user-things">
                            <div className="tweetId-userImg-container">
                                {/* <div className="profile_pic"> */}

                                <img
                                    src={tweet.profile_pic}
                                    className="tweet-user-img"
                                    alt="no img"
                                ></img>
                                <div className="username-container">
                                    {/* </div> */}
                                    <NavLink
                                        id="user-text"
                                        to={`/tweets/${tweet.id}`}
                                    >
                                        {tweet?.firstName} @{tweet?.username}
                                    </NavLink>
                                    <div
                                        className="vtweet-created"
                                        id="user-text"
                                    >
                                        {tweet?.created_at}
                                    </div>
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
                                    {/* </div> */}
                                    <NavLink
                                        id="user-text"
                                        to={`/tweets/${tweet?.id}`}
                                    >
                                        {tweet?.firstName} @{tweet?.username}
                                    </NavLink>
                                    <div
                                        className="vtweet-created"
                                        id="user-text"
                                    >
                                        {tweet?.created_at}
                                    </div>
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
                        <div className="tweet-text">
                            <h3>{tweet?.body}</h3>
                            <img src={tweet?.image} className="tweet-img"></img>
                            <h4>Likes:{tweet?.totalLikes}</h4>
                        </div>
                    ) : (
                        <div className="tweet-text">
                            <h3>{tweet?.body}</h3>
                            <h4>Likes:{tweet?.totalLikes}</h4>
                        </div>
                    )}
                </div>

                {/* <div className="replyArea">
                    <AllReplies />
                </div> */}
                <AllReplies />
            </div>
        </>
    );
};

export default ViewTweet;
