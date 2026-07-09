import { describe, expect, it, vi } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';

import App from './App';
import {
  StoriesActionType,
  storiesReducer,
} from './hooks/useStories';
import Item from './Item';
import SearchForm from './SearchForm';

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

describe('Item', () => {
  it('renders all properties', () => {
    render(<Item item={storyOne} />);

    expect(screen.getByText('Jordan Walke')).toBeInTheDocument();
    expect(screen.getByText('React')).toHaveAttribute(
      'href',
      'https://react.dev/',
    );
  });

  it('renders a clickable dismiss button', () => {
    render(<Item item={storyOne} />);
    // screen.getByRole('');
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls the callback handler when clicking the dismiss button', () => {
    const handleRemoveitem = vi.fn();

    render(<Item item={storyOne} onRemoveItem={handleRemoveitem} />);

    fireEvent.click(screen.getByRole('button'));

    expect(handleRemoveitem).toHaveBeenCalledTimes(1);
  });
});

describe('SearchForm', () => {
  const searchFormProps = {
    searchTerm: 'React',
    isLoading: false,
    onSearchInput: vi.fn(),
    searchAction: vi.fn(),
  };

  it('renders the input field with its value', () => {
    render(<SearchForm {...searchFormProps} />);

    expect(screen.getByDisplayValue('React')).toBeInTheDocument();
  });

  it('renders the correct label', () => {
    render(<SearchForm {...searchFormProps} />);

    // screen.debug();

    expect(screen.getByLabelText(/Search/)).toBeInTheDocument();
  });

  it('calls onSearchInput on input field change', () => {
    render(<SearchForm {...searchFormProps} />);

    fireEvent.change(screen.getByDisplayValue('React'), {
      target: { value: 'Redux' },
    });

    expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1);
  });

  it('calls searchAction on button submit click', () => {
    render(<SearchForm {...searchFormProps} />);

    fireEvent.click(screen.getByRole('button'));

    expect(searchFormProps.searchAction).toHaveBeenCalledTimes(1);
  });
});
