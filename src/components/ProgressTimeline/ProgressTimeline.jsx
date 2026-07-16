const steps = [
  { id: 1, title: "Preparing Photons" },
  { id: 2, title: "Sending Photons" },
  { id: 3, title: "Receiver Measuring" },
  { id: 4, title: "Basis Comparison / Sifting" },
  { id: 5, title: "QBER Estimation" },
  { id: 6, title: "Shared Key Generation" },
  { id: 7, title: "Message Encryption" },
  { id: 8, title: "Ciphertext Transmission" },
];

export default function ProgressTimeline({ currentStage = 0 }) {
  return (
    <ol className="progress-timeline">
      {steps.map((step) => {
        const completed = step.id <= currentStage;
        const active = step.id === currentStage;
        return (
          <li
            key={step.id}
            className={`progress-timeline__step
              ${completed ? "completed" : ""}
              ${active ? "active" : ""}`}
          >
            <p>{completed ? "✓" : active ? "●" : "○"}</p>
            <p>{step.id}. {step.title}</p>
            <p>{completed ? "Completed" : active ? "Running" : "Waiting"}</p>
          </li>
        );
      })}
    </ol>
  );
}