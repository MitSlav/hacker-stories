import { ChangeEvent, memo } from 'react';
import InputWithLabel from './InputWithLabel';
import { StyledButtonLarge, StyledSearchForm } from './Styles.tsx';

type SearchFormProps = {
  searchTerm: string;
  onSearchInput: (event: ChangeEvent<HTMLInputElement>) => void;
  searchAction: (formData: FormData) => void;
};

const SearchForm = ({
  searchTerm,
  onSearchInput,
  searchAction,
}: SearchFormProps) => (
  <StyledSearchForm action={searchAction}>
    <InputWithLabel
      id="search"
      value={searchTerm}
      isFocused
      onInputChange={onSearchInput}
    >
      <strong>Search:</strong>
    </InputWithLabel>

    <StyledButtonLarge type="submit" disabled={!searchTerm}>
      Submit
    </StyledButtonLarge>
  </StyledSearchForm>
);

export default memo(SearchForm);
