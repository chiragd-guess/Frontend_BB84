"""
===========================================================
detector.py
-----------------------------------------------------------

Photon Detector

Simulates Bob's detector with:

• Detector efficiency
• Missed photons
• Dark counts

===========================================================
"""

import random
import config


class Detector:

    def __init__(self):

        ####################################################
        # Statistics
        ####################################################

        self.detected = 0
        self.missed = 0
        self.dark_counts = 0

        self.detection_rate = 0.0
        self.miss_rate = 0.0
        self.dark_count_rate_actual = 0.0

    ########################################################

    def detect(self, photons):

        detected_photons = []

        ####################################################
        # Reset Statistics
        ####################################################

        self.detected = 0
        self.missed = 0
        self.dark_counts = 0

        ####################################################

        for photon in photons:

            ################################################
            # Already Lost
            ################################################

            if photon.lost:

                detected_photons.append(photon)

                continue

            ################################################
            # Detector Miss
            ################################################

            if random.random() > config.DETECTOR_EFFICIENCY:

                photon.lost = True
                photon.detected = False

                self.missed += 1

                detected_photons.append(photon)

                continue

            ################################################
            # Detector Success
            ################################################

            photon.detected = True

            self.detected += 1

            ################################################
            # Dark Count
            ################################################

            if random.random() < config.DARK_COUNT_RATE:

                photon.dark_count = True

                self.dark_counts += 1

            detected_photons.append(photon)

        ####################################################
        # Analytics
        ####################################################

        total = len(photons)

        if total > 0:

            self.detection_rate = round(

                self.detected / total * 100,

                2

            )

            self.miss_rate = round(

                self.missed / total * 100,

                2

            )

            self.dark_count_rate_actual = round(

                self.dark_counts / total * 100,

                2

            )

        else:

            self.detection_rate = 0
            self.miss_rate = 0
            self.dark_count_rate_actual = 0

        return detected_photons

    ########################################################

    def get_statistics(self):

        return {

            "detected_photons": self.detected,

            "missed_photons": self.missed,

            "dark_counts": self.dark_counts,

            "detection_rate": self.detection_rate,

            "miss_rate": self.miss_rate,

            "dark_count_rate": self.dark_count_rate_actual

        }

    ########################################################

    def display_statistics(self):

        print("\n" + "=" * 60)

        print("DETECTOR")

        print("=" * 60)

        stats = self.get_statistics()

        for key, value in stats.items():

            print(f"{key:28}: {value}")