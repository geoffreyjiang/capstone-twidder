import React, { useState, useEffect } from "react";
import { getTweets } from "../../store/tweets";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, Redirect } from "react-router-dom";
import "./index.css";
import CreateTweet from "./createTweet";
import TopNav from "../Nav/topNav";
import CreateLike from "../Likes/createLike";
import CreateAllReplyModal from "../Modals/ReplyModal/AllTweetReplyModal";
import { followingTweet } from "../../store/follow";
const Tweets = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const tweets = useSelector((store) => {
        return Object.values(store.tweets);
    });

    useEffect(() => {
        dispatch(getTweets());
    }, [dispatch, user?.following]);

    if (!user) {
        return <Redirect to="/" />;
    }
    return (
        <>
            <div className="tweet-section">
                <div className="home-header">
                    <h2>Explore</h2>
                </div>
                <CreateTweet />
                {tweets
                    ?.slice()
                    .reverse()
                    .map((el, i) => {
                        console.log(el);
                        return (
                            <div
                                className="tweet-container"
                                key={i}
                                // onClick={() => history.push(`/tweets/${el.id}`)}
                            >
                                {el?.profile_pic ? (
                                    <>
                                        <div className="user-things">
                                            <div className="tweet-user-img-container">
                                                <img
                                                    src={el.profile_pic}
                                                    className="tweet-user-img"
                                                    alt="no img"
                                                ></img>
                                                <div
                                                    className="username-container"
                                                    id="user-text"
                                                >
                                                    <NavLink
                                                        id="user-text"
                                                        to={`/user/${el.user_id}`}
                                                    >
                                                        {el.firstName} @
                                                        {el?.username} ·{" "}
                                                        {el.created_at}
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="user-things">
                                        <div className="tweet-user-img-container">
                                            <img
                                                src={
                                                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                                }
                                                className="tweet-user-img"
                                                alt="no img"
                                            ></img>
                                            <div className="username-container">
                                                <NavLink
                                                    to={`/tweets/${el?.id}`}
                                                    id="user-text"
                                                >
                                                    {el.firstName} @
                                                    {el?.username}
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {el?.image ? (
                                    <>
                                        <div
                                            className="tweet-text"
                                            onClick={() =>
                                                history.push(
                                                    `/tweets/${el?.id}`
                                                )
                                            }
                                        >
                                            <p>{el?.body}</p>
                                            <img
                                                src={el?.image}
                                                className="tweet-img"
                                            ></img>
                                            {/* <h4>Likes:{el?.totalLikes}</h4> */}
                                        </div>
                                        <div className="tweet-container-extras">
                                            <CreateAllReplyModal
                                                tweetId={el.id}
                                            />
                                            <CreateLike
                                                tweetId={el.id}
                                                likedBy={el.likes}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            className="tweet-text"
                                            onClick={() =>
                                                history.push(
                                                    `/tweets/${el?.id}`
                                                )
                                            }
                                        >
                                            <p>{el?.body}</p>
                                        </div>

                                        <div className="tweet-container-extras">
                                            <CreateAllReplyModal
                                                tweetId={el.id}
                                            />
                                            <CreateLike
                                                tweetId={el.id}
                                                likedBy={el.likes}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default Tweets;
