import {useState, useEffect} from "react";

export const getUserName = state => state.user;
export const getPosts = state => state.posts;
export const getPageInfo = state => state.pageInfo;

export const useDebounce = (value, delay = 1000) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
        () => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            return () => {
                clearTimeout(handler);
            };
        }, [value, delay]);
    return debouncedValue;
}