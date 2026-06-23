import { memo } from 'react';
import InputWithLabel from './InputWithLabel';
import { StyledButtonLarge, StyledSearchForm } from './Styles';

const SearchForm = ({
    searchTerm,
    onSearchInput,
    searchAction,
}) => (
    <StyledSearchForm action={searchAction}>
        <InputWithLabel
            id="search"
            value={searchTerm}
            isFocused
            onInputChange={onSearchInput}
        >
            <strong>Search:</strong>
        </InputWithLabel>

        <StyledButtonLarge
            type='submit'
            disabled={!searchTerm}
        >
            Submit
        </StyledButtonLarge>
    </StyledSearchForm>
)

export default memo(SearchForm);