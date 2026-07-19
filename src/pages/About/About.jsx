const steps = [
  {
    icon: "👩",
    title: "Alice prepares photons",
    description:
      "Alice encodes random bits as quantum states using two bases — rectilinear (Z) and diagonal (X). Each photon carries one qubit.",
  },
  {
    icon: "⚛",
    title: "Photons travel the quantum channel",
    description:
      "Qubits are transmitted one by one across the quantum channel. Any interception by Eve disturbs the quantum states — this is detectable.",
  },
  {
    icon: "👨",
    title: "Bob measures",
    description:
      "Bob measures each incoming photon using a randomly chosen basis. About half his choices will match Alice's — those bits are kept.",
  },
  {
    icon: "🔁",
    title: "Basis comparison",
    description:
      "Alice and Bob compare their bases over a public channel. They discard bits where their bases didn't match, keeping a shared sifted key.",
  },
  {
    icon: "📊",
    title: "QBER estimation",
    description:
      "They calculate the Quantum Bit Error Rate (QBER). A QBER above ~11% means Eve was likely eavesdropping — the key is discarded.",
  },
  {
    icon: "🔑",
    title: "Shared key established",
    description:
      "If QBER is low, the sifted key is used to encrypt messages with AES-256. The key was never transmitted — it was generated from quantum physics.",
  },
];


export default function About() {


return (

<>


<div className="about-page">


<p>
About — BB84 Quantum Key Distribution
</p>



<p>
BB84 is the world's first quantum cryptography protocol, invented
by Charles Bennett and Gilles Brassard in 1984. It uses the laws
of quantum mechanics to let two parties — Alice and Bob — generate
a provably secure shared key, even over an untrusted channel.
</p>




<p>
How it works
</p>



<ul className="progress-timeline">

{steps.map((step, i) => (

<li
key={i}
className="progress-timeline__step"
>


<div className="progress-step__icon">

{step.icon}

</div>



<div className="progress-step__content">


<h4>
{step.title}
</h4>


<span>
{step.description}
</span>


</div>



{i < steps.length - 1 && (

<div className="progress-step__line"/>

)}


</li>

))}


</ul>





<p>
The roles
</p>



<div className="bottom-row">


<div className="status-card">

<p>
👩 Alice
</p>

<p>
The sender. Prepares and transmits qubits, initiates the key exchange.
</p>

</div>



<div className="status-card">

<p>
👨 Bob
</p>

<p>
The receiver. Measures qubits, compares bases, confirms the shared key.
</p>

</div>



<div className="status-card">

<p>
🕵️ Eve
</p>

<p>
The eavesdropper. Any interception disturbs the quantum states and raises the QBER, revealing her presence.
</p>

</div>


</div>





<p>
This simulation is educational. Real quantum cryptography requires
physical quantum hardware — single photon emitters, optical fibres,
and quantum detectors.
</p>



</div>


</>

);


}