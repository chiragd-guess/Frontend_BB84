"""
===========================================================
alice.py
-----------------------------------------------------------
This file contains the Alice class.

Alice is the sender in the BB84 protocol.

Her job is to

1. Generate secret bits.
2. Choose random bases.
3. Encode each bit into a photon.
4. Send photons into the quantum channel.
===========================================================
"""

# Import helper functions.
from utils import (
    generate_random_bits,
    generate_random_bases,
    encode_photon
)


class Alice:

    """
    --------------------------------------------------------
    Alice Class

    Represents the sender of the quantum key.

    Every Alice object contains

    • Secret bits
    • Chosen bases
    • Encoded photons
    --------------------------------------------------------
    """

    def __init__(self, number_of_photons):

        """
        Constructor

        Automatically runs whenever we create Alice.
        """

        # Save number of photons.
        self.number_of_photons = number_of_photons

        # Generate random bits.
        self.bits = generate_random_bits(number_of_photons)

        # Generate random bases.
        self.bases = generate_random_bases(number_of_photons)

        # Empty list for photons.
        self.photons = []

        # Encode every bit.
        self.encode_all_photons()


    def encode_all_photons(self):

        self.photons = []

        for index, (bit, basis) in enumerate(

            zip(self.bits, self.bases),

            start=1

        ):

            photon = encode_photon(

                bit=bit,

                basis=basis,

                photon_id=index

            )

            self.photons.append(photon)


    def display_information(self):

        """
        Display Alice's information nicely.
        """

        print("\n" + "="*60)
        print("ALICE")
        print("="*60)

        print("\nSecret Bits")

        print(self.bits)

        print("\nBases")

        print(self.bases)

        print("\nEncoded Photons")

        print(self.photons)