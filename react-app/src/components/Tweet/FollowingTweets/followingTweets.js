import React, { useState, useEffect } from "react";
import { getTweets } from "../../../store/tweets";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, Redirect, useParams } from "react-router-dom";
import { followingTweet } from "../../../store/follow";
import CreateTweet from "../createTweet";
import CreateLike from "../../Likes/createLike";
import CreateAllReplyModal from "../../Modals/ReplyModal/AllTweetReplyModal";
import { getLikes } from "../../../store/likes";
import "./index.css";
const FollowingTweets = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const user = useSelector((state) => state.session.user);
    const tweets = useSelector((store) => {
        return Object.values(store.tweets);
    });
    const following = useSelector((store) => {
        return Object.values(store.follow);
    });

    let sortedFollowing = following.sort((a, b) => {
        const dateA = new Date(`${a.sort_date}`);
        const dateB = new Date(`${b.sort_date}`);
        return dateB - dateA;
    });
    useEffect(() => {
        // dispatch(getLikes())
        dispatch(getTweets());
        dispatch(followingTweet(id));
    }, [dispatch]);

    return (
        <>
            <div className="tweet-section">
                <div className="home-header">
                    <h2>Home</h2>
                </div>
                <CreateTweet />
                {sortedFollowing &&
                    sortedFollowing.map((el, i) => {
                        console.log(el);

                        let profPic;
                        if (el.profile_pic) profPic = el.profile_pic;
                        else
                            profPic =
                                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

                        return (
                            <div className="tweet-container" key={i}>
                                <>
                                    <div className="user-things">
                                        <div className="tweet-user-img-container">
                                            <img
                                                src={profPic}
                                                className="tweet-user-img"
                                                alt="no img"
                                            ></img>
                                            {el && (
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
                                                        <div className="tweet-img-container">
                                                            <img
                                                                src={el?.image}
                                                                className="tweet-img"
                                                            ></img>
                                                        </div>
                                                        {/* <h4>Likes:{el?.totalLikes}</h4> */}
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
                                                </>
                                            )}
                                        </div>
                                        <div className="tweet-container-extras">
                                            <CreateAllReplyModal
                                                tweetId={el?.id}
                                            />
                                            <CreateLike
                                                tweetId={el?.id}
                                                likedBy={el?.likes}
                                            />
                                        </div>
                                    </div>
                                </>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default FollowingTweets;
