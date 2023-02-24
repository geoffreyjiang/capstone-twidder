const LOAD_LIKE = "likes/LOAD_LIKE";
const ADD_LIKE = "like/ADD_LIKE";
const DELETE_LIKE = "like/DELETE_LIKE";
const GET_LIKE_ID = "like/GET_LIKE_ID";

const loadLike = (like) => ({
    type: LOAD_LIKE,
    like,
});

const addLike = (like) => ({
    type: ADD_LIKE,
    like,
});

const deleteLike = (id) => ({
    type: DELETE_LIKE,
    id,
});

export const getLikes = (id) => async (dispatch) => {
    const res = await fetch(`/api/tweets/${id}/likes`);
    if (res.ok) {
        const likes = await res.json();
        dispatch(loadLike(likes));
    }
};

export const createLike = (id) => async (dispatch) => {
    const res = await fetch(`/api/tweets/${id}/likes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.ok) {
        const data = await res.json();
        console.log(data);
        if (data.msg !== "deleted") {
            dispatch(addLike(data));
        } else {
            dispatch(deleteLike(data.id));
        }

        return data;
    }
};

const likeReducer = (state = {}, action) => {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_LIKE:
            return { ...newState, ...action.like };
        case ADD_LIKE:
            newState[action.like.id] = action.like;
            return newState;
        case DELETE_LIKE:
            delete newState[action.id];
            return { ...newState };
        default:
            return state;
    }
};

export default likeReducer;
