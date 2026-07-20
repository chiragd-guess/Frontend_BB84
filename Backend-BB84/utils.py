"""
===========================================================
utils.py
-----------------------------------------------------------
Utility functions used throughout the BB84 simulator.
===========================================================
"""

import random

from photon import Photon


###########################################################
# Random Bit Generation
###########################################################

def generate_random_bits(number_of_bits):

    return [

        random.randint(0, 1)

        for _ in range(number_of_bits)

    ]


###########################################################
# Random Basis Generation
###########################################################

def generate_random_bases(number_of_bases):

    return [

        random.choice(["+", "x"])

        for _ in range(number_of_bases)

    ]


###########################################################
# Photon Encoding
###########################################################

def encode_photon(bit, basis, photon_id=None):

    if basis == "+":

        state = "H" if bit == 0 else "V"

    else:

        state = "D" if bit == 0 else "A"

    photon = Photon(

        state=state,

        photon_id=photon_id

    )

    #######################################################
    # Alice Information
    #######################################################

    photon.alice_bit = bit

    photon.alice_basis = basis

    return photon


###########################################################
# Title
###########################################################

def print_title():

    print("=" * 60)

    print("      BB84 QUANTUM KEY DISTRIBUTION SIMULATOR")

    print("=" * 60)