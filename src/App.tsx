import { useStories } from './hooks/useStories.jsx';
import List from './List.jsx';
import SearchForm from './SearchForm.jsx';
import { StyledContainer, StyledHeadlinePrimary } from './Styles.jsx';

const App = () => {
  const {
    stories,
    searchTerm,
    handleSearchInput,
    searchAction,
    handleRemoveStory,
    sumComments,
    isLoading,
    isError,
  } = useStories();

  return (
    <StyledContainer>
      <h1>My Hacker Stories with {sumComments} comments.</h1>

      <StyledHeadlinePrimary>My Hacker Stories</StyledHeadlinePrimary>

      <SearchForm
        searchTerm={searchTerm}
        isLoading={isLoading}
        onSearchInput={handleSearchInput}
        searchAction={searchAction}
      />

      <hr />

      {isError && <p>Something went wrong ...</p>}

      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={stories} onRemoveItem={handleRemoveStory} />
      )}
    </StyledContainer>
  );
};

export default App;
