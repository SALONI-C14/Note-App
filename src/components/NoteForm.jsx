import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import styles from '../App.module.css'

const MAX_CHARACTERS = 500

const NoteForm = forwardRef(({ editingNote, onSave, onCancel }, ref) => {
  const titleRef = useRef(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    setTitle(editingNote?.title ?? '')
    setContent(editingNote?.content ?? '')
  }, [editingNote])

  useImperativeHandle(ref, () => ({ focus: () => titleRef.current?.focus() }))

  const submit = (event) => {
    event.preventDefault()
    if (!title.trim() && !content.trim()) return
    onSave({ title: title.trim() || 'Untitled note', content: content.trim() })
    setTitle('')
    setContent('')
  }

  const cancel = () => {
    setTitle('')
    setContent('')
    onCancel()
  }

  return <form className={styles.noteForm} onSubmit={submit}>
    <div className={styles.formHeading}><span>{editingNote ? 'EDITING NOTE' : 'QUICK CAPTURE'}</span><strong>{editingNote ? 'Refine your thought' : 'What’s on your mind?'}</strong></div>
    <label><span className={styles.srOnly}>Note title</span><input ref={titleRef} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="A memorable title" maxLength="80" /></label>
    <label><span className={styles.srOnly}>Note description</span><textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="Start writing something wonderful..." maxLength={MAX_CHARACTERS} rows="6" /></label>
    <div className={styles.formFooter}><span>{content.length}/{MAX_CHARACTERS}</span><div>{editingNote && <button className={styles.cancelButton} type="button" onClick={cancel}>Cancel</button>}<button className={styles.saveButton} type="submit">{editingNote ? 'Save changes' : 'Add note'} <span>→</span></button></div></div>
  </form>
})

NoteForm.displayName = 'NoteForm'
export default NoteForm
