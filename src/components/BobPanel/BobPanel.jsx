import { useState } from "react";
import ChatWindow from "../ChatWindow/ChatWindow";

const TOTAL_STAGES = 8;
const STAGE_DELAY_MS = 600;
const ABORT_THRESHOLD = 11;


function timestamp() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}


function createAbortMessage(qber) {
  return {
    id: Date.now(),
    type: "system",
    text:
`⚠ BB84 Protocol Aborted

High QBER detected (${qber}%).

Possible eavesdropping detected.

Shared key discarded.

Message was NOT transmitted.`,
  };
}



function runBB84(setSimulation, messageText) {

  let stage = 1;

  const interval = setInterval(() => {


    setSimulation((s) => ({
      ...s,
      protocol: {
        stage,
      },
    }));


    // After QBER estimation
    if (stage === 5) {

      setTimeout(() => {

        setSimulation((s) => {

          const qber = s.channel.eve ? 25 : 2.23;


          if (qber > ABORT_THRESHOLD) {


            clearInterval(interval);


            return {

              ...s,

              status:"aborted",

              protocol:{
                stage:5,
              },


              analytics:{
                qber,

                photonsSent:512,

                keyLength:0,
              },


              session:{
                ...s.session,

                secure:false,
              },


              messages:[
                ...s.messages,

                createAbortMessage(qber),
              ],


              bob_composer:"",

            };

          }


          return s;

        });


      }, 100);


    }



    stage++;



    // Continue only if secure
    if (stage > TOTAL_STAGES) {


      clearInterval(interval);



      setSimulation((s)=>({


        ...s,


        status:"completed",


        protocol:{
          stage:TOTAL_STAGES,
        },


        bob:{

          ...s.bob,

          encryptedMessage:
          "110010101011001010101001",

          decryptedMessage:
          messageText,

        },


        analytics:{

          qber:s.channel.eve ? 25 : 2.23,

          photonsSent:512,

          keyLength:256,

        },


        messages:[

          ...s.messages,

          {

            id:Date.now(),

            sender:"Bob",

            time:timestamp(),

            text:messageText,

          }

        ],


        bob_composer:"",


      }));

    }


  }, STAGE_DELAY_MS);

}




export default function BobPanel({
  simulation,
  setSimulation,
}) {


  const [showTechnical, setShowTechnical] =
    useState(false);


  const reply =
    simulation.bob_composer || "";


  const keyEstablished =
    simulation.status === "completed";


  const isRunning =
    simulation.status === "running";


  const isAborted =
    simulation.status === "aborted";



  const handleChange = (e) => {

    setSimulation((prev) => ({
      ...prev,

      bob_composer: e.target.value,
    }));

  };



  const handleSend = () => {

    if (!reply.trim()) return;



    if (!keyEstablished) {


      setSimulation((prev) => ({

        ...prev,

        status: "running",

        protocol: {
          stage: 0,
        },

        initiator: "Bob",

        bob_composer: reply,

      }));


      runBB84(
        setSimulation,
        reply
      );


    } else {


      setSimulation((prev) => ({

        ...prev,

        messages: [

          ...prev.messages,

          {
            id: Date.now(),

            sender: "Bob",

            time: timestamp(),

            text: reply,
          },

        ],


        bob_composer: "",

      }));

    }

  };



  return (

<section className="bob-panel">


<p>
Bob
</p>



<ChatWindow

title="Bob"

messages={simulation.messages}

emptyText="Start a secure conversation..."

/>




<div className="message-composer">


<label>

{
isAborted
?
"Message Blocked"

:

keyEstablished
?
"Message Alice"

:
"Start Secure Conversation"

}

</label>




<textarea

rows={4}

value={reply}

onChange={handleChange}

disabled={isRunning || isAborted}

placeholder={
isAborted
?
"Eve interference detected. Disable Eve and retry."
:
"Type message..."
}

/>



<p>
{reply.length}/500
</p>




<button

onClick={handleSend}

disabled={
!reply.trim()
||
isRunning
||
isAborted
}

>

{
isRunning
?
"Transmitting..."
:
"Send Message"
}

</button>


</div>





{
simulation.messages.length > 0 && (

<div className="bob-panel__technical">


<button

className="bob-panel__technical-toggle"

onClick={() =>
setShowTechnical((v)=>!v)
}

>

{
showTechnical
?
"▲ Hide Technical Details"
:
"▼ Show Technical Details"
}

</button>




{
showTechnical && (

<div className="bob-panel__technical-content">


<div className="bob-panel__technical-row">

<span>
Last Encrypted
</span>


<code>
{simulation.bob.encryptedMessage}
</code>


</div>




<div className="bob-panel__technical-row">

<span>
Last Message
</span>


<code>
{
simulation.messages[
simulation.messages.length - 1
]?.text
}
</code>


</div>


</div>

)

}


</div>

)

}


</section>

  );

}