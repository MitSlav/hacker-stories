import { useEffect, useReducer, useState } from "react";
import { useStorageState } from "./useStorageState";

const STORIES_FETCH_INIT = 'STORIES_FETCH_INIT'
const STORIES_FETCH_SUCCESS = 'STORIES_FETCH_SUCCESS'
const STORIES_FETCH_FAILURE = 'STORIES_FETCH_FAILURE'
const REMOVE_STORY = 'REMOVE_STORY'

const initialStories = [
    {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://redux.js.org/',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
];

const getAsyncStories = () =>
    new Promise((resolve) =>
        setTimeout(
            () => resolve({ data: { stories: initialStories } }),
            2000
        )
    );

const storiesReducer = (state, action) => {
    switch (action.type) {
        case STORIES_FETCH_INIT:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case STORIES_FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            }
        case STORIES_FETCH_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        case REMOVE_STORY:
            return {
                ...state,
                data: state.data.filter(
                    (story) => action.payload.objectID !== story.objectID
                )
            };
        default:
            throw new Error();
    }
};

export const useStories = () => {
    const [searchTerm, setSearchTerm] = useStorageState(
        'search',
        'React'
    );

    const [stories, dispatchStories] = useReducer(
        storiesReducer,
        { data: [], isLoading: false, isError: false }
    );

    useEffect(() => {
        dispatchStories({ type: STORIES_FETCH_INIT });

        getAsyncStories()
            .then((result) => {
                dispatchStories({
                    type: STORIES_FETCH_SUCCESS,
                    payload: result.data.stories
                })
            })
            .catch(() => dispatchStories({ type: STORIES_FETCH_FAILURE }));
    }, []);

    const handleRemoveStory = (item) => {
        dispatchStories({
            type: 'REMOVE_STORY',
            payload: item
        })
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const searchedStories = stories.data.filter((story) =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return [
        searchedStories,
        searchTerm,
        handleSearch,
        handleRemoveStory,
        stories.isLoading,
        stories.isError
    ];
}