const LOAD_NEWS = "news/LOAD_NEWS";

const loadNews = (news) => ({
    type: LOAD_NEWS,
    news,
});

export const getNews = () => async (dispatch) => {
    const res = await fetch(`/api/news`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadNews(data));
    }
};

const newsReducer = (state = {}, action) => {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_NEWS:
            return { ...newState, ...action.news };
        default:
            return state;
    }
};

export default newsReducer;
