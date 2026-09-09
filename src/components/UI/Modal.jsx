import './Modal.css';

export default function Modal({ open, title, onClose, children }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>x</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
