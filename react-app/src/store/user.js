const LOAD_USER = "users/LOAD_USERS";
const GET_USER_ID = "users/GET_USER_ID";

const loadUser = (user) => ({
    type: LOAD_USER,
    user,
});

const loadUserId = (user) => ({
    type: GET_USER_ID,
    user,
});

export const getUsers = () => async (dispatch) => {
    const res = await fetch("/api/users");
    if (res.ok) {
        const data = await res.json();
        dispatch(loadUser(data));
    }
};

export const getUserById = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}`);
    if (res.ok) {
        const user = await res.json();
        dispatch(loadUserId(user));
    }
};

const userReducer = (state = {}, action) => {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_USER:
            return { ...newState, ...action.user };
        case GET_USER_ID:
            return { ...newState, [action.user.id]: action.user };
        default:
            return state;
    }
};

export default userReducer;
