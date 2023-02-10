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
    const [editBody, setEditBody] = useState("");
    const history = useHistory();

    useEffect(() => {
        let func = async () => {
            setEditBody(tweet.body);
            dispatch(getTweetId(id));
        };
        func();
        // dispatch(getLikes(id));
    }, [dispatch, editBody]);
    let edit;
    edit = tweet.body;
    console.log(tweet.body);
    console.log(editBody);
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
                            {/* <div className="profile_pic"> */}
                            <div className="user-modal">
                                {user && user?.id == tweet?.user_id ? (
                                    <>
                                        <EditTweetModal />
                                    </>
                                ) : null}
                            </div>
                            <div className="username-container">
                                <img
                                    src={tweet.profile_pic}
                                    className="tweet-user-img"
                                    alt="no img"
                                ></img>
                                {/* </div> */}
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
                    <div className="tweet-text">
                        <h1>{tweet.body}</h1>
                    </div>
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
