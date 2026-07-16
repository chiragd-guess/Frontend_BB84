import StatusPill from "../StatusPill/StatusPill";

export default function TopBar({ noiseLevel, eveEnabled, onReset }) {
  return (
    <header className="top-bar">
      <div className="top-bar__brand">
        <p>[Logo]</p>
        <div>
          <p>App Name</p>
          <p>App Subtitle</p>
        </div>
      </div>
      <div className="top-bar__pills">
        <StatusPill label="Noise Level" value={`${noiseLevel}%`} />
        <StatusPill label="Eve Interference" value={eveEnabled ? "ON" : "OFF"} />
      </div>
      <button onClick={onReset}>Reset Simulation</button>
    </header>
  );
}