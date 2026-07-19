"""
===========================================================
simulator.py
-----------------------------------------------------------

This file contains the BB84Simulator class.

This is the main simulation engine.

Future frontend and FastAPI code will only
need to call

simulator.run()

===========================================================
"""

from alice import Alice
from bob import Bob
from channel import QuantumChannel
from detector import Detector
from eve import Eve

from qkd import (
    sift_key,
    calculate_qber,
    error_correction,
    privacy_amplification,
)


class BB84Simulator:
    """
    Main BB84 Simulation Engine.
    """

    def __init__(self):

        pass

    ########################################################

    def run(
        self,
        number_of_photons,
        channel_noise,
        photon_loss,
        detector_efficiency,
        dark_count_rate,
        eve_interception
    ):

        import config

        # Update the simulator settings.
        config.CHANNEL_NOISE = channel_noise
        config.PHOTON_LOSS = photon_loss
        config.DETECTOR_EFFICIENCY = detector_efficiency
        config.DARK_COUNT_RATE = dark_count_rate
        config.EVE_INTERCEPTION = eve_interception

        ####################################################
        # Create all components
        ####################################################

        alice = Alice(number_of_photons)

        channel = QuantumChannel()

        eve = Eve(number_of_photons)

        detector = Detector()

        bob = Bob(number_of_photons)

        ####################################################
        # Run simulation
        ####################################################

        photons = channel.transmit(alice.photons)

        photons = eve.intercept(photons)

        photons = detector.detect(photons)

        bob.measure_photons(photons)

        ####################################################
        # BB84 Protocol
        ####################################################

        alice_key, bob_key, positions = sift_key(

            alice.bits,

            bob.bits,

            alice.bases,

            bob.bases

        )

        qber = calculate_qber(

            alice_key,

            bob_key

        )

        corrected_key, corrected_errors = error_correction(

            alice_key,

            bob_key

        )

        final_key = privacy_amplification(

            corrected_key

        )

        ####################################################
        # Return everything.
        ####################################################

        results = {

            "photons_sent": channel.total_sent,

            "photons_received": channel.total_received,

            "photons_lost": channel.total_lost,

            "noise_events": channel.total_noisy,

            "eve_intercepted": eve.intercepted,

            "detected_photons": detector.detected,

            "detector_missed": detector.missed,

            "dark_counts": detector.dark_counts,

            "matching_bases": len(alice_key),

            "qber": qber,

            "errors_corrected": corrected_errors,

            "final_key": final_key,

            "final_key_length": len(final_key),

            "secure": qber < 0.11

        }

        return results
