import React, { useState, useEffect } from "react";
import { getTweets } from "../../store/tweets";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, Redirect } from "react-router-dom";
import "./index.css";
import { getLikes } from "../../store/likes";
import CreateTweet from "./createTweet";
import TopNav from "../Nav/topNav";
import CreateLike from "../Likes/createLike";
const Tweets = () => {
    const dispatch = useDispatch();
    const [like, setLike] = useState();
    const [id, setId] = useState("");
    const history = useHistory();
    const [val] = useState(true);
    const [tweetId, setTweetId] = useState("");
    const user = useSelector((state) => state.session.user);
    const tweets = useSelector((store) => {
        return Object.values(store.tweets);
    });
    // const likes = useSelector((store) => Object.values(store.likes));

    useEffect(() => {
        dispatch(getTweets());
    }, [dispatch]);

    if (!user) {
        return <Redirect to="/" />;
    }
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

                <CreateTweet />
                {tweets
                    ?.slice(0)
                    .reverse()
                    .map((el, i) => {
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
                                                <div className="username-container">
                                                    <NavLink
                                                        id="user-text"
                                                        to={`/tweets/${el.id}`}
                                                    >
                                                        {el.firstName} @
                                                        {el?.username}
                                                    </NavLink>
                                                </div>
                                                <div
                                                    className="tweet-created"
                                                    id="user-text"
                                                >
                                                    {el.created_at}
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
                                            <CreateLike
                                                tweetId={el.id}
                                                total={el.totalLikes}
                                                likedBy={el.likes}
                                                tweet={val}
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
                                            <CreateLike
                                                tweetId={el.id}
                                                total={el.totalLikes}
                                                likedBy={el.likes}
                                                tweet={val}
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
