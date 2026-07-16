export default function SessionSummary({ simulation }) {
  const summary = [
    {
      label: "Start Time",
      value: "--:--:--",
    },
    {
      label: "Duration",
      value: simulation.session.duration,
    },
    {
      label: "Noise Level",
      value: `${simulation.channel?.noise ?? 0}%`,
    },
    {
      label: "Eve Interference",
      value: simulation.channel?.eve ? "ON" : "OFF",
    },
    {
      label: "Status",
      value: simulation.session.secure
        ? "Secure"
        : "Waiting",
    },
    {
      label: "Session ID",
      value: simulation.session.id,
    },
  ];

  return (
    <div className="session-summary">
      <p>Session Summary</p>

      {summary.map((row) => (
        <div
          key={row.label}
          className="session-summary__row"
        >
          <span>{row.label}</span>
          <span>{row.value}</span>
        </div>
      ))}
    </div>
  );
}