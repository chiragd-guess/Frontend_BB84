"""
===========================================================
channel.py
-----------------------------------------------------------

Quantum communication channel.

Responsible only for transmission, photon loss,
and channel noise.

===========================================================
"""

import random

import config


class QuantumChannel:

    def __init__(self):

        ####################################################
        # Statistics
        ####################################################

        self.total_sent = 0
        self.total_received = 0
        self.total_lost = 0
        self.total_noisy = 0

        ####################################################
        # Analytics
        ####################################################

        self.transmission_efficiency = 0.0
        self.loss_rate = 0.0
        self.noise_rate = 0.0

    ########################################################

    def apply_noise(self, photon):

        """
        Flip photon polarization.
        """

        if photon.state == "H":

            photon.state = "V"

        elif photon.state == "V":

            photon.state = "H"

        elif photon.state == "D":

            photon.state = "A"

        elif photon.state == "A":

            photon.state = "D"

        photon.noisy = True
        photon.noise_count += 1

    ########################################################

    def transmit(self, photons):

        received = []

        ####################################################
        # Reset Statistics
        ####################################################

        self.total_sent = len(photons)
        self.total_received = 0
        self.total_lost = 0
        self.total_noisy = 0

        ####################################################

        for photon in photons:

            ################################################
            # Photon Loss
            ################################################

            if random.random() < config.PHOTON_LOSS:

                photon.lost = True
                photon.received = False

                self.total_lost += 1

                received.append(photon)

                continue

            ################################################
            # Channel Noise
            ################################################

            if random.random() < config.CHANNEL_NOISE:

                self.apply_noise(photon)

                self.total_noisy += 1

            ################################################
            # Successfully Arrived
            ################################################

            photon.received = True

            self.total_received += 1

            received.append(photon)

        ####################################################
        # Channel Metrics
        ####################################################

        if self.total_sent > 0:

            self.transmission_efficiency = round(

                (self.total_received / self.total_sent) * 100,

                2

            )

            self.loss_rate = round(

                (self.total_lost / self.total_sent) * 100,

                2

            )

            self.noise_rate = round(

                (self.total_noisy / self.total_sent) * 100,

                2

            )

        else:

            self.transmission_efficiency = 0
            self.loss_rate = 0
            self.noise_rate = 0

        return received

    ########################################################

    def get_statistics(self):

        return {

            "photons_sent": self.total_sent,

            "photons_received": self.total_received,

            "photons_lost": self.total_lost,

            "noise_events": self.total_noisy,

            "transmission_efficiency": self.transmission_efficiency,

            "loss_rate": self.loss_rate,

            "noise_rate": self.noise_rate

        }

    ########################################################

    def display_statistics(self):

        print("\n" + "=" * 60)

        print("QUANTUM CHANNEL")

        print("=" * 60)

        stats = self.get_statistics()

        for key, value in stats.items():

            print(f"{key:28}: {value}")