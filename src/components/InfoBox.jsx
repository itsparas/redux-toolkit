export default function InfoBox({ type = 'info', title, children }) {
  const icons = {
    info: 'ℹ️',
    warning: '⚠️',
    tip: '💡',
    success: '✅',
    error: '❌',
  };

  return (
    <div className={`info-box info-box--${type}`}>
      <div className="info-box__header">
        <span className="info-box__icon">{icons[type]}</span>
        <strong>{title}</strong>
      </div>
      <div className="info-box__content">{children}</div>
    </div>
  );
}
