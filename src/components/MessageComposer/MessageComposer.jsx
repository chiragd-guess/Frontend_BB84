export default function MessageComposer() {
    return (
      <section className="message-composer">
        <p>Section: Message Composer</p>
  
        <div className="message-composer__field">
          <label>To</label>
          <p>[Recipient Select Placeholder]</p>
        </div>
  
        <div className="message-composer__field">
          <label>Message</label>
          <textarea placeholder="Message text area placeholder" rows={6} />
          <p>0 / 2000</p>
        </div>
  
        <div className="message-composer__simulation-controls">
          <p>Section: Simulation Controls</p>
  
          <div className="message-composer__control">
            <label>Noise Level</label>
            <p>[Noise Level Placeholder — e.g. slider 0-100%]</p>
          </div>
  
          <div className="message-composer__control">
            <label>Eve Interference</label>
            <p>[Toggle Placeholder — On / Off]</p>
          </div>
        </div>
  
        <p>[Encryption disclaimer placeholder]</p>
  
        <button>Send Securely</button>
      </section>
    );
  }