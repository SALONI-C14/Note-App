import styles from '../App.module.css'

const SearchBar = ({ value, onChange }) => (
  <label className={styles.searchBar}>
    <span aria-hidden="true">⌕</span>
    <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search your notes..." aria-label="Search notes" />
    {value && <button type="button" onClick={() => onChange('')} aria-label="Clear search">×</button>}
  </label>
)

export default SearchBar
