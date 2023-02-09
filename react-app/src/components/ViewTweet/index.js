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
    const tweet = useSelector((store) => store.tweets);
    const likes = useSelector((store) => Object.values(store.likes));
    const user = useSelector((state) => state.session.user);
    // const [like, setLike] = useState(likes.isLiked);

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
            <div className="tweet-section">
                <div className="tweet-container">
                    {tweet?.profile_pic ? (
                        <div className="user-things">
                            <div className="profile_pic">
                                <img
                                    src={tweet.profile_pic}
                                    className="tweet-user-img"
                                    alt="no img"
                                ></img>
                            </div>
                            <div className="username-container">
                                <NavLink to={`/tweets/${tweet.id}`}>
                                    {tweet.firstName} @{tweet?.username}
                                </NavLink>
                            </div>
                        </div>
                    ) : (
                        <div className="user-things">
                            <img
                                src={
                                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                }
                                className="tweet-user-img"
                                alt="no img"
                            ></img>
                            <NavLink to={`/tweets/${tweet?.id}`}>
                                {tweet.firstName} @{tweet?.username}
                            </NavLink>
                        </div>
                    )}
                    <h3>{tweet?.body}</h3>

                    {user && user?.id == tweet?.user_id ? (
                        <>
                            <EditTweetModal />
                        </>
                    ) : null}
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
