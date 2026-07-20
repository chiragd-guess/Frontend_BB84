"""
===========================================================
config.py
-----------------------------------------------------------
This file stores every adjustable parameter used by the
BB84 Quantum Key Distribution simulator.

Every other file imports these values.

Author : You
Project : BB84 Quantum Key Distribution Simulator
===========================================================
"""

# =========================================================
# Number of photons Alice will send.
#
# Larger values produce a more accurate simulation but
# require more computation.
# =========================================================
NUM_PHOTONS = 1000


# =========================================================
# Probability that channel noise changes a photon.
#
# Example:
# 0.00 = perfect channel
# 0.05 = 5% noise
# 0.20 = very noisy
# =========================================================
CHANNEL_NOISE = 0.05


# =========================================================
# Probability that a photon is completely lost.
#
# Lost photons never reach Bob.
# =========================================================
PHOTON_LOSS = 0.10


# =========================================================
# Detector efficiency.
#
# Probability that Bob's detector successfully detects
# an arriving photon.
# =========================================================
DETECTOR_EFFICIENCY = 0.90


# =========================================================
# Dark count rate.
#
# Sometimes detectors click even when no photon arrives.
#
# This value represents that probability.
# =========================================================
DARK_COUNT_RATE = 0.01


# =========================================================
# Misalignment angle.
#
# This simulates imperfect alignment between Alice's and
# Bob's polarization devices.
#
# We will use this later.
# =========================================================
MISALIGNMENT = 2


# =========================================================
# Eve interception probability.
#
# Example:
#
# 0.00 = Eve absent
#
# 0.50 = Eve intercepts half of the photons
#
# 1.00 = Eve intercepts every photon
# =========================================================
EVE_INTERCEPTION = 0.00


# =========================================================
# Maximum acceptable Quantum Bit Error Rate.
#
# If QBER exceeds this value,
# Alice and Bob reject the key.
# =========================================================
QBER_THRESHOLD = 0.11