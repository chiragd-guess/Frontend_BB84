"""
===========================================================
bob.py
-----------------------------------------------------------

Bob receives photons and measures them using
randomly chosen bases.

===========================================================
"""

import random

from utils import generate_random_bases


class Bob:

    def __init__(self, number_of_photons):

        self.number_of_photons = number_of_photons

        ####################################################
        # Random Measurement Bases
        ####################################################

        self.bases = generate_random_bases(number_of_photons)

        ####################################################
        # Results
        ####################################################

        self.bits = []

        ####################################################
        # Statistics
        ####################################################

        self.measurements = 0
        self.successful_measurements = 0
        self.lost_photons = 0

    ########################################################

    def measure_photons(self, photons):

        self.bits = []

        self.measurements = 0
        self.successful_measurements = 0
        self.lost_photons = 0

        ####################################################

        for photon, basis in zip(photons, self.bases):

            photon.measured = True
            photon.bob_basis = basis

            self.measurements += 1

            ################################################
            # Lost Photon
            ################################################

            if photon.lost:

                photon.bob_bit = None

                self.bits.append(None)

                self.lost_photons += 1

                continue

            ################################################
            # Rectilinear Basis
            ################################################

            if basis == "+":

                if photon.state == "H":

                    bit = 0

                elif photon.state == "V":

                    bit = 1

                else:

                    bit = random.randint(0, 1)

            ################################################
            # Diagonal Basis
            ################################################

            else:

                if photon.state == "D":

                    bit = 0

                elif photon.state == "A":

                    bit = 1

                else:

                    bit = random.randint(0, 1)

            ################################################

            photon.bob_bit = bit

            self.bits.append(bit)

            self.successful_measurements += 1

    ########################################################

    def get_statistics(self):

        return {

            "measurements": self.measurements,

            "successful_measurements": self.successful_measurements,

            "lost_before_measurement": self.lost_photons,

            "measurement_efficiency": round(

                (self.successful_measurements / self.measurements * 100),

                2

            ) if self.measurements else 0

        }

    ########################################################

    def display_information(self):

        print("\n" + "=" * 60)

        print("BOB")

        print("=" * 60)

        print("\nMeasurement Bases")

        print(self.bases)

        print("\nMeasured Bits")

        print(self.bits)

        print("\nStatistics")

        for key, value in self.get_statistics().items():

            print(f"{key:28}: {value}")