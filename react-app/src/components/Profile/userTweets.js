import React, { useState, useEffect } from "react";
import { getTweets } from "../../store/tweets";
import { useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../store/user";
import CreateLike from "../Likes/createLike";
import CreateAllReplyModal from "../Modals/ReplyModal/AllTweetReplyModal";
import "./userTweets.css";
const UserTweets = ({ userId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.users[userId]);

    const tweets = useSelector((store) => {
        return Object.values(store.tweets);
    });
    const myTweets = tweets?.filter((el) => el.user_id === user?.id);

    useEffect(() => {
        dispatch(getTweets());
        dispatch(getUserById(userId));
    }, [dispatch]);
    let userImg;

    if (!user?.profile_pic) {
        userImg =
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    } else userImg = user?.profile_pic;
    return (
        <>
            {myTweets.map((el) => {
                return (
                    <div className="profile-tweet-user-section">
                        <div className="tweet-profile-user-container">
                            <div className="user-background-container">
                                <div className="userTweets-container">
                                    <div className="user-things">
                                        <div className="tweet-user-img-container">
                                            <img
                                                src={userImg}
                                                className="tweet-profileUser-img"
                                                alt="no img"
                                            ></img>
                                            <div
                                                className="username-container"
                                                id="user-text"
                                            >
                                                <NavLink
                                                    id="user-text"
                                                    to={`/user/${user?.id}`}
                                                >
                                                    {user?.firstName} @
                                                    {user?.username} ·{" "}
                                                    {user?.created_at}
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="profile-tweet-text"
                            onClick={() => history.push(`/tweets/${el?.id}`)}
                        >
                            <p>{el?.body}</p>
                            <img
                                src={el?.image}
                                className="profile-tweet-img"
                            ></img>
                            {/* <h4>Likes:{el?.totalLikes}</h4> */}
                        </div>

                        <div className="tweet-profile-container-extras">
                            <CreateAllReplyModal tweetId={el?.id} />
                            <CreateLike tweetId={el?.id} likedBy={el?.likes} />
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default UserTweets;
