import React, { useEffect } from "react";
import { getTweets } from "../../store/tweets";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, Redirect } from "react-router-dom";
import "./index.css";
import CreateTweet from "./createTweet";
import CreateLike from "../Likes/createLike";
import CreateAllReplyModal from "../Modals/ReplyModal/AllTweetReplyModal";
import { getNews } from "../../store/news";
// import LatestNews from "../News";
const Tweets = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const tweets = useSelector((store) => {
        return Object.values(store.tweets);
    });

    useEffect(() => {
        dispatch(getTweets());
        dispatch(getNews());
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
                {/* <div className="tweet-container">
                    <LatestNews />
                </div> */}
                <CreateTweet />
                {tweets
                    ?.slice()
                    .reverse()
                    .map((el, i) => {
                        let profPic;
                        if (el?.profile_pic) profPic = el?.profile_pic;
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
                                            <div className="all-tweet-img-container">
                                                <img
                                                    src={el?.image}
                                                    className="all-tweet-img"
                                                ></img>
                                            </div>
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
                                <div className="tweet-container-extras">
                                    <CreateAllReplyModal tweetId={el.id} />
                                    <CreateLike
                                        tweetId={el.id}
                                        likedBy={el.likes}
                                    />
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default Tweets;
