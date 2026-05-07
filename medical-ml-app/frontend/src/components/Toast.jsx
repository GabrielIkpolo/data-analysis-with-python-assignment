import './Toast.css'

function Toast({ message, type, onClose }) {
  if (!message) return null

  const bgColor = {
    success: 'var(--success)',
    error: 'var(--danger)',
    warning: 'var(--warning)',
  }[type] || 'var(--primary)'

  return (
    <div className="toast" style={{ backgroundColor: bgColor }}>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose}>
        ✕
      </button>
    </div>
  )
}

export default Toast
