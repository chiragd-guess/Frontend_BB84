import ThemeToggle from "../ui/ThemeToggle";


export default function QuickControls({

  noiseLevel,

  onNoiseChange,

  eveEnabled,

  onEveChange,

  onRun,

  setSimulation,

}) {



  const handleEveToggle = (e) => {


    const enabled = e.target.checked;



    onEveChange(enabled);



    // Recover if Eve is removed after abort
    if (!enabled && setSimulation) {


      setSimulation((prev) => {


        if (prev.status !== "aborted") {

          return prev;

        }



        return {


          ...prev,


          status: "idle",


          protocol: {

            stage: 0,

          },


          analytics: {

            qber: 0,

            photonsSent: 0,

            keyLength: 0,

          },


          session: {

            id: "---",

            secure: false,

            duration: "00:00",

          },


          abortReason: "",


        };


      });

    }


  };





  return (


    <div className="quick-controls">



      <p>
        Quick Controls
      </p>





      <div className="quick-controls__row">



        <label htmlFor="noise-slider">

          Noise

        </label>





        <input

          className="noise-slider"

          id="noise-slider"

          type="range"

          min="0"

          max="20"

          step="1"

          value={noiseLevel}

          onChange={(e)=>

            onNoiseChange(Number(e.target.value))

          }

        />





        <span>

          {noiseLevel}%

        </span>




      </div>







      <div className="quick-controls__row">



        <label htmlFor="eve-toggle">

          Eve

        </label>





        <input


          id="eve-toggle"


          type="checkbox"


          checked={eveEnabled}


          onChange={handleEveToggle}


        />





        <span>

          {eveEnabled ? "ON" : "OFF"}

        </span>




      </div>








      <button onClick={onRun}>

        Run Simulation

      </button>






      <ThemeToggle />



    </div>


  );

}