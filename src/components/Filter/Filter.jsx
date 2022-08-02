import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from 'components/Filter/Filter.module.css';

const inputFilterId = nanoid();

export const Filter = ({ filter, handleFilterChange }) => {
  return (
    <label htmlFor={inputFilterId}>
      <p className={css.title}>Find contacts by name</p>
      <input
        id={inputFilterId}
        value={filter}
        onChange={handleFilterChange}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
    </label>
  );
};
Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};
