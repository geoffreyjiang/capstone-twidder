const LOAD_TWEET = "tweets/LOAD_TWEET";
const ADD_TWEET = "tweets/ADD_TWEET";
const UPDATE_TWEET = "tweets/UPDATE_TWEET";
const DELETE_TWEET = "tweets/DELETE_TWEET";
const GET_TWEET_BY_ID = "tweets/GET_TWEET_BY_ID";
const LOAD_MY_TWEETS = "tweets/LOAD_MY_TWEETS";

const loadTweets = (tweet) => ({
    type: LOAD_TWEET,
    tweet,
});

const loadTweetId = (tweet) => ({
    type: GET_TWEET_BY_ID,
    tweet,
});

const loadMyTweets = (tweet) => ({
    type: LOAD_MY_TWEETS,
    tweet,
});

const addTweet = (tweet) => ({
    type: ADD_TWEET,
    tweet,
});

const updateTweet = (tweet) => ({
    type: UPDATE_TWEET,
    tweet,
});

const deleteTweet = (id) => ({
    type: DELETE_TWEET,
    id,
});

export const getTweets = () => async (dispatch) => {
    const res = await fetch("/api/tweets");
    if (res.ok) {
        const data = await res.json();
        dispatch(loadTweets(data));
    }
};

export const createTweet = (tweet) => async (dispatch) => {
    const res = await fetch("/api/tweets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tweet),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(addTweet(data));
    }
};

export const getTweetId = (id) => async (dispatch) => {
    const res = await fetch(`/api/tweets/${id}`);
    if (res.ok) {
        const tweet = await res.json();
        dispatch(loadTweetId(tweet));
    }
};

export const editTweet = (data) => async (dispatch) => {
    const res = await fetch(`/api/tweets/${data.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (res.ok) {
        const tweet = await res.json();
        dispatch(updateTweet(tweet));
    }
};

export const removeTweet = (id) => async (dispatch) => {
    const res = await fetch(`/api/tweets/${id}`, {
        method: "DELETE",
    });
    if (res.ok) {
        dispatch(deleteTweet(id));
    }
};

const tweetReducer = (state = {}, action) => {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_TWEET:
            return action.tweet;
        case GET_TWEET_BY_ID:
            return action.tweet;
        case LOAD_MY_TWEETS:
            return action.tweet;
        case ADD_TWEET:
            newState[action.tweet.id] = action.tweet;
            return newState;
        case UPDATE_TWEET:
            newState[action.tweet.id] = action.tweet;
            return newState;
        case DELETE_TWEET:
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
};

export default tweetReducer;
