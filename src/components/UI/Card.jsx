import './Card.css';

export default function Card({ title, subtitle, children, className = '' }) {
  return (
    <div className={`ui-card ${className}`}>
      {(title || subtitle) && (
        <div className="ui-card-head">
          {title && <h3 className="ui-card-title">{title}</h3>}
          {subtitle && <p className="ui-card-subtitle">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
