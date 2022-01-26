import React, {useCallback, useEffect, useState} from 'react';
import Post from "./Post";
import {getPageInfo, useDebounce} from "../utils/utils";
import {useDispatch, useSelector} from "react-redux";
import {getPostsByKeyword, getPostsByPageAction} from "../redux/actions/mainActions";
import {GALLERY_SEARCH_INPUT_TEXT} from "../utils/constants";
import "../css/gallery.css";


const Gallery = ({posts, username, setIdToEdit}) => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebounce(searchQuery);
    const pageInfo = useSelector(getPageInfo);

    const [currPage, setCurrPage] = useState(1);

    useEffect(() => {
        if (debouncedSearchQuery) {
            dispatch(getPostsByKeyword(debouncedSearchQuery));
            setCurrPage(1);
            pageInfo.total = posts.length;
            const totalPages = Math.floor(pageInfo.total / 9);
            pageInfo.totalPages = totalPages > 0 ? totalPages : 1
        } else {
            dispatch(getPostsByPageAction(currPage));
        }
    }, [debouncedSearchQuery, currPage, dispatch, pageInfo, posts.length]);

    const pageJumper = useCallback((isForward) => {
        let nextPage = currPage;
        isForward ? nextPage++ : nextPage--;
        nextPage = nextPage < 1 ? pageInfo.totalPages : nextPage;
        setCurrPage(nextPage);
    }, [currPage, pageInfo.totalPages]);

    const paginator = useCallback(() => {
        if (currPage !== pageInfo.totalPages) {
            return <div className="paginator">
                <button onClick={() => pageJumper(true)}>Next Page</button>
            </div>
        }
        if (currPage > 1 && pageInfo.page < pageInfo.totalPages) {
            return <div className="paginator">
                <button onClick={() => pageJumper(false)}>Prev Page</button>
                <button onClick={() => pageJumper(true)}>Next Page</button>
            </div>
        }
        if (pageInfo.totalPages > 1 && currPage === pageInfo.totalPages) {
            return <div className="paginator">
                <button onClick={() => pageJumper(false)}>Prev Page</button>
            </div>
        }
    }, [currPage, pageInfo, pageJumper]);

    const clearSearch = useCallback(() => {
        setSearchQuery("");
    }, []);

    return (
        <div>
            <div className="search-block">
                <input
                    type="text"
                    placeholder={GALLERY_SEARCH_INPUT_TEXT}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={clearSearch}>Clear</button>
            </div>

            <div className="gallery-container">
                {posts && posts.map((post, index) => {
                    return <Post
                        key={index}
                        post={post}
                        username={username}
                        setIdToEdit={setIdToEdit}
                    />
                })}
            </div>
            {paginator()}
        </div>
    );
};

export default Gallery;