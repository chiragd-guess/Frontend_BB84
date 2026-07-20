"""
===========================================================
photon.py
-----------------------------------------------------------

Photon object used throughout the BB84 simulator.

Each photon records its complete journey from Alice to Bob.

===========================================================
"""


class Photon:

    """
    Represents a single photon travelling through
    the BB84 protocol.
    """

    def __init__(self, state, photon_id=None):

        ####################################################
        # Identity
        ####################################################

        self.id = photon_id

        ####################################################
        # Alice
        ####################################################

        self.alice_bit = None
        self.alice_basis = None

        ####################################################
        # Polarization
        ####################################################

        self.initial_state = state
        self.state = state

        ####################################################
        # Quantum Channel
        ####################################################

        self.sent = True
        self.received = False

        self.lost = False

        self.noisy = False
        self.noise_count = 0

        ####################################################
        # Eve
        ####################################################

        self.intercepted = False
        self.eve_basis = None
        self.eve_state = None

        ####################################################
        # Detector
        ####################################################

        self.detected = False
        self.dark_count = False

        ####################################################
        # Bob
        ####################################################

        self.measured = False
        self.bob_basis = None
        self.bob_bit = None

        ####################################################
        # BB84 Protocol
        ####################################################

        self.matching_basis = False
        self.kept_after_sifting = False

        self.corrected = False

    ########################################################

    def to_dict(self):

        return {

            "id": self.id,

            "alice_bit": self.alice_bit,
            "alice_basis": self.alice_basis,

            "initial_state": self.initial_state,
            "current_state": self.state,

            "sent": self.sent,
            "received": self.received,

            "lost": self.lost,

            "noisy": self.noisy,
            "noise_count": self.noise_count,

            "intercepted": self.intercepted,
            "eve_basis": self.eve_basis,
            "eve_state": self.eve_state,

            "detected": self.detected,
            "dark_count": self.dark_count,

            "measured": self.measured,
            "bob_basis": self.bob_basis,
            "bob_bit": self.bob_bit,

            "matching_basis": self.matching_basis,
            "kept_after_sifting": self.kept_after_sifting,
            "corrected": self.corrected

        }

    ########################################################

    def __str__(self):
        return self.state

    ########################################################

    def __repr__(self):
        return f"Photon(id={self.id}, state='{self.state}')"