import NoteCard from './NoteCard'
import styles from '../App.module.css'

const NotesGrid = ({ notes, ...actions }) => <div className={styles.notesGrid}>{notes.map((note) => <NoteCard key={note.id} note={note} {...actions} />)}</div>

export default NotesGrid
