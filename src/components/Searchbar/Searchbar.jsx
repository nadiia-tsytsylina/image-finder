import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { TbPhotoSearch } from 'react-icons/tb';
import css from './Searchbar.module.css';
import 'react-toastify/dist/ReactToastify.css';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      toast.error('Please input tag for searching images');
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={handleChange}
          className={css.SearchFormInput}
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />

        <button type="submit" className={css.SearchFormButton}>
          <TbPhotoSearch className={css.Icon}></TbPhotoSearch>
        </button>
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
