import styles from '../App.module.css'

const EmptyState = ({ isSearching, onCompose }) => <div className={styles.emptyState}>
  <div className={styles.emptyIllustration}><span>✦</span><div className={styles.paper}>⌁</div><i /></div>
  <h3>{isSearching ? 'No notes found' : 'Your canvas is ready'}</h3>
  <p>{isSearching ? 'Try a different keyword or clear your search.' : 'Your next idea deserves a beautiful place to live.'}</p>
  {!isSearching && <button type="button" onClick={onCompose}>Create your first note <span>→</span></button>}
</div>

export default EmptyState
