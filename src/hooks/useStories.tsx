import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { useStorageState } from './useStorageState';
import axios from 'axios';
import { Story } from '../types/item';

const STORIES_FETCH_INIT = 'STORIES_FETCH_INIT' as const;
const STORIES_FETCH_SUCCESS = 'STORIES_FETCH_SUCCESS' as const;
const STORIES_FETCH_FAILURE = 'STORIES_FETCH_FAILURE' as const;
const REMOVE_STORY = 'REMOVE_STORY' as const;

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

type StoriesState = {
  data: Story[];
  isLoading: boolean;
  isError: boolean;
};

type StoriesFetchInitAction = {
  type: typeof STORIES_FETCH_INIT;
};

type StoriesFetchSuccessAction = {
  type: typeof STORIES_FETCH_SUCCESS;
  payload: Story[];
};

type StoriesFetchFailureAction = {
  type: typeof STORIES_FETCH_FAILURE;
};

type StoriesRemoveAction = {
  type: typeof REMOVE_STORY;
  payload: Story;
};

type StoriesAction =
  | StoriesFetchInitAction
  | StoriesFetchSuccessAction
  | StoriesFetchFailureAction
  | StoriesRemoveAction;

const storiesReducer = (
  state: StoriesState,
  action: StoriesAction,
) => {
  switch (action.type) {
    case STORIES_FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case STORIES_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case STORIES_FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case REMOVE_STORY:
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID,
        ),
      };
    default:
      throw new Error();
  }
};

export const useStories = () => {
  const [searchTerm, setSearchTerm] = useStorageState(
    'search',
    'React',
  );

  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);

  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: STORIES_FETCH_INIT });

    try {
      const result = await axios.get(url);

      dispatchStories({
        type: STORIES_FETCH_SUCCESS,
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({ type: STORIES_FETCH_FAILURE });
    }
  }, [url]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = useCallback((item: Story) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  }, []);

  const handleSearchInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    [setSearchTerm],
  );

  const searchAction = useCallback(() => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  }, [searchTerm]);

  const getSumComments = useMemo(() => {
    return stories.data.reduce(
      (result, value) => result + value.num_comments,
      0,
    );
  }, [stories]);

  return {
    stories: stories.data,
    searchTerm,
    handleSearchInput,
    searchAction,
    handleRemoveStory,
    getSumComments,
    isLoading: stories.isLoading,
    isError: stories.isError,
  };
};
