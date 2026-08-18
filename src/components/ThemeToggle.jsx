import styles from '../App.module.css'

const ThemeToggle = ({ theme, onToggle }) => (
  <button className={styles.themeToggle} type="button" onClick={onToggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
    <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
  </button>
)

export default ThemeToggle
