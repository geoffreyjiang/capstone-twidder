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
import { getLikes, editLikes, createLike } from "../../store/likes";
import CreateLike from "../Likes/createLike";

const Tweets = () => {
    const dispatch = useDispatch();
    const [like, setLike] = useState();
    const [id, setId] = useState("");
    const [tweetId, setTweetId] = useState("");
    const user = useSelector((state) => state.session.user);
    const tweets = useSelector((store) => {
        return Object.values(store.tweets);
    });
    // const likes = useSelector((store) => Object.values(store.likes));

    useEffect(() => {
        dispatch(getTweets());
    }, [dispatch]);

    const submit = async (e) => {
        e.preventDefault();
        let num = Number(id);
        if (!user) {
            alert("Please login!");
        }

        const data = {
            user_id: user.id,
            tweet_id: tweetId,
            isLiked: like,
        };
        dispatch(editLikes(data));
        // if (liked) {
        //     dispatch(getTweets(data.id));
        // }
    };

    const handleChange = () => {
        setLike(!like);
    };
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
                                {/* <NavLink to={`/tweets/${el.id}`}>
                                    {" "}
                                    To tweet
                                </NavLink> */}
                                <h3>
                                    {el.body} by: {el.username}
                                </h3>
                                <h4>Likes: {el?.totalLikes}</h4>
                                {/* {!el.likedBy.includes(user.id) ? (
                                <>
                                    <button
                                        onClick={() =>
                                            dispatch(
                                                createLike(el.id, {
                                                    tweet_id: el.id,
                                                    user_id: user.id,
                                                    isLiked: true,
                                                })
                                            )
                                        }
                                    ></button>
                                </>
                            ) : (
                                <></>
                            )} */}
                                <NavLink to={`/tweets/${el.id}`}> </NavLink>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default Tweets;

{
    /* <form onSubmit={submit}>
<button
    type="submit"
    className="like-btn"
    onClick={() => {
        // setLike(false);
        // setTweetId(el.id);
        el.likes.forEach((x) => {
            if (
                x.user_id === user.id &&
                el.isLiked === true
            ) {
                setId(x.id);
                setLike(false);
                setTweetId(el.id);
                editTweet({
                    id: x.id,
                });
            }
        });
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
    unlike
</button>
</form> */
}
