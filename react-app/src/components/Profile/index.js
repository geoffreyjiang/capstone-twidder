import React, { useState, useEffect } from "react";
import { getTweets } from "../../store/tweets";
import { useDispatch, useSelector } from "react-redux";

const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    console.log(user);

    return (
        <>
            <div className="tweet-section">
                <h2>yesssir</h2>
            </div>
        </>
    );
};

export default UserProfile;
