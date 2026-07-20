"""
===========================================================
qkd.py
-----------------------------------------------------------

BB84 Protocol Functions

Includes:

• Key Sifting
• QBER Calculation
• Error Correction
• Privacy Amplification

===========================================================
"""

import hashlib


###########################################################
# Key Sifting
###########################################################

def sift_key(

    alice_bits,
    bob_bits,
    alice_bases,
    bob_bases

):

    sifted_alice = []
    sifted_bob = []

    matching_positions = []
    discarded_positions = []

    for i in range(len(alice_bits)):

        ####################################################
        # Lost Photon
        ####################################################

        if bob_bits[i] is None:

            discarded_positions.append(i)

            continue

        ####################################################
        # Matching Basis
        ####################################################

        if alice_bases[i] == bob_bases[i]:

            sifted_alice.append(alice_bits[i])

            sifted_bob.append(bob_bits[i])

            matching_positions.append(i)

        ####################################################
        # Wrong Basis
        ####################################################

        else:

            discarded_positions.append(i)

    return {

        "alice_key": sifted_alice,

        "bob_key": sifted_bob,

        "matching_positions": matching_positions,

        "discarded_positions": discarded_positions,

        "matching_count": len(matching_positions)

    }


###########################################################
# QBER
###########################################################

def calculate_qber(

    alice_key,
    bob_key

):

    if len(alice_key) == 0:

        return {

            "qber": 0,

            "errors": 0,

            "error_positions": []

        }

    ########################################################

    errors = 0

    error_positions = []

    for index, (a, b) in enumerate(

        zip(alice_key, bob_key)

    ):

        if a != b:

            errors += 1

            error_positions.append(index)

    ########################################################

    qber = errors / len(alice_key)

    return {

        "qber": qber,

        "errors": errors,

        "error_positions": error_positions

    }


###########################################################
# Error Correction
###########################################################

def error_correction(

    alice_key,
    bob_key

):

    corrected_key = []

    corrected_errors = 0

    corrected_positions = []

    for index, (a, b) in enumerate(

        zip(alice_key, bob_key)

    ):

        if a == b:

            corrected_key.append(b)

        else:

            corrected_key.append(a)

            corrected_errors += 1

            corrected_positions.append(index)

    return {

        "corrected_key": corrected_key,

        "corrected_errors": corrected_errors,

        "corrected_positions": corrected_positions

    }


###########################################################
# Privacy Amplification
###########################################################

def privacy_amplification(corrected_key):

    binary_string = "".join(

        str(bit)

        for bit in corrected_key

    )

    hashed = hashlib.sha256(

        binary_string.encode()

    ).hexdigest()

    binary_hash = bin(

        int(hashed, 16)

    )[2:]

    final_key = binary_hash[:len(corrected_key)]

    return {

        "final_key": final_key,

        "final_key_length": len(final_key),

        "hash_algorithm": "SHA-256"

    }