import ProgressTimeline from "../ProgressTimeline/ProgressTimeline";
import KeyExchangeVisualizer from "../KeyExchangeVisualizer/KeyExchangeVisualizer";

export default function QuantumChannelPanel({ currentStage, simulation }) {
  const secure = simulation?.session?.secure;

  return (
    <section className="quantum-channel-panel">
      <p>Quantum Channel (BB84 Protocol)</p>

      <ProgressTimeline currentStage={currentStage} />
      <KeyExchangeVisualizer />

      <div className="quantum-channel-panel__banner">
        <p>
          {secure
            ? "✓ Quantum Key Established Successfully"
            : "Awaiting key exchange..."}
        </p>
      </div>
    </section>
  );
}