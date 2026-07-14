const metadata = [
    { label: "Encryption", value: "placeholder" },
    { label: "Channel", value: "placeholder" },
    { label: "Key ID", value: "placeholder" },
  ];
  
  export default function CommunicationPreview() {
    return (
      <section className="communication-preview">
        <p>Section: Communication Preview</p>
  
        <div className="communication-preview__avatars">
          <p>[Alice Avatar]</p>
          <p>-- [Lock Icon] --</p>
          <p>[Bob Avatar]</p>
        </div>
  
        <div className="communication-preview__metadata">
          {metadata.map((row) => (
            <div key={row.label} className="communication-preview__row">
              <span>{row.label}</span>
              <span>{row.value}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }