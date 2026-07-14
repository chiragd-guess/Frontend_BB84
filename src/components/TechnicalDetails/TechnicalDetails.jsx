import StatusPill from "../StatusPill/StatusPill";
import StatusCard from "../StatusCard/StatusCard";
import KeyExchangeVisualizer from "../KeyExchangeVisualizer/KeyExchangeVisualizer";

const keyInfo = [
  { label: "Raw Key (Alice)", value: "placeholder" },
  { label: "Raw Key (Bob)", value: "placeholder" },
  { label: "Sifted Key", value: "placeholder" },
  { label: "Key Length", value: "placeholder" },
  { label: "QBER", value: "placeholder" },
  { label: "Security Status", value: "placeholder" },
];

export default function TechnicalDetails() {
  return (
    <section className="technical-details">
      <div className="technical-details__header">
        <p>Section: Live Key Exchange Details (BB84)</p>
        <StatusPill label="" value="Live" />
      </div>

      <KeyExchangeVisualizer />

      <div className="technical-details__key-info">
        {keyInfo.map((item) => (
          <StatusCard key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
    </section>
  );
}