import InputWithLabel from './InputWithLabel';
import { useStories } from "./hooks/useStories";
import List from './List';

const App = () => {
  const [
    stories,
    searchTerm,
    handleSearchInput,
    handleSearchSubmit,
    handleRemoveStory,
    isLoading,
    isError
  ] = useStories();

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearchInput}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <button
        type='button'
        disabled={!searchTerm}
        onClick={handleSearchSubmit}
      >
        Submit
      </button>

      <hr />

      {isError && <p>Something went wrong ...</p>}

      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List
          list={stories}
          onRemoveItem={handleRemoveStory}
        />
      )}
    </div>
  );
};

export default App;