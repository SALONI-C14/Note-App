import { memo } from 'react'
import styles from '../App.module.css'

const formatDate = (value) => new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))

const Highlight = ({ text, term }) => {
  if (!term) return text
  const pieces = text.split(new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'))
  return pieces.map((piece, index) => piece.toLowerCase() === term.toLowerCase() ? <mark key={index}>{piece}</mark> : piece)
}

const NoteCard = memo(({ note, searchTerm, onEdit, onDelete, onTogglePin, onToggleFavorite, onCopy }) => (
  <article className={`${styles.noteCard} ${note.isPinned ? styles.pinnedCard : ''}`}>
    <div className={styles.cardTopline}>
      {note.isPinned ? <span className={styles.pinBadge}>⌖ Pinned</span> : <span />}
      <button className={`${styles.iconButton} ${note.isFavorite ? styles.favoriteActive : ''}`} type="button" onClick={() => onToggleFavorite(note.id)} aria-label={note.isFavorite ? 'Remove from favorites' : 'Add to favorites'}>{note.isFavorite ? '♥' : '♡'}</button>
    </div>
    <h3><Highlight text={note.title} term={searchTerm} /></h3>
    <p className={styles.noteContent}><Highlight text={note.content || 'No additional details'} term={searchTerm} /></p>
    <div className={styles.dates}><span>Created {formatDate(note.createdAt)}</span>{note.updatedAt !== note.createdAt && <span>Edited {formatDate(note.updatedAt)}</span>}</div>
    <div className={styles.cardActions}>
      <button type="button" onClick={() => onTogglePin(note.id)} aria-label={note.isPinned ? 'Unpin note' : 'Pin note'}>{note.isPinned ? 'Unpin' : 'Pin'}</button>
      <button type="button" onClick={() => onCopy(note.id)}>Copy</button>
      <button type="button" onClick={() => onEdit(note)}>Edit</button>
      <button className={styles.deleteAction} type="button" onClick={() => onDelete(note)}>Delete</button>
    </div>
  </article>
))

NoteCard.displayName = 'NoteCard'
export default NoteCard
