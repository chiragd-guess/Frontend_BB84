export default function StatusPill({ label, value }) {
    return (
      <div className="status-pill">
        <span>{label}:</span>
        <span>{value}</span>
      </div>
    );
  }