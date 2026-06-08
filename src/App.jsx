import { useStories } from "./hooks/useStories";
import List from './List';
import SearchForm from './SearchForm';

const App = () => {
  const [
    stories,
    searchTerm,
    handleSearchInput,
    searchAction,
    handleRemoveStory,
    isLoading,
    isError
  ] = useStories();

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        searchAction={searchAction}
      />

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