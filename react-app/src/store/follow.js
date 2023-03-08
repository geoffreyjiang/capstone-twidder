const FOLLOW = "follow/FOLLOW";
const UNFOLLOW = "follow/UNFOLLOW";
const LOAD_FOLLOW = "follow/LOAD_FOLLOW";
const SET_FOLLOWING_TWEETS = "follow/SET_FOLLOWING_TWEETS";
const DEL_FOLLOWING_TWEETS = "follow/DEL_FOLLOWING_TWEETS";
const loadFollow = (user) => ({
    type: LOAD_FOLLOW,
    user,
});

const addFollow = (user) => ({
    type: FOLLOW,
    user,
});

const setFollowingTweets = (followingTweet) => ({
    type: SET_FOLLOWING_TWEETS,
    payload: followingTweet,
});

const deleteFollow = (user) => ({
    type: UNFOLLOW,
    user,
});

const delFollowingTweets = (followingTweet) => ({
    type: DEL_FOLLOWING_TWEETS,
    payload: followingTweet,
});

export const getFollow = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadFollow(data));
    }
};

export const followingTweet = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}/following`);
    if (res.ok) {
        const data = await res.json();
        dispatch(setFollowingTweets(data));
    }
};

export const deleteFollowingTweet = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}/following`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(delFollowingTweets(data));
    }
};

export const createFollow = (sessionUser, id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
        const data = await res.json();
        // console.log(data);
        // dispatch(addFollow(data));
    }
};

export const removeFollow = (sessionUser, id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
        const data = await res.json();
        // console.log(data);
        // dispatch(deleteFollow(data));
    }
};

const followReducer = (state = {}, action) => {
    const newState = { ...state };

    switch (action.type) {
        case LOAD_FOLLOW:
            return { ...newState, ...action.user };
        case FOLLOW:
            newState[action.user] = action.user;
            return newState;
        case UNFOLLOW:
            delete newState[action.user];
            return newState;
        case SET_FOLLOWING_TWEETS:
            return { ...newState, ...action.payload };
        case DEL_FOLLOWING_TWEETS:
            const { unfollowed } = action.payload;
            const filteredState = Object.fromEntries(
                Object.entries(newState).filter(
                    ([key, value]) => value.user_id !== unfollowed
                )
            );
            return filteredState;
        default:
            return state;
    }
};

export default followReducer;
