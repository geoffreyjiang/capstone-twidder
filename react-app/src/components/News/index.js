import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../store/news";
function LatestNews() {
    const news = useSelector((state) => state.news);
    console.log(news.sports[0]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getNews());
    }, []);
    return (
        <div>
            <h1>Latest News</h1>
            <ul></ul>
        </div>
    );
}

export default LatestNews;
