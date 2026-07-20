"""
===========================================================
eve.py
-----------------------------------------------------------

Intercept-Resend Eve Attack

Eve randomly intercepts photons, measures them,
and resends new photons to Bob.

===========================================================
"""

import random

import config

from photon import Photon
from utils import generate_random_bases


class Eve:

    def __init__(self, number_of_photons):

        self.number_of_photons = number_of_photons

        self.bases = generate_random_bases(number_of_photons)

        ####################################################
        # Statistics
        ####################################################

        self.intercepted = 0

        self.interception_rate = 0.0

        self.pass_through = 0

    ########################################################

    def intercept(self, photons):

        new_photons = []

        ####################################################
        # Reset Statistics
        ####################################################

        self.intercepted = 0

        self.pass_through = 0

        ####################################################

        for photon, eve_basis in zip(photons, self.bases):

            ################################################
            # Ignore lost photons
            ################################################

            if photon.lost:

                new_photons.append(photon)

                continue

            ################################################
            # Decide whether Eve attacks
            ################################################

            if random.random() > config.EVE_INTERCEPTION:

                self.pass_through += 1

                new_photons.append(photon)

                continue

            ################################################
            # Eve attacks
            ################################################

            self.intercepted += 1

            photon.intercepted = True

            photon.eve_basis = eve_basis

            ################################################
            # Eve Measurement
            ################################################

            state = photon.state

            if eve_basis == "+":

                if state in ["H", "V"]:

                    measured_state = state

                else:

                    measured_state = random.choice(["H", "V"])

            else:

                if state in ["D", "A"]:

                    measured_state = state

                else:

                    measured_state = random.choice(["D", "A"])

            photon.eve_state = measured_state

            ################################################
            # Eve Creates New Photon
            ################################################

            new_photon = Photon(

                state=measured_state,

                photon_id=photon.id

            )

            ################################################
            # Preserve History
            ################################################

            new_photon.alice_bit = photon.alice_bit
            new_photon.alice_basis = photon.alice_basis

            new_photon.initial_state = photon.initial_state

            new_photon.sent = photon.sent
            new_photon.received = photon.received

            new_photon.noisy = photon.noisy
            new_photon.noise_count = photon.noise_count

            new_photon.intercepted = True
            new_photon.eve_basis = eve_basis
            new_photon.eve_state = measured_state

            new_photons.append(new_photon)

        ####################################################
        # Analytics
        ####################################################

        active_photons = self.intercepted + self.pass_through

        if active_photons > 0:

            self.interception_rate = round(

            (self.intercepted / active_photons) * 100,

            2

        )

        else:

            self.interception_rate = 0


        return new_photons

    ########################################################

    def get_statistics(self):

        return {

            "intercepted_photons": self.intercepted,

            "pass_through_photons": self.pass_through,

            "interception_rate": self.interception_rate,

            "enabled": config.EVE_INTERCEPTION > 0

        }

    ########################################################

    def display_statistics(self):

        print("\n" + "=" * 60)

        print("EVE")

        print("=" * 60)

        stats = self.get_statistics()

        for key, value in stats.items():

            print(f"{key:28}: {value}")