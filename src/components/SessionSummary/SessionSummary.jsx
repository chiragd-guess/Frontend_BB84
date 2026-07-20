export default function SessionSummary({ simulation }) {
  const api = simulation.apiResult;

  const summary = [
    {
      label: "Start Time",
      value: simulation.session?.startTime ?? "--:--:--",
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
      value:
      simulation.status === "aborted"
      ? "EVE INTERFERED"
      : simulation.status
    },
    {
      label: "Session ID",
      value: simulation.session?.id || "---"
    },
    {
      label: "Photons Sent",
      value: api ? api.statistics.photons_sent : "---",
    },
    {
      label: "Photons Received",
      value: api ? api.statistics.photons_received : "---",
    },
    {
      label: "Photons Lost",
      value: api ? api.statistics.photons_lost : "---",
    },
    {
      label: "Matching Bases",
      value: api ? api.statistics.matching_bases : "---",
    },
    {
      label: "QBER",
      value: api ? `${api.statistics.qber}%` : "---",
    },
    {
      label: "Final Key Length",
      value: api ? `${api.statistics.final_key_length} bits` : "---",
    },
    {
      label: "Eve Intercepted",
      value: api
        ? api.analytics.eve.intercepted_photons
        : "---",
    },
    {
      label: "Eve Passed Through",
      value: api
        ? api.analytics.eve.pass_through_photons
        : "---",
    },
    {
      label: "Errors Reconciled",
      value: api ? api.statistics.errors_corrected : "---",
    },
  ];

  return (
    <div className="session-summary">
      <p>Session Summary</p>

      {summary.map((row) => (
        <div key={row.label} className="session-summary__row">
          <span>{row.label}</span>
          <span>{row.value}</span>
        </div>
      ))}
    </div>
  );
}