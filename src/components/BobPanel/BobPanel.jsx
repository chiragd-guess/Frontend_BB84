import { useState } from "react";

import ChatWindow from "../ChatWindow/ChatWindow";

import { runSimulation } from "../../services/simulationService";
import { encryptMessage } from "../../services/api";


export default function BobPanel({ simulation, setSimulation }) {

  const [showTechnical, setShowTechnical] = useState(false);


  const message = simulation.bob?.message || "";


  const keyEstablished =
    simulation.status === "completed" &&
    Boolean(simulation.apiResult?.keys?.final_key);


  const isRunning =
    simulation.status === "running";


  const isAborted =
    simulation.status === "aborted";



  const handleChange = (e) => {

    const value = e.target.value;


    setSimulation((prev)=>({

      ...prev,

      initiator:"Bob",

      bob:{
        ...prev.bob,
        message:value
      }

    }));

  };





  const sendMessage = async()=>{


    if(!message.trim()) return;



    /*
      BB84 already completed

      Only encrypt message
    */

    if(keyEstablished){


      try{


        const encryptedResult =
          await encryptMessage(
            message,
            simulation.apiResult.keys.final_key
          );



        setSimulation((prev)=>({


          ...prev,


          messages:[

            ...prev.messages,

            {

              id:Date.now(),

              sender:"Bob",

              time:new Date().toLocaleTimeString([],{

                hour:"2-digit",
                minute:"2-digit"

              }),

              text:message

            }

          ],



          bob:{

            ...prev.bob,

            message:"",

            encryptedMessage:
              encryptedResult.ciphertext,

            decryptedMessage:
              encryptedResult.decrypted

          }


        }));


      }

      catch(error){

        console.error(
          "Encryption failed:",
          error
        );

      }


      return;

    }





    /*
      First message

      Start BB84
    */


    setSimulation((prev)=>({

      ...prev,

      initiator:"Bob"

    }));



    runSimulation(

      setSimulation,

      message,

      "Bob"

    );


  };





  const handleKeyDown=(e)=>{

    if(
      e.key==="Enter" &&
      !e.shiftKey
    ){

      e.preventDefault();

      sendMessage();

    }

  };





  return (

<section className="bob-panel">



<div className="chat-header">


<div className="chat-user">


<div className="chat-avatar">
👨
</div>


<div className="chat-user-info">

<h3>
Bob
</h3>


<div className="chat-status">

<span className="chat-status-dot"></span>

Online

</div>


</div>


</div>



<div className="chat-security">

BB84 Secured

</div>


</div>





<ChatWindow

title=""

messages={simulation.messages}

emptyText="Waiting for secure quantum message..."

/>







<div className="message-composer">


<label>

{

keyEstablished

?

"Message Alice"

:

"Start Secure Conversation"

}

</label>





<textarea

rows={4}

maxLength={500}

value={message}

placeholder="Type a message..."

onChange={handleChange}

onKeyDown={handleKeyDown}

disabled={
  isRunning ||
  isAborted
}

/>



<p>

{message.length}/500

</p>





<button

onClick={sendMessage}

disabled={
  !message.trim() ||
  isRunning ||
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
simulation.messages.length > 0 &&

<div className="bob-panel__technical">


<button

onClick={()=>setShowTechnical(v=>!v)}

>

{

showTechnical

?

"Hide Technical Details"

:

"Show Technical Details"

}


</button>





{

showTechnical &&

<div>


<p>

Last Encrypted:

<code>

{

simulation.bob?.encryptedMessage || "N/A"

}

</code>

</p>





<p>

Last Message:

<code>

{

simulation.messages.at(-1)?.text || "N/A"

}

</code>

</p>



</div>

}



</div>

}




</section>

  );

}