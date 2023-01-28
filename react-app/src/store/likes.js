const LOAD_LIKE = "likes/LOAD_LIKE";
// ADD_LIKE = "likes/ADD_LIKE";
const UPDATE_LIKE = "likes/UPDATE_LIKE";
const GET_LIKE_ID = "like/GET_LIKE_ID";

const loadLike = (like) => ({
    type: LOAD_LIKE,
    like,
});

const loadLikeId = (like) => ({
    type: GET_LIKE_ID,
    like,
});

const updateLike = (like) => ({
    type: UPDATE_LIKE,
    like,
});

export const getLikes = (id) => async (dispatch) => {
    const res = await fetch(`/api/tweets/${id}/likes`);
    if (res.ok) {
        const likes = await res.json();
        dispatch(loadLike(likes));
    }
};

export const editLikes = (like) => async (dispatch) => {
    // const res = await fetch(`/api/likes/${like.id}`, {
    //     method: "PUT",
    //     headers: {
    //         "Content-Type": "applicaiton/json",
    //         body: JSON.stringify(like),
    //     },
    // });
    // if (res.ok) {
    //     const liked = await res.json();
    //     dispatch(updateLike(liked));
    // }
    // console.log(like, "EDIT LIKE THUNKKKKK");
    const res = await fetch(`/api/tweets/${like.tweet_id}/likes`, {
        method: "PUT",
        headers: {
            "Content-Type": "applicaiton/json",
            body: JSON.stringify(like),
        },
    });
    if (res.ok) {
        const liked = await res.json();
        dispatch(updateLike(liked));
    }
};

const likeReducer = (state = {}, action) => {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_LIKE:
            return action.like;
        case UPDATE_LIKE:
            newState[action.like.id] = action.like;
            return newState;
        default:
            return state;
    }
};

export default likeReducer;
