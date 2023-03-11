// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getNews } from "../../store/news";
// import "./index.css";
// import fetchNewsData from "./fetchNews";
// function LatestNews() {
// const news = useSelector((state) => Object.values(state.news.sports));
// const sports = useSelector((state) => state.news);
// console.log(sports);
// let sportsNews;
// sportsNews = sports.map((el) => el);
// console.log(sportsNews);
// const dispatch = useDispatch();
// useEffect(() => {
//     dispatch(getNews());
// });
// console.log(news);
// return (
//     <div className="news-container">
//         <h1>Latest News</h1>
//         {/* <h3>{news}</h3> */}
//     </div>
// );

//     const [newsData, setNewsData] = useState([]);

//     useEffect(() => {
//         fetchNewsData().then((data) => {
//             setNewsData(data);
//         });
//     }, []);
//     console.log(newsData);
//     return (
//         <div>
//             {newsData.map((newsItem) => (
//                 <div key={newsItem.id}>
//                     <h3>{newsItem.title}</h3>
//                     <p>{newsItem.url}</p>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default LatestNews;
