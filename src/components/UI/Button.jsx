import './Button.css';

export default function Button({ children, variant = 'primary', onClick, type = 'button' }) {
  return (
    <button type={type} className={`ui-btn ui-btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}
