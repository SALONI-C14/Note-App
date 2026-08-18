import { useRef, useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import NoteForm from './components/NoteForm'
import NotesGrid from './components/NotesGrid'
import EmptyState from './components/EmptyState'
import ConfirmDialog from './components/ConfirmDialog'
import { useNotes } from './hooks/useNotes'
import styles from './App.module.css'
const App = () => {
  const composerRef = useRef(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingNote, setEditingNote] = useState(null)
  const [noteToDelete, setNoteToDelete] = useState(null)
  const [showClearDialog, setShowClearDialog] = useState(false)
  const { notes, theme, setTheme, addNote, updateNote, deleteNote, togglePin, toggleFavorite, copyNote, clearNotes } = useNotes()
  const normalizedSearch = searchTerm.trim().toLowerCase()
  const filteredNotes = notes.filter((note) => (note.title + ' ' + note.content).toLowerCase().includes(normalizedSearch))
  const handleSave = (noteDetails) => { if (editingNote) { updateNote(editingNote.id, noteDetails); setEditingNote(null); return }; addNote(noteDetails) }
  const beginEditing = (note) => { setEditingNote(note); composerRef.current?.focus() }
  const confirmDelete = () => { if (noteToDelete) deleteNote(noteToDelete.id); setNoteToDelete(null) }
  const confirmClear = () => { clearNotes(); setShowClearDialog(false) }
  return <main className={styles.app} data-theme={theme}>
    <Header noteCount={notes.length} theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} onCompose={() => composerRef.current?.focus()} onClear={() => setShowClearDialog(true)} canClear={notes.length > 0} />
    <div className={styles.dashboard}><aside className={styles.sidebar}>
      <div className={styles.sidebarIntro}><span>YOUR SPACE</span><h1>Keep the good<br />ideas close.</h1><p>A quiet place to collect every thought, task, and spark of inspiration.</p></div>
      <div className={styles.stats}>
        <div className={styles.statCard}><span className={styles.statIcon}>✦</span><div><strong>{notes.filter((note) => note.isPinned).length}</strong><span>Pinned notes</span></div></div>
        <div className={styles.statCard + ' ' + styles.favoriteStat}><span className={styles.statIcon}>♡</span><div><strong>{notes.filter((note) => note.isFavorite).length}</strong><span>Favorites</span></div></div>
      </div>
      <NoteForm ref={composerRef} editingNote={editingNote} onSave={handleSave} onCancel={() => setEditingNote(null)} />
    </aside><section className={styles.content} aria-label="Notes workspace">
      <div className={styles.contentTop}><div><p className={styles.eyebrow}>MY COLLECTION</p><h2>{normalizedSearch ? 'Search results' : 'All notes'}</h2></div><SearchBar value={searchTerm} onChange={setSearchTerm} /></div>
      {filteredNotes.length > 0 ? <NotesGrid notes={filteredNotes} searchTerm={normalizedSearch} onEdit={beginEditing} onDelete={setNoteToDelete} onTogglePin={togglePin} onToggleFavorite={toggleFavorite} onCopy={copyNote} /> : <EmptyState isSearching={Boolean(normalizedSearch)} onCompose={() => composerRef.current?.focus()} />}
    </section></div>
    <button className={styles.fab} type="button" onClick={() => composerRef.current?.focus()} aria-label="Create a new note"><span>+</span><span className={styles.fabLabel}>New note</span></button>
    <ConfirmDialog isOpen={Boolean(noteToDelete)} title="Delete this note?" message="This note will be permanently removed from your collection." confirmLabel="Delete note" onConfirm={confirmDelete} onCancel={() => setNoteToDelete(null)} />
    <ConfirmDialog isOpen={showClearDialog} title="Clear all notes?" message="Every saved note will be permanently removed. This cannot be undone." confirmLabel="Clear all" onConfirm={confirmClear} onCancel={() => setShowClearDialog(false)} />
  </main>
}
export default App
