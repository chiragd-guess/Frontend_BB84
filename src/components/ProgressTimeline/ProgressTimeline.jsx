const steps = [
    { id: 1, title: "Message Prepared", subtitle: "Placeholder status" },
    { id: 2, title: "Establishing Quantum Key (BB84)", subtitle: "Placeholder status" },
    { id: 3, title: "Verifying Key Security", subtitle: "Placeholder status" },
    { id: 4, title: "Encrypting Message", subtitle: "Placeholder status" },
    { id: 5, title: "Sending Message", subtitle: "Placeholder status" },
    { id: 6, title: "Delivered & Decrypted", subtitle: "Placeholder status" },
  ];
  
  export default function ProgressTimeline() {
    return (
      <section className="progress-timeline">
        <p>Section: Secure Transmission Progress</p>
  
        <ol>
          {steps.map((step) => (
            <li key={step.id} className="progress-timeline__step">
              <p>[Icon]</p>
              <div>
                <p>{step.title}</p>
                <p>{step.subtitle}</p>
              </div>
              <p>[Status Indicator]</p>
            </li>
          ))}
        </ol>
      </section>
    );
  }