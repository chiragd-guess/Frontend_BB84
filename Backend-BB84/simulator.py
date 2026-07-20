"""
===========================================================
simulator.py
-----------------------------------------------------------

Main BB84 Simulation Engine

This file orchestrates the entire BB84 protocol and
returns a frontend-ready response.

===========================================================
"""

import time
import uuid
from datetime import datetime

import config

from alice import Alice
from bob import Bob
from channel import QuantumChannel
from detector import Detector
from eve import Eve

from qkd import (
    sift_key,
    calculate_qber,
    error_correction,
    privacy_amplification
)
from encryption import xor_encrypt, xor_decrypt

class BB84Simulator:

    ########################################################

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

        eve_interception,
        
        message=None

    ):

        ####################################################
        # TIMER
        ####################################################

        simulation_start = time.time()

        start_datetime = datetime.now()

        ####################################################
        # UPDATE CONFIGURATION
        ####################################################

        config.CHANNEL_NOISE = channel_noise

        config.PHOTON_LOSS = photon_loss

        config.DETECTOR_EFFICIENCY = detector_efficiency

        config.DARK_COUNT_RATE = dark_count_rate

        config.EVE_INTERCEPTION = eve_interception

        ####################################################
        # CREATE COMPONENTS
        ####################################################

        alice = Alice(number_of_photons)

        channel = QuantumChannel()

        eve = Eve(number_of_photons)

        detector = Detector()

        bob = Bob(number_of_photons)

        ####################################################
        # TIMELINE
        ####################################################

        timeline = []

        timeline.append({

            "stage": "Preparing Photons",

            "status": "completed"

        })

        ####################################################
        # CHANNEL
        ####################################################

        photons = channel.transmit(

            alice.photons

        )

        timeline.append({

            "stage": "Quantum Transmission",

            "status": "completed"

        })

        ####################################################
        # EVE
        ####################################################

        photons = eve.intercept(

            photons

        )

        timeline.append({

            "stage": "Eve Interception",

            "status": "completed"

        })

        ####################################################
        # DETECTOR
        ####################################################

        photons = detector.detect(

            photons

        )

        timeline.append({

            "stage": "Photon Detection",

            "status": "completed"

        })

        ####################################################
        # BOB
        ####################################################

        bob.measure_photons(

            photons

        )

        timeline.append({

            "stage": "Bob Measurement",

            "status": "completed"

        })

        ####################################################
        # SIFTING
        ####################################################

        sift = sift_key(

            alice.bits,

            bob.bits,

            alice.bases,

            bob.bases

        )

        alice_key = sift["alice_key"]

        bob_key = sift["bob_key"]

        matching_positions = sift["matching_positions"]

        discarded_positions = sift["discarded_positions"]

        timeline.append({

            "stage": "Basis Comparison",

            "status": "completed"

        })

        ####################################################
        # MARK PHOTONS
        ####################################################

        for index in matching_positions:

            photons[index].matching_basis = True

            photons[index].kept_after_sifting = True

        ####################################################
        # QBER
        ####################################################

        qber_results = calculate_qber(

            alice_key,

            bob_key

        )

        qber = qber_results["qber"]

        error_positions = qber_results["error_positions"]

        errors = qber_results["errors"]
        print("==========================")
        print("SIFTED KEY LENGTH:", len(alice_key))
        print("ERRORS:", errors)
        print("QBER:", qber * 100)
        print("==========================")

        timeline.append({

            "stage": "QBER Estimation",

            "status": "completed"

        })

        ####################################################
        # ERROR CORRECTION
        ####################################################

        correction = error_correction(

            alice_key,

            bob_key

        )

        corrected_key = correction["corrected_key"]

        corrected_errors = correction["corrected_errors"]

        corrected_positions = correction["corrected_positions"]

        timeline.append({

            "stage": "Error Correction",

            "status": "completed"

        })

        ####################################################
        # MARK CORRECTED PHOTONS
        ####################################################

        for position in corrected_positions:

            if position < len(matching_positions):

                photon_index = matching_positions[position]

                photons[photon_index].corrected = True

        ####################################################
        # PRIVACY AMPLIFICATION
        ####################################################

        if qber < config.QBER_THRESHOLD:

            privacy = privacy_amplification(
                corrected_key
            )

            final_key = privacy["final_key"]
            final_key_length = privacy["final_key_length"]

        else:

            final_key = ""
            final_key_length = 0

        timeline.append({

            "stage": "Privacy Amplification",

            "status": "completed"

        })
        ####################################################
        # SESSION
        ####################################################

        execution_time = round(

            time.time() - simulation_start,

            4

        )

        secure = qber < config.QBER_THRESHOLD

        ####################################################
        # PHOTON HISTORY
        ####################################################

        photon_history = [

            photon.to_dict()

            for photon in photons

        ]

        ####################################################
        # SESSION INFO
        ####################################################

        session = {

            "session_id": str(uuid.uuid4())[:8].upper(),

            "protocol": "BB84",

            "status": (

                "Secure"

                if secure

                else "Aborted"

            ),

            "start_time": start_datetime.strftime(

                "%H:%M:%S"

            ),

            "duration": execution_time

        }

        ####################################################
        # CONTROLS
        ####################################################

        controls = {

            "number_of_photons": number_of_photons,

            "channel_noise": channel_noise,

            "photon_loss": photon_loss,

            "detector_efficiency": detector_efficiency,

            "dark_count_rate": dark_count_rate,

            "eve_interception": eve_interception

        }

        ####################################################
        # STATISTICS
        ####################################################

        statistics = {

            ################################################

            "photons_sent":

                channel.total_sent,

            "photons_received":

                channel.total_received,

            "photons_lost":

                channel.total_lost,

            ################################################

            "noise_events":

                channel.total_noisy,

            "noise_rate":

                channel.noise_rate,

            ################################################

            "detected_photons":

                detector.detected,

            "detector_missed":

                detector.missed,

            "dark_counts":

                detector.dark_counts,

            ################################################

            "eve_intercepted":

                eve.intercepted,

            "interception_rate":

                eve.interception_rate,

            ################################################

            "matching_bases":

                len(matching_positions),

            "discarded_bits":

                len(discarded_positions),

            ################################################

            "errors":

                errors,

            "errors_corrected":

                corrected_errors,

            ################################################

            "qber":

                round(

                    qber * 100,

                    2

                ),

            ################################################

            "final_key_length":

                final_key_length

        }

        ####################################################
        # SECURITY
        ####################################################

        security = {

            "secure": secure,

            "eve_detected":

                not secure,

            "qber":

                round(

                    qber * 100,

                    2

                ),

            "threshold":

                config.QBER_THRESHOLD * 100

        }

        ####################################################
        # ALICE
        ####################################################

        alice_data = {

            "bits":

                alice.bits,

            "bases":

                alice.bases,

            "photons":

                len(

                    alice.photons

                )

        }

        ####################################################
        # BOB
        ####################################################

        bob_data = {

            "bases":

                bob.bases,

            "bits":

                bob.bits,

            "statistics":

                bob.get_statistics()

        }

        ####################################################
        # EVE
        ####################################################

        eve_data = {

            "enabled":

                eve_interception > 0,

            "statistics":

                eve.get_statistics()

        }

        ####################################################
        # KEYS
        ####################################################

        keys = {

            "alice_key":

                alice_key,

            "bob_key":

                bob_key,

            "corrected_key":

                corrected_key,

            "final_key":

                final_key

        }
        
        
    
        ####################################################
        # MESSAGE ENCRYPTION
        ####################################################

        encryption = {

            "plaintext": None,

            "ciphertext": None,

            "decrypted": None

        }


        if final_key and message:

            ciphertext = xor_encrypt(

                message,

                final_key

            )


            decrypted = xor_decrypt(

                ciphertext,

                final_key

            )


            encryption = {

                "plaintext": message,

                "ciphertext": ciphertext,

                "decrypted": decrypted

            }



        ####################################################
        # ANALYTICS
        ####################################################

        analytics = {

            "channel": channel.get_statistics(),

            "detector": detector.get_statistics(),

            "eve": eve.get_statistics(),

            "bob": bob.get_statistics(),

            "timeline": timeline,

            "photon_history": photon_history

        }



        ####################################################
        # PERFORMANCE
        ####################################################

        performance = {

            "execution_time": execution_time,

            "photons_per_second": round(

                number_of_photons / execution_time,

                2

            ) if execution_time > 0 else 0

        }



        ####################################################
        # FINAL RESPONSE
        ####################################################

        results = {

            "session": session,

            "controls": controls,

            "statistics": statistics,

            "security": security,

            "analytics": analytics,

            "alice": alice_data,

            "bob": bob_data,

            "eve": eve_data,

            "keys": keys,

            "encryption": encryption,

            "performance": performance

        }


        return results