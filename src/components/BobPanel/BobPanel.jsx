import { useState } from "react";
import ChatWindow from "../ChatWindow/ChatWindow";

const TOTAL_STAGES = 8;
const STAGE_DELAY_MS = 600;

function timestamp() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function runBB84(setSimulation, messageText) {
  let stage = 1;
  const interval = setInterval(() => {
    setSimulation((s) => ({ ...s, protocol: { stage } }));
    stage++;
    if (stage > TOTAL_STAGES) {
      clearInterval(interval);
      setSimulation((s) => ({
        ...s,
        status: "completed",
        protocol: { stage: TOTAL_STAGES },
        bob: {
          ...s.bob,
          encryptedMessage: "110010101011001010101001",
          decryptedMessage: messageText,
        },
        analytics: {
          qber: s.channel.eve ? 25.0 : parseFloat((Math.random() * 3 + 1).toFixed(2)),
          photonsSent: 512,
          keyLength: 256,
        },
        session: {
          id: `QKD-${Date.now().toString().slice(-4)}`,
          secure: !s.channel.eve,
          duration: "1.3 s",
        },
        messages: [
          ...s.messages,
          {
            id: Date.now(),
            sender: "Bob",
            time: timestamp(),
            text: messageText,
          },
        ],
        bob_composer: "",
      }));
    }
  }, STAGE_DELAY_MS);
}

export default function BobPanel({ simulation, setSimulation }) {
  const [showTechnical, setShowTechnical] = useState(false);
  const reply = simulation.bob_composer || "";
  const keyEstablished = simulation.status === "completed";
  const isRunning = simulation.status === "running";

  const handleChange = (e) => {
    setSimulation((prev) => ({ ...prev, bob_composer: e.target.value }));
  };

  const handleSend = () => {
    if (!reply.trim()) return;

    if (!keyEstablished) {
      setSimulation((prev) => ({
        ...prev,
        status: "running",
        protocol: { stage: 0 },
        bob_composer: reply,
      }));
      runBB84(setSimulation, reply);
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="bob-panel">
      <p>Bob (Receiver) — [Status: Online]</p>

      <ChatWindow
        title="Bob Chat"
        messages={simulation.messages}
        emptyText="Waiting for a message..."
      />

      <div className="message-composer">
        <label htmlFor="bob-input">
          {keyEstablished ? "Reply to Alice" : "Start Secure Conversation"}
        </label>
        <textarea
          id="bob-input"
          placeholder={
            keyEstablished
              ? "Type your reply..."
              : "Type a message to initiate BB84 key exchange..."
          }
          rows={4}
          maxLength={500}
          value={reply}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isRunning}
        />
        <p>{reply.length} / 500</p>
        <button
          onClick={handleSend}
          disabled={!reply.trim() || isRunning}
        >
          {isRunning
            ? "Transmitting..."
            : keyEstablished
            ? "Send Reply"
            : "Send Message"}
        </button>
      </div>

      {simulation.messages.length > 0 && (
        <div className="bob-panel__technical">
          <button
            className="bob-panel__technical-toggle"
            onClick={() => setShowTechnical((v) => !v)}
          >
            {showTechnical ? "▲ Hide" : "▼ Show"} Technical Details
          </button>
          {showTechnical && (
            <div className="bob-panel__technical-content">
              <div className="bob-panel__technical-row">
                <span>Last Encrypted</span>
                <code>{simulation.bob.encryptedMessage}</code>
              </div>
              <div className="bob-panel__technical-row">
                <span>Last Message</span>
                <code>{simulation.messages[simulation.messages.length - 1]?.text}</code>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}