import InputWithLabel from './InputWithLabel';
import { useStories } from "./hooks/useStories";
import List from './List';

const App = () => {
  const [searchedStories, searchTerm, handleSearch, handleRemoveStory, isLoading, isError] = useStories();

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />

      {isError && <p>Something went wrong ...</p>}

      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List
          list={searchedStories}
          onRemoveItem={handleRemoveStory}
        />
      )}
    </div>
  );
};

export default App;