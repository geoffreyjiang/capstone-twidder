const LOAD_REPLY = "replies/LOAD_REPLY";
const ADD_REPLY = "replies/ADD_REPLY";
const UPDATE_REPLY = "replies/UPDATE_REPLY";
const DELETE_REPLY = "replies/DELETE_REPLY";
const GET_REPLY_BY_ID = "replies/GET_REPLY_BY_ID";
const LOAD_MY_REPLY = "replies/LOAD_MY_REPLY";

const loadReply = (reply) => ({
    type: LOAD_REPLY,
    reply,
});

const loadReplyId = (reply) => ({
    type: GET_REPLY_BY_ID,
    reply,
});

const loadMyReply = (reply) => ({
    type: LOAD_MY_REPLY,
    reply,
});

const addReply = (reply) => ({
    type: ADD_REPLY,
    reply,
});

const updateReply = (reply) => ({
    type: UPDATE_REPLY,
    reply,
});

const deleteReply = (id) => ({
    type: DELETE_REPLY,
    id,
});

export const getReplies = (id) => async (dispatch) => {
    const res = await fetch(`/api/tweets/${id}/replies`);
    if (res.ok) {
        const reply = await res.json();
        dispatch(loadReply(reply));
    }
};

export const createReply = (id, reply) => async (dispatch) => {
    const res = await fetch(`/api/tweets/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reply),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(addReply(data));
    }
};

export const getReplyId = (id) => async (dispatch) => {
    const res = await fetch(`/api/reply/${id}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadReplyId(data));
    }
};

export const editReply = (reply) => async (dispatch) => {
    const res = await fetch(`/api/reply/${reply.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reply),
    });
    if (res.ok) {
        const edited = await res.json();
        dispatch(updateReply(edited));
    }
};

export const removeReply = (id) => async (dispatch) => {
    const res = await fetch(`/api/reply/${id}`, {
        method: "DELETE",
    });
    if (res.ok) {
        dispatch(deleteReply(id));
    }
};

const replyReducer = (state = {}, action) => {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_REPLY:
            return action.reply;
        case GET_REPLY_BY_ID:
            return action.reply;
        case LOAD_MY_REPLY:
            return action.reply;
        case ADD_REPLY:
            newState[action.reply.id] = action.reply;
            return newState;
        case UPDATE_REPLY:
            newState[action.reply.id] = action.reply;
            return newState;
        case DELETE_REPLY:
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
};

export default replyReducer;
