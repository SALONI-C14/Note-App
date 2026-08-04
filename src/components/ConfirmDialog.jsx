import { useEffect, useRef } from 'react'
import styles from '../App.module.css'

const ConfirmDialog = ({ isOpen, title, message, confirmLabel, onConfirm, onCancel }) => {
  const cancelRef = useRef(null)
  useEffect(() => { if (isOpen) cancelRef.current?.focus() }, [isOpen])
  useEffect(() => {
    const dismiss = (event) => { if (event.key === 'Escape') onCancel() }
    if (isOpen) window.addEventListener('keydown', dismiss)
    return () => window.removeEventListener('keydown', dismiss)
  }, [isOpen, onCancel])
  if (!isOpen) return null
  return <div className={styles.dialogBackdrop} role="presentation" onMouseDown={onCancel}>
    <section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="dialog-title" onMouseDown={(event) => event.stopPropagation()}>
      <span className={styles.dialogIcon}>!</span><h2 id="dialog-title">{title}</h2><p>{message}</p>
      <div><button ref={cancelRef} type="button" onClick={onCancel}>Cancel</button><button className={styles.dangerButton} type="button" onClick={onConfirm}>{confirmLabel}</button></div>
    </section>
  </div>
}

export default ConfirmDialog
