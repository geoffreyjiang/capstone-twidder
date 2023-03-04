const FOLLOW = "follow/FOLLOW";
const UNFOLLOW = "follow/UNFOLLOW";

const addFollow = (user) => ({
    type: FOLLOW,
    user,
});

const deleteFollow = (user) => ({
    type: UNFOLLOW,
    user,
});

export const createFollow = (sessionUser, id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}/follow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id: sessionUser}),

    });

    if (res.ok) {
        const data = await res.json();
        dispatch(addFollow(data));
    }
};

export const removeFollow = (sessionUser, id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}/follow`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id: sessionUser}),
    })
    if (res.ok) {
        const data = await res.json();

        dispatch(deleteFollow(data));
    }
}


const followReducer = (state = {}, action) => {
    const newState = { ...state };

    switch (action.type) {
        case FOLLOW:
            newState[action.user] = action.user;
            return newState;
        case UNFOLLOW:
            delete newState[action.user]
            return newState
        default:
            return state;
    }
};

export default followReducer;
