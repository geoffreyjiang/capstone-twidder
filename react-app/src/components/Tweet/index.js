import React, { useState, useEffect } from "react";
import {
    getTweets,
    getTweetId,
    editTweet,
    removeTweet,
} from "../../store/tweets";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./index.css";
import CreateTweet from "./createTweet";
import { getLikes, editLikes } from "../../store/likes";

const Tweets = () => {
    const dispatch = useDispatch();
    const [like, setLike] = useState(false);
    const [id, setId] = useState("");
    const user = useSelector((state) => state.session.user);
    const tweets = useSelector((store) => {
        return Object.values(store.tweets);
    });
    // const likes = useSelector((store) => Object.values(store.likes));
    // console.log(likes);
    useEffect(() => {
        dispatch(getTweets());
    }, [dispatch]);
    // console.log(id, "ID MANNNNNNN");
    // console.log(like, "LIKE MANNNNNNN");

    const submit = async (e) => {
        e.preventDefault();
        let num = Number(id);
        console.log(num);
        if (!user) {
            alert("Please login!");
        }

        const data = {
            user_id: user.id,
            tweet_id: id,
            isLiked: like,
        };
        console.log(data);
        const liked = dispatch(editLikes(data));
        if (liked) {
            dispatch(getLikes(data.tweet_id));
        }
    };

    const handleChange = () => {
        setLike(!like);
    };
    return (
        <>
            <CreateTweet />
            <div className="tweet-section">
                {tweets?.map((el) => {
                    console.log(el.likedBy);
                    return (
                        <div className="tweet-container">
                            <NavLink to={`/tweets/${el.id}`}> To tweet</NavLink>
                            <h3>
                                {el.body} by: {el.username}
                            </h3>
                            <h3>Likes: {el.likes}</h3>
                            {el.likedBy?.includes(user.id) ? (
                                <>
                                    <form onSubmit={submit}>
                                        <button
                                            type="submit"
                                            className="like-btn"
                                            onClick={() => {
                                                setLike(!like);
                                                setId(el.id);
                                                // el.likedBy.indexOf(el.id);
                                                if (el.likedBy.length !== -1) {
                                                    el.likedBy.splice(
                                                        el.likedBy.indexOf(
                                                            el.id
                                                        ),
                                                        1
                                                    );
                                                }
                                            }}
                                        >
                                            red
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <form onSubmit={submit}>
                                        <button
                                            type="submit"
                                            className="like-btn"
                                            onClick={() => {
                                                setLike(!like);
                                                setId(el.id);
                                                el.likedBy.push(user.id);
                                            }}
                                        >
                                            not red
                                        </button>
                                    </form>
                                </>
                            )}
                            <NavLink to={`/tweets/${el.id}`}> </NavLink>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Tweets;
