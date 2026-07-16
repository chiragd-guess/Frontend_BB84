import MessageComposer from "../MessageComposer/MessageComposer";
import ChatWindow from "../ChatWindow/ChatWindow";

export default function AlicePanel({ simulation, setSimulation }) {
  return (
    <section className="alice-panel">
      <p>Alice (Sender) — [Status: Online]</p>
      <MessageComposer
        simulation={simulation}
        setSimulation={setSimulation}
      />
      <ChatWindow
        title="Alice Chat"
        messages={simulation.messages}
        emptyText="No messages yet"
      />
    </section>
  );
}