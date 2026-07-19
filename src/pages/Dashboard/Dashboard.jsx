import { useOutletContext } from "react-router-dom";

import AlicePanel from "../../components/AlicePanel/AlicePanel";
import QuantumChannelPanel from "../../components/QuantumChannelPanel/QuantumChannelPanel";
import BobPanel from "../../components/BobPanel/BobPanel";

import StatusCard from "../../components/StatusCard/StatusCard";
import AnalyticsChart from "../../components/AnalyticsChart/AnalyticsChart";
import SessionSummary from "../../components/SessionSummary/SessionSummary";


export default function Dashboard() {


  const { simulation, setSimulation } = useOutletContext();



  return (

    <>

      {/* =========================
          BB84 MAIN VISUALIZATION
      ========================== */}

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





      {/* =========================
          ANALYTICS SECTION
      ========================== */}


      <div className="bottom-row">



        <div className="quantum-statistics">


          <p>
            Quantum Statistics
          </p>



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


          <p>
            Photon Transmission Overview
          </p>



          <AnalyticsChart

            simulation={simulation}

          />


        </div>







        <SessionSummary

          simulation={simulation}

        />



      </div>



    </>

  );

}