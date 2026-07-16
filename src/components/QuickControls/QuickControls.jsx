export default function QuickControls({
  noiseLevel,
  setNoiseLevel,
  eveEnabled,
  setEveEnabled,
  onRun,
}) {
  return (
    <div className="quick-controls">
      <p>Quick Controls</p>
      <div className="quick-controls__row">
        <label htmlFor="noise-slider">Noise Level</label>
        <input
          id="noise-slider"
          type="range"
          min="0"
          max="20"
          value={noiseLevel}
          onChange={(e) => setNoiseLevel(Number(e.target.value))}
        />
        <span>{noiseLevel}%</span>
      </div>
      <div className="quick-controls__row">
        <label htmlFor="eve-toggle">Eve Interference</label>
        <input
          id="eve-toggle"
          type="checkbox"
          checked={eveEnabled}
          onChange={(e) => setEveEnabled(e.target.checked)}
        />
        <span>{eveEnabled ? "ON" : "OFF"}</span>
      </div>
      <button onClick={onRun}>Run Simulation</button>
    </div>
  );
}