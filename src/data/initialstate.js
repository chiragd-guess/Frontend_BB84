export function createInitialSimulation() {
  return {
    status: "idle",

    initiator: null,

    alice: {
      recipient: "Bob",
      message: "",
      encryptedMessage: "",
      decryptedMessage: "",
    },

    bob: {
      recipient: "Alice",
      message: "",
      encryptedMessage: "",
      decryptedMessage: "",
    },

    channel: {
      noise: 0,
      eve: false,
    },

    protocol: {
      stage: 0,
      current: "Waiting",
    },

    analytics: {
      qber: 0,
      photonsSent: 0,
      keyLength: 0,
    },

    session: {
      id: "---",
      secure: false,
      duration: "00:00",
    },

    messages: [],

    bob_composer: "",

    abortReason: "",
  };
}

export const fakeSimulationResult = {
  status: "completed",

  bob: {
    encryptedMessage: "110010010101010010101001",
    decryptedMessage: "Hello Bob",
  },

  channel: {
    noise: 3,
    eve: false,
  },

  analytics: {
    qber: 2.31,
    photonsSent: 512,
    keyLength: 256,
  },

  session: {
    id: "QKD-001",
    secure: true,
    duration: "1.34 s",
  },
};