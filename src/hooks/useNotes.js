import { useCallback, useEffect, useState } from 'react'

const NOTES_KEY = 'noteflow-notes'
const THEME_KEY = 'noteflow-theme'

const getStoredValue = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

const makeId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`

export const useNotes = () => {
  const [notes, setNotes] = useState(() => getStoredValue(NOTES_KEY, []))
  const [theme, setTheme] = useState(() => getStoredValue(THEME_KEY, 'dark'))

  useEffect(() => { localStorage.setItem(NOTES_KEY, JSON.stringify(notes)) }, [notes])
  useEffect(() => { localStorage.setItem(THEME_KEY, JSON.stringify(theme)) }, [theme])

  const addNote = useCallback(({ title, content }) => {
    const now = new Date().toISOString()
    setNotes((current) => [{ id: makeId(), title, content, createdAt: now, updatedAt: now, isPinned: false, isFavorite: false }, ...current])
  }, [])

  const updateNote = useCallback((id, details) => {
    setNotes((current) => current.map((note) => note.id === id ? { ...note, ...details, updatedAt: new Date().toISOString() } : note))
  }, [])

  const deleteNote = useCallback((id) => setNotes((current) => current.filter((note) => note.id !== id)), [])
  const togglePin = useCallback((id) => setNotes((current) => current.map((note) => note.id === id ? { ...note, isPinned: !note.isPinned } : note)), [])
  const toggleFavorite = useCallback((id) => setNotes((current) => current.map((note) => note.id === id ? { ...note, isFavorite: !note.isFavorite } : note)), [])
  const copyNote = useCallback((id) => setNotes((current) => {
    const original = current.find((note) => note.id === id)
    if (!original) return current
    const now = new Date().toISOString()
    return [{ ...original, id: makeId(), title: `${original.title} (Copy)`, createdAt: now, updatedAt: now, isPinned: false }, ...current]
  }), [])
  const clearNotes = useCallback(() => setNotes([]), [])

  return { notes, theme, setTheme, addNote, updateNote, deleteNote, togglePin, toggleFavorite, copyNote, clearNotes }
}
