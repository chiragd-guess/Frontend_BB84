export default function StatusCard({ label, value }) {
    return (
      <div className="status-card">
        <p className="status-card__label">{label}</p>
        <p className="status-card__value">{value}</p>
      </div>
    );
  }