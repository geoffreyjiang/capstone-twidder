const FOLLOW = "follow/FOLLOW";
const UNFOLLOW = "follow/UNFOLLOW";
const LOAD_FOLLOW = "follow/LOAD_FOLLOW";

const loadFollow = (user) => ({
    type: LOAD_FOLLOW,
    user,
});

const addFollow = (user) => ({
    type: FOLLOW,
    user,
});

const deleteFollow = (user) => ({
    type: UNFOLLOW,
    user,
});

export const getFollow = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadFollow(data));
    }
};

export const createFollow = (sessionUser, userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ main_id: sessionUser }),
    });

    if (res.ok) {
        const data = await res.json();
        console.log(data);
        dispatch(addFollow(data));
    }
};

export const removeFollow = (sessionUser, userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ main_id: sessionUser }),
    });
    if (res.ok) {
        const data = await res.json();
        console.log(data);
        dispatch(deleteFollow(data));
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
        default:
            return state;
    }
};

export default followReducer;
