import { describe, expect, it } from 'vitest';

import App from './App';
import {
  StoriesActionType,
  storiesReducer,
} from './hooks/useStories';

const storyOne = {
  title: 'React',
  url: 'https://react.dev/',
  author: 'Jordan Walke',
  num_comments: 3,
  points: 4,
  objectID: 0,
};
const storyTwo = {
  title: 'Redux',
  url: 'https://redux.js.org/',
  author: 'Dan Abramov, Andrew Clark',
  num_comments: 2,
  points: 5,
  objectID: 1,
};

const stories = [storyOne, storyTwo];

describe('storiesReducer', () => {
  it('removes a story from all stories', () => {
    const action = {
      type: StoriesActionType.REMOVE_STORY,
      payload: storyOne,
    };
    const state = { data: stories, isLoading: false, isError: false };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: [storyTwo],
      isLoading: false,
      isError: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it('starts fetching stories', () => {
    const action = {
      type: StoriesActionType.FETCH_INIT,
    };
    const state = { data: [], isLoading: false, isError: false };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: [],
      isLoading: true,
      isError: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it('successfully fetches stories', () => {
    const action = {
      type: StoriesActionType.FETCH_SUCCESS,
      payload: [storyOne, storyTwo],
    };
    const state = { data: [], isLoading: true, isError: false };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: [storyOne, storyTwo],
      isLoading: false,
      isError: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it('fails fetching stories', () => {
    const action = {
      type: StoriesActionType.FETCH_FAILURE,
    };
    const state = { data: [], isLoading: true, isError: false };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: [],
      isLoading: false,
      isError: true,
    };

    expect(newState).toStrictEqual(expectedState);
  });
});
