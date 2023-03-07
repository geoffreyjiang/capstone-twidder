import React, { useState, useEffect } from "react";
import { getTweets } from "../../../store/tweets";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, Redirect, useParams } from "react-router-dom";
import { followingTweet } from "../../../store/follow";
import CreateLike from "../../Likes/createLike";
import CreateAllReplyModal from "../../Modals/ReplyModal/AllTweetReplyModal";
import UserTweets from "../../Profile/userTweets";
const FollowingTweets = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const user = useSelector((state) => state.session.user);
    const tweets = useSelector((store) => {
        return Object.values(store.tweets);
    });
    const myTweets = tweets?.filter((el) => el.user_id === user?.id);

    const following = useSelector((store) => {
        return Object.values(store.follow);
    });
    console.log(following);
    // const likes = useSelector((store) => Object.values(store.likes));
    useEffect(() => {
        dispatch(getTweets());
        dispatch(followingTweet(id));
    }, [dispatch]);

    if (!user) {
        return <Redirect to="/" />;
    }
    return (
        <>
            <div className="tweet-section">
                {following.length >= 0 &&
                    following
                        .slice()
                        .reverse()
                        .map((el, i) => {
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
                                                                tweetId={el?.id}
                                                                likedBy={
                                                                    el.likes
                                                                }
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
                                                                tweetId={el?.id}
                                                                likedBy={
                                                                    el.likes
                                                                }
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                </div>
                            );
                        })}
            </div>
            <UserTweets userId={id} />
        </>
    );
};

export default FollowingTweets;
