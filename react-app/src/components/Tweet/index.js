import React, { useState, useEffect } from "react";
import { getTweets } from "../../store/tweets";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./index.css";
import CreateTweet from "./createTweet";
import TopNav from "../Nav/topNav";
const Tweets = () => {
    const dispatch = useDispatch();
    const [like, setLike] = useState();
    const [id, setId] = useState("");
    const history = useHistory();
    const [tweetId, setTweetId] = useState("");
    const user = useSelector((state) => state.session.user);
    const tweets = useSelector((store) => {
        return Object.values(store.tweets);
    });
    // const likes = useSelector((store) => Object.values(store.likes));

    useEffect(() => {
        dispatch(getTweets());
    }, [dispatch]);

    return (
        <>
            <div className="tweet-section">
                <div className="tweet-container">
                    <div className="top-nav">
                        <ul>
                            <div className="top">
                                <li>All</li>
                            </div>
                            ||
                            <div className="top">
                                <li>Following</li>
                            </div>
                        </ul>
                    </div>
                </div>
                <div className="tweet-container">
                    <CreateTweet />
                </div>
                {tweets
                    ?.slice(0)
                    .reverse()
                    .map((el, i) => {
                        // console.log(el.totalLikes);
                        // console.log(el.likes);
                        console.log(el.firstName);
                        // console.log(el.body);
                        return (
                            <div className="tweet-container" key={i}>
                                {el?.profilePic ? (
                                    <div className="user-things">
                                        <div className="profileImg">
                                            <img
                                                src={el.profilePic}
                                                className="tweet-user-img"
                                                alt="no img"
                                            ></img>
                                        </div>
                                        <div className="username-container">
                                            <NavLink to={`/tweets/${el.id}`}>
                                                {el.firstName} @{el?.username}
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
                                        <NavLink to={`/tweets/${el?.id}`}>
                                            {el.firstName} @{el?.username}
                                        </NavLink>
                                    </div>
                                )}
                                {el?.image ? (
                                    <div className="tweet-text">
                                        <h3>{el?.body}</h3>
                                        <img
                                            src={el?.image}
                                            className="tweet-img"
                                        ></img>
                                        <h4>Likes:{el?.totalLikes}</h4>
                                    </div>
                                ) : (
                                    <div className="tweet-text">
                                        <h3>{el?.body}</h3>
                                        <h4>Likes:{el?.totalLikes}</h4>
                                    </div>
                                )}
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default Tweets;
