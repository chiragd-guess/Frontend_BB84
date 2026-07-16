export default function ChatWindow({ title, messages, emptyText = "No messages yet" }) {
  return (
    <div className="chat-window">
      <p>{title}</p>
      <div className="chat-window__messages">
        {messages.length === 0 ? (
          <p className="chat-window__empty">{emptyText}</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-window__bubble chat-window__bubble--${msg.sender === "Alice" ? "alice" : "bob"}`}
            >
              <p>{msg.sender} — {msg.time}</p>
              <p>{msg.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}