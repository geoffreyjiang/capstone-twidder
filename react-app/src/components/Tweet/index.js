import React, { useState, useEffect } from "react";
import {
    getTweets,
    getTweetId,
    editTweet,
    removeTweet,
} from "../../store/tweets";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./index.css";
import CreateTweet from "./createTweet";
import { getLikes, editLikes, createLike } from "../../store/likes";
import CreateLike from "../Likes/createLike";

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
                <CreateTweet />
                {tweets
                    ?.slice(0)
                    .reverse()
                    .map((el, i) => {
                        // console.log(el.totalLikes);
                        // console.log(el.likes);
                        return (
                            <div className="tweet-container" key={i}>
                                {!el?.profile_pic ? (
                                    <div className="user-things">
                                        <img
                                            src={
                                                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                            }
                                            className="tweet-user-img"
                                            alt="no img"
                                        ></img>
                                        <NavLink to={`/tweets/${el?.id}`}>
                                            @{el?.username}
                                        </NavLink>
                                    </div>
                                ) : (
                                    <div className="user-things">
                                        <img
                                            src={el?.profile_pic}
                                            className="tweet-user-img"
                                            alt="no img"
                                        ></img>
                                        <NavLink to={`/tweets/${el.id}`}>
                                            @{el?.username}
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
                                    </div>
                                ) : (
                                    <div className="tweet-text">
                                        <h3>{el?.body}</h3>
                                    </div>
                                )}
                                {/*
                                <div className="tweet-text">
                                    <h3>{el.body}</h3>
                                    {el.image ? (
                                        <div className="tweet-img">
                                            <img
                                                src={el.image}
                                                className="tweet-img"
                                            ></img>
                                        </div>
                                    ) : null}
                                    <h4>Likes: {el?.totalLikes}</h4>
                                </div> */}
                                <h4>{el?.totalLikes}</h4>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default Tweets;
