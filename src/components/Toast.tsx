interface ToastProps {
  message: string
  type: string
}

export default function Toast({ message, type }: ToastProps) {
  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-icon">{type === 'success' ? '💰' : '🔔'}</span>
      <span className="toast-message">{message}</span>
    </div>
  )
}
