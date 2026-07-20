import { runSimulation as callSimulation } from "./api";

const STAGE_NAMES = [
  "Preparing Photons",
  "Sending Photons",
  "Receiver Measuring",
  "Basis Comparison",
  "QBER Estimation",
  "Shared Key Generation",
  "Message Encryption",
  "Ciphertext Transmission",
];

const TOTAL_STAGES = STAGE_NAMES.length;
const STAGE_DELAY_MS = 1800;

function timestamp() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function createAbortMessage(qber) {
  const fixedQber = Number(qber).toFixed(2);

  return {
    id: Date.now(),
    sender: "system",
    time: timestamp(),
    text: `⚠ BB84 Protocol Aborted — High QBER detected (QBER: ${fixedQber}%). Shared key discarded. Message was NOT transmitted.`,
  };
}

// letters × 8 bits × 3 safety margin, minimum 64
function calcPhotons(messageText) {
  if (!messageText || !messageText.trim()) return 1000;
  const bits = messageText.trim().length * 8;
  return Math.max(64, bits * 3);
}

export async function runSimulation(setSimulation, messageText = null, sender = null) {
  setSimulation((prev) => ({
    ...prev,
    status: "running",
    protocol: { stage: 0, current: "" },
  }));

  let apiResult;
  let noiseVal;
  let eveVal;

  // snapshot noise/eve then call API
  try {

    await new Promise((resolve, reject) => {

      setSimulation((prev) => {

        noiseVal = prev.channel.noise / 100;
        eveVal = prev.channel.eve;

        const num_photons = calcPhotons(messageText);


        callSimulation({

          noise: noiseVal,

          eve: eveVal,

          num_photons,

          message: messageText

        })

        .then((data) => {

          apiResult = data;

          resolve();

        })

        .catch(reject);


        return prev;

      });

    });


  } catch (err) {

    setSimulation((prev) => ({

      ...prev,

      status: "error",

      protocol: {
        stage: 0,
        current: "Backend unreachable — is uvicorn running?"
      }

    }));

    console.error("BB84 API error:", err);

    return;

  }

  // pull everything from real API response
  const qber            = apiResult.statistics.qber;
  console.log("FULL API RESULT:", apiResult);   
  console.log("========== QBER DEBUG ==========");
  console.log("Backend:", apiResult.statistics.qber);
  console.log("Local:", qber);
  console.log("==============================="); 
  console.log("BACKEND QBER:", apiResult.statistics.qber);
  console.log("FINAL KEY:", apiResult.statistics.final_key_length);
  console.log("FULL STATS:", apiResult.statistics);      // % e.g. 24.04
  const keyLength       = apiResult.statistics.final_key_length;
  const photonsSent     = apiResult.statistics.photons_sent;
  const secure          = apiResult.security.secure;
  const sessionId       = apiResult.session.session_id;
  const duration        = `${apiResult.session.duration} s`;
  const startTime       = apiResult.session.start_time;
  const ABORT_THRESHOLD = apiResult.security.threshold;       // e.g. 11
  const encryptedSnippet =
  apiResult.encryption?.ciphertext || "N/A";

  let stage   = 1;
  let aborted = false;

  const interval = setInterval(() => {
    if (aborted) return;

    setSimulation((prev) => ({
      ...prev,
      protocol: { stage, current: STAGE_NAMES[stage - 1] },
    }));

    if (stage === 5) {
      setTimeout(() => {
        if (qber > ABORT_THRESHOLD) {
          aborted = true;
          clearInterval(interval);
          setSimulation((prev) => ({
            ...prev,
            status: "aborted",
            protocol: { stage: 5, current: STAGE_NAMES[4] },
            analytics: {
              qber: apiResult.statistics.qber,
              photonsSent: apiResult.statistics.photons_sent,
              keyLength: apiResult.statistics.final_key_length
            },
            session: {
              ...prev.session,
              id: sessionId,
              secure: false,
              duration,
              startTime,
          },
            messages: [
              ...prev.messages,
              createAbortMessage(apiResult.statistics.qber)
            ],
            apiResult,
          }));
        }
      }, 100);
    }

    stage++;

    if (stage > TOTAL_STAGES) {
      clearInterval(interval);
      setSimulation((prev) => {
        if (prev.status === "aborted") return prev;

        const completed = {
          ...prev,
          status: "completed",
          protocol: { stage: TOTAL_STAGES + 1, current: "Completed" },
          analytics: { qber, photonsSent, keyLength },
          session: {
            id: sessionId,
            secure: false,
            duration,
            startTime,
          },
          apiResult,
        };

        if (messageText && sender) {
          return {
            ...completed,
            bob: {
              ...prev.bob,
              encryptedMessage: encryptedSnippet,
              decryptedMessage: messageText,
            },
            messages: [
              ...prev.messages,
              { id: Date.now(), sender, time: timestamp(), text: messageText },
            ],
          };
        }

        return completed;
      });
    }
  }, STAGE_DELAY_MS);
}