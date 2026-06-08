import InputWithLabel from './InputWithLabel';
import styles from './App.module.css';

const SearchForm = ({
    searchTerm,
    onSearchInput,
    searchAction,
}) => (
    <form action={searchAction} className={styles.searchForm}>
        <InputWithLabel
            id="search"
            value={searchTerm}
            isFocused
            onInputChange={onSearchInput}
        >
            <strong>Search:</strong>
        </InputWithLabel>

        <button
            type='submit'
            disabled={!searchTerm}
            className={`${styles.button} ${styles.buttonLarge}`}
        >
            Submit
        </button>
    </form>
)

export default SearchForm;