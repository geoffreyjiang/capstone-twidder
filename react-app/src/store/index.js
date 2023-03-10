import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import tweetReducer from "./tweets";
import replyReducer from "./reply";
import likeReducer from "./likes";
import userReducer from "./user";
import followReducer from "./follow";
import newsReducer from "./news";
const rootReducer = combineReducers({
    session,
    tweets: tweetReducer,
    replies: replyReducer,
    likes: likeReducer,
    users: userReducer,
    follow: followReducer,
    news: newsReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require("redux-logger").default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
