import { useEffect, useState } from "react";
import { useStorageState } from "./useStorageState";

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

export const useStories = () => {
    const [searchTerm, setSearchTerm] = useStorageState(
        'search',
        'React'
    );

    const [stories, setStories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        getAsyncStories()
            .then((result) => {
                setStories(result.data.stories);
                setIsLoading(false);
            })
            .catch(() => setIsError(true));
    }, []);

    const handleRemoveStory = (item) => {
        const newStories = stories.filter(
            (story) => item.objectID !== story.objectID
        );

        setStories(newStories);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const searchedStories = stories.filter((story) =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return [searchedStories, searchTerm, handleSearch, handleRemoveStory, isLoading, isError];
}