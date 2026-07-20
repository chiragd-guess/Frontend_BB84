import { useState } from "react";
import { Outlet } from "react-router-dom";

import TopBar from "../components/TopBar/TopBar";
import Navbar from "../components/Navbar/Navbar";
import QuickControls from "../components/QuickControls/QuickControls";

import { createInitialSimulation } from "../data/initialstate";

import { runSimulation } from "../services/simulationService";

import {
  updateNoise,
  updateEve,
  resetSimulation,
} from "../services/simulationControls";


export default function MainLayout() {

  const [simulation, setSimulation] = useState(
    createInitialSimulation()
  );


  const setNoiseLevel = (value) => {
    updateNoise(setSimulation, value);
  };


  const setEveEnabled = (value) => {
    updateEve(setSimulation, value);
  };


  const handleReset = () => {
    resetSimulation(setSimulation);
  };


  const handleRun = () => {

    if(simulation.status === "running")
      return;

    runSimulation(setSimulation);

  };


  return (

    <div className="app-shell">


      <TopBar
        simulation={simulation}
        onReset={handleReset}
      />


      <div className="body">


        <aside className="sidebar">


          <Navbar />


          <QuickControls

            noiseLevel={simulation.channel.noise}

            eveEnabled={simulation.channel.eve}

            onNoiseChange={setNoiseLevel}

            onEveChange={setEveEnabled}

            onRun={handleRun}

          />


        </aside>



        <main className="main-content">


          <Outlet
            context={{
              simulation,
              setSimulation
            }}
          />


        </main>


      </div>



      <footer className="footer-disclaimer">

        <p>
          Educational simulation only. Not for real cryptographic use.
        </p>

      </footer>


    </div>

  );

}