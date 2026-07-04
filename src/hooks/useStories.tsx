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

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

export enum StoriesActionType {
  FETCH_INIT = 'FETCH_INIT',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_FAILURE = 'FETCH_FAILURE',
  REMOVE_STORY = 'REMOVE_STORY',
}

type StoriesState = {
  data: Story[];
  isLoading: boolean;
  isError: boolean;
};

type StoriesAction =
  | { type: StoriesActionType.FETCH_INIT }
  | { type: StoriesActionType.FETCH_SUCCESS; payload: Story[] }
  | { type: StoriesActionType.FETCH_FAILURE }
  | { type: StoriesActionType.REMOVE_STORY; payload: Story };

export const storiesReducer = (
  state: StoriesState,
  action: StoriesAction,
) => {
  switch (action.type) {
    case StoriesActionType.FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case StoriesActionType.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case StoriesActionType.FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case StoriesActionType.REMOVE_STORY:
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID,
        ),
      };
    default:
      throw new Error('Unhandled action type');
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

  const handleFetchStories = useCallback(
    async (signal: AbortSignal) => {
      dispatchStories({ type: StoriesActionType.FETCH_INIT });

      try {
        const result = await axios.get(url, { signal: signal });

        dispatchStories({
          type: StoriesActionType.FETCH_SUCCESS,
          payload: result.data.hits,
        });
      } catch {
        dispatchStories({ type: StoriesActionType.FETCH_FAILURE });
      }
    },
    [url],
  );

  useEffect(() => {
    const abortController = new AbortController();

    handleFetchStories(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [handleFetchStories]);

  const handleRemoveStory = useCallback((item: Story) => {
    dispatchStories({
      type: StoriesActionType.REMOVE_STORY,
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

  const sumComments = useMemo(() => {
    return stories.data.reduce(
      (result, value) => result + (value.num_comments || 0),
      0,
    );
  }, [stories.data]);

  return {
    stories: stories.data,
    searchTerm,
    handleSearchInput,
    searchAction,
    handleRemoveStory,
    sumComments,
    isLoading: stories.isLoading,
    isError: stories.isError,
  };
};
