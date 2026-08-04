import ThemeToggle from './ThemeToggle'
import styles from '../App.module.css'

const Header = ({ noteCount, theme, onToggleTheme, onCompose, onClear, canClear }) => (
  <header className={styles.header}>
    <button className={styles.brand} type="button" onClick={onCompose} aria-label="Create a note">
      <span className={styles.logo}>N</span><span>noteflow</span>
    </button>
    <div className={styles.headerActions}>
      <span className={styles.noteCount}>{noteCount} {noteCount === 1 ? 'note' : 'notes'}</span>
      <button className={styles.clearButton} type="button" onClick={onClear} disabled={!canClear}>Clear all</button>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </div>
  </header>
)

export default Header
