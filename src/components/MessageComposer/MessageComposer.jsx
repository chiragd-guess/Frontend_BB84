import { runSimulation } from "../../services/simulationService";
import { encryptMessage } from "../../services/api";

const MAX_LENGTH = 500;

export default function MessageComposer({
  simulation,
  setSimulation,
  user = "Alice",
}) {

  const keyEstablished =
    simulation.status === "completed" &&
    simulation.apiResult?.keys?.final_key;


  const isRunning =
    simulation.status === "running";


  const isAborted =
    simulation.status === "aborted";


  const currentUser = user.toLowerCase();



  const handleChange = (e) => {

    setSimulation((prev)=>({

      ...prev,

      initiator:user,

      [currentUser]:{
        ...prev[currentUser],
        message:e.target.value
      }

    }));

  };



  const handleSend = async()=>{

    const message = simulation[currentUser].message;


    if(!message.trim()) return;



    // ==============================
    // Existing BB84 key
    // Encrypt only
    // ==============================

    if(keyEstablished){


      const encryptedResult = await encryptMessage(
        message,
        simulation.apiResult.keys.final_key
      );



      setSimulation((prev)=>({

        ...prev,
      
        messages:[
          ...prev.messages,
      
          {
            id:Date.now(),
      
            sender:user,
      
            time:new Date().toLocaleTimeString([],{
              hour:"2-digit",
              minute:"2-digit"
            }),
      
            text:message
          }
      
        ],
      
      
        [currentUser]:{
      
          ...prev[currentUser],
      
          message:"",
      
          encryptedMessage:
            encryptedResult.ciphertext,
      
          decryptedMessage:
            encryptedResult.decrypted
      
        }
      
      
      }));


      return;

    }



    // ==============================
    // First message
    // Run BB84 once
    // ==============================


    runSimulation(
      setSimulation,
      message,
      user
    );


  };




  return (

    <div className="message-composer">


      <label>

        {
        isAborted

        ? "Message Blocked"

        : keyEstablished

        ? `Message ${user==="Alice"?"Bob":"Alice"}`

        : "Start Secure Conversation"

        }

      </label>



      <textarea

        placeholder={

          isAborted

          ? "Eve detected. Disable Eve and retry."

          : "Type a message to initiate BB84 key exchange..."

        }


        rows={4}

        maxLength={MAX_LENGTH}


        value={
          simulation[currentUser].message
        }


        onChange={handleChange}


        disabled={
          isRunning || isAborted
        }


      />



      <p>

        {
        simulation[currentUser].message.length
        }

        {" / "}

        {MAX_LENGTH}

      </p>




      <button

        onClick={handleSend}

        disabled={
          !simulation[currentUser].message.trim() ||
          isRunning ||
          isAborted
        }

      >

        {
        isRunning

        ? "Transmitting..."

        : isAborted

        ? "Blocked"

        : "Send Message"

        }


      </button>


    </div>

  );

}