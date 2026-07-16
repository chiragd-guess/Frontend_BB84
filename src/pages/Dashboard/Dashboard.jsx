import { useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import QuickControls from "../../components/QuickControls/QuickControls";
import AlicePanel from "../../components/AlicePanel/AlicePanel";
import QuantumChannelPanel from "../../components/QuantumChannelPanel/QuantumChannelPanel";
import BobPanel from "../../components/BobPanel/BobPanel";
import StatusCard from "../../components/StatusCard/StatusCard";
import AnalyticsChart from "../../components/AnalyticsChart/AnalyticsChart";
import SessionSummary from "../../components/SessionSummary/SessionSummary";
import { initialSimulation } from "../../data/mockData";

export default function Dashboard() {
  const [simulation, setSimulation] = useState(initialSimulation);

  const noiseLevel = simulation.channel.noise;
  const eveEnabled = simulation.channel.eve;

  const setNoiseLevel = (val) =>
    setSimulation((prev) => ({
      ...prev,
      channel: {
        ...prev.channel,
        noise: val,
      },
    }));

  const setEveEnabled = (val) =>
    setSimulation((prev) => ({
      ...prev,
      channel: {
        ...prev.channel,
        eve: val,
      },
    }));

  const handleReset = () => {
    setSimulation({
      ...initialSimulation,
      initiator: null,
    });
  };

  const handleRun = () => {
    setSimulation((prev) => ({
      ...prev,
      status: "running",
      protocol: {
        stage: 0,
      },
    }));
  };

  return (
    <div className="app-shell">

      <TopBar
        noiseLevel={noiseLevel}
        eveEnabled={eveEnabled}
        onReset={handleReset}
      />

      <div className="body">

        <aside className="sidebar">

          <Navbar />

          <QuickControls
  noiseLevel={noiseLevel}
  setNoiseLevel={setNoiseLevel}
  eveEnabled={eveEnabled}
  setEveEnabled={setEveEnabled}
  setSimulation={setSimulation}
  onRun={handleRun}
/>

        </aside>


        <main className="main-content">

          <div className="panels-row">

            <AlicePanel
              simulation={simulation}
              setSimulation={setSimulation}
            />


            <QuantumChannelPanel
              simulation={simulation}
              currentStage={simulation.protocol.stage}
            />


            <BobPanel
              simulation={simulation}
              setSimulation={setSimulation}
            />

          </div>


          <div className="bottom-row">

            <div className="quantum-statistics">

              <p>Quantum Statistics</p>

              <StatusCard
                label="QBER"
                value={`${simulation.analytics.qber}%`}
              />

              <StatusCard
                label="Key Length"
                value={`${simulation.analytics.keyLength} bits`}
              />

              <StatusCard
                label="Photons Sent"
                value={simulation.analytics.photonsSent}
              />

            </div>


            <div className="photon-chart">

              <p>Photon Transmission Overview</p>

              <AnalyticsChart simulation={simulation}/>

            </div>


            <SessionSummary simulation={simulation}/>

          </div>

        </main>

      </div>


      <footer className="footer-disclaimer">
        <p>[Disclaimer Placeholder]</p>
      </footer>

    </div>
  );
}