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

export const createFollow = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}/follow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: id }),
    });

    if (res.ok) {
        const data = await res.json();
        console.log(data, '--------------------------------------------------------------------------------------------------------------------')
        dispatch(addFollow(data.user));
    }
};

const followReducer = (state = {}, action) => {
    const newState = { ...state };

    switch (action.type) {
        case FOLLOW:
            newState[action.user.id] = action.user;
            return newState;
        default:
            return state;
    }
};

export default followReducer;
