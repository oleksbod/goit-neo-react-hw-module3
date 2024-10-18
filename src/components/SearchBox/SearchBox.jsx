import css from './SearchBox.module.css';

function SearchBox({ value, onFilter }) {
  return (
    <div className={css.container}>
      <p className={css.label}>Find contacts by name</p>

      <input
        className={css.search}
        type="text"
        value={value}
        onChange={(e) => onFilter(e.target.value)}
      />
    </div>
  );
}

export default SearchBox;
