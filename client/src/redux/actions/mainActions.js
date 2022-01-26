export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SET_PAGE = "SET_PAGE";
export const SET_PAGE_INFO = "SET_PAGE_INFO";
export const MAIN_URL = "http://localhost:8080/";


export const loginAction = (userName) => ({
    type: LOGIN,
    payload: userName
})

export const logoutAction = () => ({
    type: LOGOUT
})

export const setPageAction = (posts) => ({
    type: SET_PAGE,
    payload: posts
})

export const setPageInfoAction = (currPage, totalPosts, totalPages) => ({
    type: SET_PAGE_INFO,
    payload: {currPage, totalPosts, totalPages}
})

export const getPostsByPageAction = (pageNum) => {
    return (dispatch) => {
        fetch(MAIN_URL + "post/page/" + pageNum)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status.toString());
                }
            })
            .then(res => {
                dispatch(setPageInfoAction(res.page, res.total, res.totalPages));
                dispatch(setPageAction(res.result));
            });
    }
}

export const getPostsByKeyword = (keyword) => {
    return (dispatch) => {
        fetch(MAIN_URL + "post/search/" + keyword)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status.toString());
                }
            })
            .then(res => {
                dispatch(setPageAction(res.result));
            });
    }
}


