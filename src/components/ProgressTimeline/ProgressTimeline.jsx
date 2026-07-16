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


export default function ProgressTimeline({
  currentStage = 0,
  failed = false
}) {


  return (

    <ol className="progress-timeline">


      {
        steps.map((step)=>{


          const completed =
          step.id < currentStage;


          const active =
          step.id === currentStage;



          const failedStep =
failed && step.id >= 5;



          return (

            <li

            key={step.id}

            className={`
              progress-timeline__step
              ${completed ? "completed" : ""}
              ${active ? "active" : ""}
              ${failedStep ? "failed" : ""}
            `}

            >


              <p>

              {
                failedStep

                ?

                "✕"

                :

                completed

                ?

                "✓"

                :

                active

                ?

                "●"

                :

                "○"
              }

              </p>



              <p>
                {step.id}. {step.title}
              </p>



              <p>

              {
                failedStep

                ?

                "Aborted"

                :

                completed

                ?

                "Completed"

                :

                active

                ?

                "Running"

                :

                "Waiting"

              }

              </p>



            </li>

          );


        })

      }


    </ol>

  );

}