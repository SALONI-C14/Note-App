import styles from '../App.module.css'

const EmptyState = ({ isSearching, onCompose }) => <div className={styles.emptyState}>
  <span className={styles.emptyRule} />
  <h3>{isSearching ? 'No notes found' : 'No notes yet'}</h3>
  <p>{isSearching ? 'Try a different keyword or clear your search.' : 'Capture your first idea and keep it here.'}</p>
  {!isSearching && <button type="button" onClick={onCompose}>+ Create note</button>}
</div>

export default EmptyState
